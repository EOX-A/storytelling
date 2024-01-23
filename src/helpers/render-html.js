import { CUSTOM_ELEMENTS } from "./custom-elements";
import { fromLonLat } from "ol/proj";

/**
 * Renders HTML string into DOM elements with event handling.
 */
export function renderHtmlString(htmlString, eventObj) {
  // Parse the HTML string into a document
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Process child nodes of the document body
  const dom = Array.from(doc.body.childNodes).map(processNode);

  // Return the rendered DOM elements
  if (!eventObj) return dom;

  const { id: sectionId, subType, steps, layers, sectionType } = eventObj;
  let currentSection = null;

  // Function to handle scrolling events
  const handleScroll = () => {
    const nodeEle =
      sectionType === "map"
        ? getEOxMap(sectionId, sectionType)
        : getMedia(sectionId, sectionType);
    const contentChildren = getContentChildren(sectionId);
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

        if (sectionType === "map")
          handleMapSection(sectionId, nodeEle, index, steps, layers);
        else changeMediaLayer(sectionId, sectionType, index);
      }
    }
  };

  // Set up event handling after a delay
  setTimeout(() => {
    const contentParent = document.querySelector(
      `#${sectionId} .${sectionType}-type-${subType}`
    );
    if(!contentParent) return;
    
    contentParent.removeEventListener("wheel", handleScroll);
    setTimeout(
      () => contentParent.addEventListener("wheel", handleScroll),
      1000
    );
  }, 200);

  return dom;
}

/**
 * Retrieves media elements based on section ID and type.
 */
function getMedia(sectionId, sectionType) {
  return document.querySelectorAll(
    `#${sectionId} #${sectionType}-${sectionId}`
  );
}

/**
 * Changes the visibility of media layers based on the index.
 */
export function changeMediaLayer(sectionId, sectionType, index) {
  const nodeEle = getMedia(sectionId, sectionType);

  nodeEle.forEach((node, nodeIndex) => {
    if (nodeIndex === index) {
      node.style.display = "block";
    } else {
      node.style.display = "none";
    }
  });
}

/**
 * Retrieves the EOxMap element based on section ID and type.
 */
function getEOxMap(sectionId, sectionType) {
  return document.querySelector(
    `#${sectionId} eox-map#${sectionType}-${sectionId}`
  );
}

/**
 * Changes the map layer visibility based on the current layer configuration.
 */
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

/**
 * Retrieves content children based on section ID and type.
 */
function getContentChildren(sectionId, sectionType) {
  return document.querySelectorAll(`#${sectionId} section-step`);
}

/**
 * Parses a property value based on its type.
 */
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

/**
 * Processes a custom element and sets its properties.
 */
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

/**
 * Process a DOM node, handling specific node types.
 */
function processNode(node) {
  if (
    node.nodeName === "P" ||
    node.nodeName === "DIV" ||
    node.nodeName === "MAIN"
  ) {
    // Process custom elements within child nodes
    const childElements = node.querySelectorAll("*");
    childElements.forEach((element) => {
      if (/^(eox-|story-telling-)/.test(element.tagName.toLowerCase())) {
        processCustomElement(element);
      }
    });
  }
  return node;
}

/**
 * Handle map section updates based on scrolling.
 */
function handleMapSection(sectionId, nodeEle, index, steps, layers) {
  const lat = steps[index][0];
  const lon = steps[index][1];
  const zoom = steps[index][2];

  if (layers) {
    const currLayer = layers[index];
    changeMapLayer(sectionId, currLayer, "map");
  }

  nodeEle.map.getView().setCenter(fromLonLat([lon, lat]));
  nodeEle.map.getView().setZoom(zoom);
}
