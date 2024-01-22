// Import necessary elements and components
import { EOxMap } from "@eox/map/dist/eox-map.umd.cjs";
import { EOxLayerControl } from "@eox/layercontrol/dist/eox-layercontrol.umd.cjs";
import { StoryTellingHero } from "../components/sections/hero";
import { StoryTellingBasic } from "../components/sections/basic";
import { StoryTellingMap } from "../components/sections/map";
import { StoryTellingMedia } from "../components/sections/media";

// Define custom elements with their associated classes and properties
export const CUSTOM_ELEMENTS = {
  "eox-map": {
    class: EOxMap,
    properties: {},
  },
  "eox-layercontrol": {
    class: EOxLayerControl,
    properties: {},
  },
  "story-telling-hero": {
    class: StoryTellingHero,
    properties: {},
  },
  "story-telling-basic": {
    class: StoryTellingBasic,
    properties: {},
  },
  "story-telling-map": {
    class: StoryTellingMap,
    properties: {},
  },
  "story-telling-media": {
    class: StoryTellingMedia,
    properties: {},
  },
};

export const PROPERTIES_KEYS = generatePropertiesKeys(CUSTOM_ELEMENTS);

/**
 * Generate properties keys for custom elements.
 */
export function generatePropertiesKeys(elements) {
  let propertiesKeys = [];

  // Iterate through each custom element
  Object.keys(elements).forEach((key) => {
    const ele = elements[key];

    // Iterate through each element property
    ele.class.elementProperties.forEach((i, prop) => {
      // Add property keys to the array
      propertiesKeys = [...propertiesKeys, ...prop];

      // Update properties object with property type (defaulting to "String" if no type is specified)
      if (!i.state) {
        elements[key].properties = {
          ...elements[key].properties,
          [prop]: i.type?.name || "String",
        };
      }
    });
  });

  return propertiesKeys;
}
