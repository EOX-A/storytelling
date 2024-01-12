import { CUSTOM_ELEMENTS } from "./custom-elements";
import { fromLonLat } from "ol/proj";

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

function renderHtmlString(htmlString, eventObj) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const dom = Array.from(doc.body.childNodes).map((node) => {
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

  if (!eventObj) return dom;

  const sectionId = eventObj.id;
  const sidecarSteps = eventObj.sidecarSteps;

  let currentSection = null;

  const func = () => {
    const EOxMap = document.querySelector(`#${sectionId} eox-map#map-sidecar`);
    const mapContentChildren = document.querySelectorAll(
      `#${sectionId} .map-content`
    );
    const scrollY = window.scrollY;
    let newCurrentSection = null;

    mapContentChildren.forEach((mapContent, key) => {
      const rect = mapContent.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        newCurrentSection = {
          index: key,
          dom: mapContent,
        };
      }
    });

    if (newCurrentSection?.index !== currentSection?.index || !currentSection) {
      currentSection = newCurrentSection;

      if (currentSection) {
        const index = currentSection.index;
        const lat = sidecarSteps[index][0];
        const lon = sidecarSteps[index][1];
        const zoom = sidecarSteps[index][2];

        EOxMap.map.getView().setCenter(fromLonLat([lon, lat]));
        EOxMap.map.getView().setZoom(zoom);
      }
    }
  };

  setTimeout(() => {
    const mapContentParent = document.querySelector(
      `#${sectionId} .map-type-sidecar`
    );
    mapContentParent.removeEventListener("wheel", func);
    setTimeout(() => mapContentParent.addEventListener("wheel", func), 1000);
  }, 200);

  return dom;
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
