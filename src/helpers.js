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
        ?.classList.add("active");
    else
      document
        .querySelector(`.navigation li.nav-${sectionId}`)
        ?.classList.remove("active");
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

function getEOxMap(sectionId, sectionType) {
  return document.querySelector(`#${sectionId} eox-map#${sectionType}-${sectionId}`);
}

function getMedia(sectionId, sectionType) {
  return document.querySelectorAll(`#${sectionId} #${sectionType}-${sectionId}`);
}

function getContentChildren(sectionId, sectionType) {
  return document.querySelectorAll(`#${sectionId} .${sectionType}-content`);
}

export function changeMapLayer(sectionId, currLayer, sectionType) {
  const EOxMap = getEOxMap(sectionId, sectionType);

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

export function changeMediaLayer(sectionId, sectionType, index) {
  const nodeEle = getMedia(sectionId, sectionType);

  nodeEle.forEach((node, nodeIndex) => {
    if(nodeIndex === index) 
      node.style.display = "block"
    else 
      node.style.display = "none"
  })
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
  const sectionType = eventObj.sectionType

  let currentSection = null;

  const func = () => {
    const nodeEle = sectionType === "map" ? getEOxMap(sectionId, sectionType) : getMedia(sectionId, sectionType);
    const contentChildren = getContentChildren(sectionId, sectionType);

    const scrollY = window.scrollY;
    let newCurrentSection = null;

    contentChildren.forEach((content, key) => {
      const rect = content.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        newCurrentSection = {
          index: key,
          dom: content,
        };
      }
    });

    if (newCurrentSection?.index !== currentSection?.index || !currentSection) {
      currentSection = newCurrentSection;

      if (currentSection) {
        const index = currentSection.index;

        if(sectionType === "map"){
          const lat = steps[index][0];
          const lon = steps[index][1];
          const zoom = steps[index][2];

          if (layers) {
            const currLayer = layers[index];
            changeMapLayer(sectionId, currLayer);
          }

          nodeEle.map.getView().setCenter(fromLonLat([lon, lat]));
          nodeEle.map.getView().setZoom(zoom);
        } else {
          changeMediaLayer(sectionId, sectionType, index)
        }
      }
    }
  };

  setTimeout(() => {
    const contentParent = document.querySelector(
      `#${sectionId} .${sectionType}-type-${subType}`
    );

    contentParent.removeEventListener("wheel", func);
    setTimeout(() => contentParent.addEventListener("wheel", func), 1000);
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
