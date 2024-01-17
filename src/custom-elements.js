// import { EOxMap } from "@eox/map/dist/eox-map.umd.cjs";
import { EOxMap } from "../../EOxElements/elements/map/main";
import { EOxLayerControl } from "@eox/layercontrol/dist/eox-layercontrol.umd.cjs";
import { StoryTellingHero } from "./components/sections/hero"
import { StoryTellingBasic } from "./components/sections/basic"
import { StoryTellingMap } from "./components/sections/map";
import { StoryTellingMedia } from "./components/sections/media";

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

export function generatePropertiesKeys(elements) {
    let propertiesKeys = [];
    Object.keys(elements).forEach((key) => {
      const ele = elements[key];
      ele.class.elementProperties.forEach((i, prop) => {
        propertiesKeys = [...propertiesKeys, ...prop];
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