import { CUSTOM_ELEMENTS } from "./custom-elements";
import { fromLonLat } from "ol/proj";

function isBooleanString(str) {
  // Convert the string to lowercase for case-insensitive comparison
  str = str.toLowerCase();

  // Check if it's "true" or "false"
  return str === "true" || str === "false";
}

function highlightNavigation() {
  const sections = document.querySelectorAll(".wrap-main");
  let scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 300;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
      document
        .querySelector(`.navigation li.nav-${sectionId}`)
        .classList.add("active");
    else
      document
        .querySelector(`.navigation li.nav-${sectionId}`)
        .classList.remove("active");
  });
}

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

function getEOxMap(sectionId) {
  return document.querySelector(`#${sectionId} eox-map#map-${sectionId}`);
}

function getMapContentChildren(sectionId) {
  return document.querySelectorAll(`#${sectionId} .map-content`);
}

export function changeMapLayer(sectionId, currLayer) {
  const EOxMap = getEOxMap(sectionId);

  EOxMap.map
    .getLayers()
    .getArray()
    .forEach((layer) => {
      const layerId = layer.get("id");
      if (currLayer.includes(layerId)) {
        const index = currLayer.indexOf(layerId);
        layer.setVisible(true);
        layer.setZIndex(currLayer.length - index);
      } else {
        layer.setVisible(false);
      }
    });
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
  const subType = eventObj.subType;
  const steps = eventObj.steps;
  const layers = eventObj.layers;

  let currentSection = null;

  const func = () => {
    const EOxMap = getEOxMap(sectionId);
    const mapContentChildren = getMapContentChildren(sectionId);

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
        const lat = steps[index][0];
        const lon = steps[index][1];
        const zoom = steps[index][2];

        if (layers) {
          const currLayer = layers[index];
          changeMapLayer(sectionId, currLayer);
        }

        EOxMap.map.getView().setCenter(fromLonLat([lon, lat]));
        EOxMap.map.getView().setZoom(zoom);
      }
    }
  };

  setTimeout(() => {
    const mapContentParent = document.querySelector(
      `#${sectionId} .map-type-${subType}`
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
  isBooleanString,
  highlightNavigation,
};
