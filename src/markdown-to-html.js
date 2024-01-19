import DOMPurify from "isomorphic-dompurify";
import parseSectionHtml from "./components/sections/render-section";
import { PROPERTIES_KEYS } from "./custom-elements";
import { getSectionsAsMarkdownArray, isBooleanString } from "./helpers";
import { marked } from "marked";

marked.use({
  breaks: true,
  gfm: true,
});

function getMetaData(section) {
  const metadataRegex = /\[([^\]]+)\]:\s*(.+)/g;
  let metadataMatch;
  let metadata = {};

  while ((metadataMatch = metadataRegex.exec(section)) !== null) {
    let value = metadataMatch[2].trim();
    if (
      (value.startsWith("[") && value.endsWith("]")) ||
      (value.startsWith("{") && value.endsWith("}"))
    ) {
      try {
        value = JSON.parse(value.replace(/'/g, '"'));
      } catch (e) {
        console.error("Error parsing array: ", e);
      }
    } else if (isBooleanString(value)) value = Boolean(value.toLowerCase());
    else if (!isNaN(value)) value = Number(value);

    metadata[metadataMatch[1]] = value;
  }

  return metadata;
}

function getBlockData(section, last, index, currPageId, editorMode) {
  const meta = getMetaData(section);
  const renderedContent = marked(section);

  const html = parseSectionHtml(
    meta,
    renderedContent,
    index,
    last,
    currPageId,
    editorMode
  );

  return { meta, html };
}

function processMarkdownToHtml(markdown, editorMode, currentPageIndex) {
  const sectionsArr = getSectionsAsMarkdownArray(markdown);
  let htmlStr = "";
  let sectionMetaData = [];

  const storyMetaData = getMetaData(sectionsArr[0]);
  const currPageId = storyMetaData.pageIds?.[currentPageIndex];

  sectionsArr.forEach((section, index) => {
    if (index) {
      const blockData = getBlockData(
        section,
        Boolean(sectionsArr.length === index + 1),
        index,
        currPageId,
        editorMode
      );

      htmlStr += blockData.html;
      sectionMetaData = [...sectionMetaData, blockData.meta];
    }
  });

  return {
    htmlStr,
    storyMetaData,
    sectionMetaData,
  };
}

function purifyDOM(htmlStr) {
  return DOMPurify.sanitize(htmlStr, {
    CUSTOM_ELEMENT_HANDLING: {
      tagNameCheck: /^eox-|^story-telling-/,
      attributeNameCheck: new RegExp(PROPERTIES_KEYS.join("|")),
      allowCustomizedBuiltInElements: true,
    },
  });
}

export default function markdownToHtml(editorMode, markdown, currentPageIndex) {
  const { htmlStr, storyMetaData, sectionMetaData } = processMarkdownToHtml(
    markdown || "",
    editorMode,
    currentPageIndex
  );
  const processedHtml = purifyDOM(htmlStr);
  return {
    storyMetaData,
    processedHtml,
    sectionMetaData,
  };
}
