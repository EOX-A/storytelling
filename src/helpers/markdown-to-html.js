import DOMPurify from "isomorphic-dompurify";
import { PROPERTIES_KEYS } from "./custom-elements";
import { getSectionsAsMarkdownArray } from "./misc";
import { marked } from "marked";
import { CUSTOM_ELEMENTS } from "./custom-elements";

marked.use({ breaks: true, gfm: true });

/**
 * Checks if a string represents a boolean value.
 */
function isBooleanString(str) {
  // Convert the string to lowercase for case-insensitive comparison
  str = str.toLowerCase();

  // Check if it's "true" or "false"
  return str === "true" || str === "false";
}

/**
 * Adds HTML for an "Add Section" button.
 */
function addBtnToSectionHTML(index, editor, position) {
  if (editor)
    return `<div class="add-wrap ${position}"><span data-key="${index}" data-position="${position}">+</span></div>`;
  else return "";
}

/**
 * Converts a value based on its type.
 */
const valueAsPerType = (propType, value) => {
  switch (propType) {
    case "Number":
      return Number(value);
    case "Array":
    case "Object":
      return JSON.stringify(value);
    default:
      return value;
  }
};

/**
 * Removes spaces and comments from HTML.
 */
function noSpaceOrComments(html) {
  return html
    .replace(/<!--[\s\S]*?-->/gm, "") // Remove comments
    .replace(/^(\s+)?|(\s+)?$/gm, "") // Remove leading and trailing whitespace
    .replace(/\r|\n/g, ""); // Remove trailing newlines
}

/**
 * Generates HTML for a section based on metadata and rendered content.
 */
function getSectionHTML(metadata, renderedContent) {
  const element = `story-telling-${metadata.sectionType || "basic"}`;
  let html = `<${element}`;
  const properties = Object.keys(CUSTOM_ELEMENTS[element].properties);

  properties.forEach((prop) => {
    const propType = CUSTOM_ELEMENTS[element].properties[prop];
    if (metadata[prop]) {
      html += ` ${prop}='${valueAsPerType(propType, metadata[prop])}'`;
    }
  });

  if (renderedContent) {
    html += ` content='${noSpaceOrComments(renderedContent).replaceAll(
      "'",
      '"'
    )}'`;
  }

  return `${html}></${element}>`;
}

/**
 * Generates the main HTML for a section.
 */
function parseSectionHtml(
  metadata,
  renderedContent,
  sectionIndex,
  isLastSection,
  currentPageIndex,
  editor,
  viewType
) {
  const position = isLastSection ? "bottom" : "top";
  const topAddSection = addBtnToSectionHTML(sectionIndex, editor, "top");
  const bottomAddSection = isLastSection
    ? addBtnToSectionHTML(sectionIndex, editor, "bottom")
    : "";

  let sectionHTML = "";

  switch (metadata.sectionType) {
    case "basic":
    case "map":
    case "media":
    case undefined:
      sectionHTML = getSectionHTML(metadata, renderedContent);
      break;
    default:
      sectionHTML = getSectionHTML(metadata);
      break;
  }

  const isPageHidden =
    viewType === "pagination" && sectionIndex !== currentPageIndex + 1;

  return `<div class="wrap-main ${isPageHidden ? "page-hidden" : ""}" id="${
    metadata.id
  }" ${position}">${topAddSection}<main>${sectionHTML}</main>${bottomAddSection}</div>`;
}

function generateRandomAlphaNumeric() {
  return (
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    Math.random().toString(36).substring(2, 14)
  ).toLowerCase();
}

/**
 * Extract metadata from a given section using regex.
 * Handles JSON parsing, boolean, and number conversion.
 */
function getMetaData(section) {
  const metadataRegex = /\[([^\]]+)\]:\s*(.+)/g;
  let metadata = {};
  let metadataMatch;

  while ((metadataMatch = metadataRegex.exec(section)) !== null) {
    let value = metadataMatch[2].trim();
    value = parseMetadataValue(value);
    metadata[metadataMatch[1]] = value;
  }

  if (!metadata.id) metadata.id = generateRandomAlphaNumeric();

  return metadata;
}

/**
 * Parses the metadata value to handle different data types.
 */
function parseMetadataValue(value) {
  if (isJsonLike(value)) {
    return parseJsonLikeValue(value);
  } else if (isBooleanString(value)) {
    return value.toLowerCase() === "true";
  } else if (!isNaN(value)) {
    return Number(value);
  }
  return value;
}

/**
 * Checks if the value is JSON-like (array or object).
 */
function isJsonLike(value) {
  return (
    (value.startsWith("[") && value.endsWith("]")) ||
    (value.startsWith("{") && value.endsWith("}"))
  );
}

/**
 * Tries to parse a JSON-like string.
 */
function parseJsonLikeValue(value) {
  try {
    return JSON.parse(value.replace(/'/g, '"'));
  } catch (e) {
    console.error("Error parsing array: ", e);
    return value;
  }
}

/**
 * Processes a markdown section to HTML and extracts metadata.
 */
function getBlockData(
  section,
  isLastSection,
  index,
  currentPageIndex,
  editorMode,
  viewType
) {
  const meta = getMetaData(section);
  const renderedContent = marked(section);
  const html = parseSectionHtml(
    meta,
    renderedContent,
    index,
    isLastSection,
    currentPageIndex,
    editorMode,
    viewType
  );

  return { meta, html };
}

/**
 * Converts markdown to HTML with extracted metadata.
 */
function processMarkdownToHtml(markdown, editorMode, currentPageIndex) {
  const sections = getSectionsAsMarkdownArray(markdown);
  let htmlStr = "";
  let sectionMetaData = [];

  const storyMetaData = {
    ...getMetaData(sections[0]),
    numOfSections: sections.length - 1,
  };

  sections.forEach((section, index) => {
    if (index > 0) {
      const isLastSection = index === sections.length - 1;
      const blockData = getBlockData(
        section,
        isLastSection,
        index,
        currentPageIndex,
        editorMode,
        storyMetaData.type || "scrollytelling"
      );

      htmlStr += blockData.html;
      sectionMetaData.push(blockData.meta);
    }
  });

  return { htmlStr, storyMetaData, sectionMetaData };
}

/**
 * Sanitizes HTML string using DOMPurify to prevent XSS attacks.
 */
function purifyDOM(htmlStr) {
  return DOMPurify.sanitize(htmlStr, {
    CUSTOM_ELEMENT_HANDLING: {
      tagNameCheck: /^eox-|^story-telling-|^section-step/,
      attributeNameCheck: new RegExp(PROPERTIES_KEYS.join("|")),
      allowCustomizedBuiltInElements: true,
    },
  });
}

/**
 * Main function to convert markdown to HTML with metadata.
 * It sanitizes the generated HTML for security.
 */
export default function markdownToHtml(editorMode, markdown, currentPageIndex) {
  const { htmlStr, storyMetaData, sectionMetaData } = processMarkdownToHtml(
    markdown || "",
    editorMode,
    currentPageIndex
  );
  const processedHtml = purifyDOM(htmlStr);
  return { storyMetaData, processedHtml, sectionMetaData };
}
