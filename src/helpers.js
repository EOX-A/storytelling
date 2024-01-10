import { EOxMap } from "@eox/map/dist/eox-map.umd.cjs";
import { EOxLayerControl } from "@eox/layercontrol/dist/eox-layercontrol.umd.cjs";

const ELEMENTS = {
  "eox-map": {
    class: EOxMap,
    properties: {},
  },
  "eox-layercontrol": {
    class: EOxLayerControl,
    properties: {},
  },
};

async function loadMarkdown(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function generatePropertiesKeys(elements) {
  let propertiesKeys = [];
  Object.keys(elements).forEach((key) => {
    const ele = elements[key];
    ele.class.elementProperties.forEach((i, prop) => {
      propertiesKeys = [...propertiesKeys, ...prop];
      if (!i.attribute && !i.state) {
        elements[key].properties = {
          ...elements[key].properties,
          [prop]: i.type?.name || "Array",
        };
      }
    });
  });
  return propertiesKeys;
}

function renderHtmlString(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return Array.from(doc.body.childNodes).map((node) => {
    if (node.nodeName === "P" || node.nodeName === "DIV" || node.nodeName === "MAIN") {
      const childElements = node.querySelectorAll("*");
      childElements.forEach((element) => {
        if (element.tagName.toLowerCase().startsWith("eox-")) {
          processCustomElement(element);
        }
      });
    }
    return node;
  });
}

function processCustomElement(element) {
  const eleNodeName = element.nodeName.toLowerCase();
  if (Object.keys(ELEMENTS).includes(eleNodeName)) {
    const ele = ELEMENTS[eleNodeName];
    Object.keys(ele.properties).forEach((propName) => {
      const propValue = element.getAttribute(propName);
      const propType = ele.properties[propName];

      if (propValue) {
        element[propName] = parsePropertyValue(propType, propValue);
      }
    });
  }
}

function parsePropertyValue(propType, propValue) {
  switch (propType) {
    case "Number":
      return Number(propValue);
    case "Boolean":
      return propValue.toLowerCase() !== "false";
    case "Array":
    case "Object":
      return JSON.parse(propValue.replaceAll("&quot;", '"'));
    default:
      return propValue;
  }
}

export {
  ELEMENTS,
  loadMarkdown,
  generatePropertiesKeys,
  renderHtmlString,
  processCustomElement,
  parsePropertyValue,
};
