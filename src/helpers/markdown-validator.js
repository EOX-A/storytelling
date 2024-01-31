import Joi from "joi";
import { processNode } from "./render-html";

const customHtmlValidation = (value, helpers, sectionType) => {
  // Common setup
  const parser = new DOMParser();
  const doc = parser.parseFromString(value, "text/html");
  const doms = Array.from(doc.body.childNodes).map(processNode);
  let error;

  // Validation for 'map'
  if (sectionType === "map") {
    const { steps, layersVisible } = helpers.state.ancestors[0];
    if (!value.includes("section-step")) {
      return helpers.error("any.custom", {
        message: "<section-step> required to render `sidecar` or `tour` map.",
      });
    }

    let sectionStepsIndex = -1;

    doms.forEach((dom) => {
      if (dom.tagName?.toLowerCase() === "section-step") {
        sectionStepsIndex += 1;
        const isValidPropsAvail = Boolean(
          dom.getAttribute("layersVisible") ||
            (dom.getAttribute("lat") &&
              dom.getAttribute("lon") &&
              dom.getAttribute("zoom")),
        );
        const isValidMetaAvail =
          steps?.[sectionStepsIndex] || layersVisible?.[sectionStepsIndex];

        if (!isValidPropsAvail && !isValidMetaAvail) {
          error = helpers.error("any.custom", {
            message:
              "Either the [steps/layersVisible] meta value is required, or the <section-step> must have either `layersVisible='id1,id2'` or `lat='0.0'`, `lon='0.0'`, and `zoom='1'` as properties.",
          });
        }
      }
    });
  }

  // Validation for 'media'
  if (sectionType === "media") {
    const { urls, mediaTypes } = helpers.state.ancestors[0];
    if (!value.includes("section-step")) {
      return helpers.error("any.custom", {
        message: "<section-step> required to render `sidecar` or `tour` map.",
      });
    }

    let sectionStepsIndex = -1;

    doms.forEach((dom) => {
      if (dom.tagName?.toLowerCase() === "section-step") {
        sectionStepsIndex += 1;
        const isValidPropsAvail = Boolean(
          dom.getAttribute("url") && dom.getAttribute("type"),
        );
        const isValidMetaAvail =
          urls?.[sectionStepsIndex] && mediaTypes?.[sectionStepsIndex];

        if (!isValidPropsAvail && !isValidMetaAvail) {
          error = helpers.error("any.custom", {
            message:
              "Either the [url] and [type] meta value is required, or the <section-step> must have `url='uri'` and `type='img/iframe'` as properties.",
          });
        }
      }
    });
  }

  return error || value;
};

// Schema for basic sections
const basicMeta = {
  id: Joi.string().pattern(new RegExp("^[a-zA-Z0-9-]*$")).required(),
  sectionType: Joi.string().valid("basic", "hero", "map", "media").required(),
  section: Joi.string(),
};

// Schema for story meta
export const storyMetaSchema = Joi.object({
  id: Joi.string().pattern(new RegExp("^[a-zA-Z0-9-]*$")).required(),
  type: Joi.string().valid("pagination", "scrollytelling").required(),
  numOfSections: Joi.number(),
  navigations: Joi.array().items(Joi.object().pattern(Joi.string(), Joi.any())),
});

// Schema for basic sections
export const basicSectionMetaSchema = Joi.object(basicMeta);

// Schema for hero sections
export const heroSectionMetaSchema = Joi.object({
  ...basicMeta,
  subType: Joi.string().valid("full").required(),
  vPosition: Joi.string().valid("top", "middle", "bottom"),
  hPosition: Joi.string().valid("left", "center", "right"),
  img: Joi.string().uri().required(),
  imgAlt: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  subDescription: Joi.string(),
});

// Schema for map sections
export const mapSectionMetaSchema = Joi.object({
  ...basicMeta,
  subType: Joi.string()
    .valid("basic", "container", "full", "sidecar", "tour")
    .required(),
  layers: Joi.array().items(Joi.object()).required(),
  center: Joi.array().items(Joi.number()).length(2),
  zoom: Joi.number(),
  preventScroll: Joi.boolean(),
  controls: Joi.object(),
  stepPosition: Joi.string()
    .valid("left", "center", "right")
    .when("subType", {
      is: Joi.valid("sidecar", "tour"),
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  steps: Joi.array().items(Joi.array().items(Joi.number()).length(3)),
  layersVisible: Joi.array().items(Joi.array().items(Joi.string())),
  section: Joi.string().when("subType", {
    is: Joi.valid("sidecar", "tour"),
    then: Joi.string().custom((value, helpers) =>
      customHtmlValidation(value, helpers, "map"),
    ),
    otherwise: Joi.string(),
  }),
});

// Schema for media sections
export const mediaSectionMetaSchema = Joi.object({
  ...basicMeta,
  subType: Joi.string()
    .valid("basic", "container", "full", "sidecar", "tour")
    .required(),
  mediaTypes: Joi.array().items(Joi.string().valid("img", "iframe")),
  urls: Joi.array().items(Joi.string().uri()),
  captions: Joi.array().items(Joi.string()),
  stepPosition: Joi.string()
    .valid("left", "center", "right")
    .when("subType", {
      is: Joi.valid("sidecar", "tour"),
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  height: Joi.string(),
  section: Joi.string().when("subType", {
    is: Joi.valid("sidecar", "tour"),
    then: Joi.string().custom((value, helpers) =>
      customHtmlValidation(value, helpers, "media"),
    ),
    otherwise: Joi.string(),
  }),
});
