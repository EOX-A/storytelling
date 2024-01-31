import Joi from "joi";
import { processNode } from "./render-html";

export const storyMetaSchema = Joi.object({
  id: Joi.string().pattern(new RegExp("^[a-zA-Z0-9-]*$")).required(),
  type: Joi.string().valid("pagination", "scrollytelling").required(),
  numOfSections: Joi.number(),
  navigations: Joi.array().items(Joi.object().pattern(Joi.string(), Joi.any())),
});

const basicMeta = {
  id: Joi.string().pattern(new RegExp("^[a-zA-Z0-9-]*$")).required(),
  sectionType: Joi.string().valid("basic", "hero", "map", "media").required(),
  section: Joi.string(),
};

function getAllProperties(element) {
  let props = [];
  let obj = element;

  do {
    props = props.concat(Object.getOwnPropertyNames(obj));
    obj = Object.getPrototypeOf(obj);
  } while (obj);

  // Removing duplicates
  props = [...new Set(props)];

  return props;
}

const customHtmlValidation = (value, helpers) => {
  // Access the context to check for 'steps' and 'layersVisible'
  const { steps, layersVisible } = helpers.state.ancestors[0];

  // Check if either 'steps' or 'layersVisible' is present
  if (steps || layersVisible) {
    return value; // Skip custom validation if either is present
  } else if (!value.includes("section-step")) {
    return helpers.error("any.custom", {
      message:
        "Need either <section-step> html ele or [steps/layersVisible] meta value to render sidecar/tour map.",
    });
  }

  // Parse the HTML string into a document
  const parser = new DOMParser();
  const doc = parser.parseFromString(value, "text/html");

  // Process child nodes of the document body
  const doms = Array.from(doc.body.childNodes).map(processNode);
  let error;

  doms.forEach((dom) => {
    if (dom.tagName?.toLowerCase() === "section-step") {
      if (
        !Boolean(
          dom.getAttribute("layersVisible") ||
            (dom.getAttribute("lat") &&
              dom.getAttribute("lon") &&
              dom.getAttribute("zoom")),
        )
      ) {
        error = helpers.error("any.custom", {
          message:
            "<section-step> requires either `layersVisible` or `lon`, `lon` & `zoom` properties",
        });
      }
    }
  });

  return error || value;
};

export const basicSectionMetaSchema = Joi.object(basicMeta);

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
  steps: Joi.array().items(Joi.array().items(Joi.number()).min(3)),
  layersVisible: Joi.array().items(Joi.array().items(Joi.string())),
  section: Joi.string().when("subType", {
    is: Joi.valid("sidecar", "tour"),
    then: Joi.string().custom(customHtmlValidation),
    otherwise: Joi.string(),
  }),
});

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
});
