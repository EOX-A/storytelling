import DOMPurify from "isomorphic-dompurify";
import parseSectionHtml from "./components/sections/render-section";
import { PROPERTIES_KEYS } from "./custom-elements";
import { getSectionsAsMarkdownArray, isBooleanString } from "./helpers";
import { marked } from "marked";

marked.use({ breaks: true, gfm: true });

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
function getBlockData(section, isLastSection, index, currPageId, editorMode) {
  const meta = getMetaData(section);
  const renderedContent = marked(section);
  const html = parseSectionHtml(
    meta,
    renderedContent,
    index,
    isLastSection,
    currPageId,
    editorMode
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

  const storyMetaData = getMetaData(sections[0]);
  const currPageId = storyMetaData.pageIds?.[currentPageIndex];

  sections.forEach((section, index) => {
    if (index > 0) {
      const isLastSection = index === sections.length - 1;
      const blockData = getBlockData(
        section,
        isLastSection,
        index,
        currPageId,
        editorMode
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
      tagNameCheck: /^eox-|^story-telling-/,
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
