import {CUSTOM_ELEMENTS} from "./custom-elements"

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

function renderHtmlString(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return Array.from(doc.body.childNodes).map((node) => {
    if (
      node.nodeName === "P" ||
      node.nodeName === "DIV" ||
      node.nodeName === "MAIN"
    ) {
      const childElements = node.querySelectorAll("*");
      childElements.forEach((element) => {
        if (/^(eox-|story-telling-)/.test(element.tagName.toLowerCase())) {
          processCustomElement(element);
        }
      });
    }
    return node;
  });
}

function processCustomElement(element) {
  const eleNodeName = element.nodeName.toLowerCase();
  if (Object.keys(CUSTOM_ELEMENTS).includes(eleNodeName)) {
    const ele = CUSTOM_ELEMENTS[eleNodeName];
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
  loadMarkdown,
  renderHtmlString,
  processCustomElement,
  parsePropertyValue,
};
