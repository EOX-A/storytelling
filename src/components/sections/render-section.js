import { CUSTOM_ELEMENTS } from "../../custom-elements";

const addSectionHTML = (index, editor, position) => {
  if (editor)
    return `<div class="add-wrap ${position}"><span data-key="${index}" data-position="${position}">+</span></div>`;
  else return "";
};

const valueAsPerType = (propType, value) => {
  switch (propType) {
    case "Number":
      return Number(value)
    case "Array":
      return JSON.stringify(value)
    case "Object":
      return JSON.stringify(value)
    default:
      return value
  }
}

const noSpaceOrComments = (html) => {
  return html
  .replace(/<!--[\s\S]*?-->/gm,"") // comments
  .replace(/^(\s+)?|(\s+)?$/gm,"") // leading and trailing whitespace
  .replace(/\r|\n/g,"") // trailing newlines
}


const getSectionHTML = (metadata, renderedContent) => {
  const element = `story-telling-${metadata.sectionType || "basic"}`;
  let html = `<${element}`;
  const properties = Object.keys(CUSTOM_ELEMENTS[element].properties);

  properties.forEach((prop) => {
    const propType = CUSTOM_ELEMENTS[element].properties[prop]
    if (metadata[prop]) html += ` ${prop}='${valueAsPerType(propType, metadata[prop])}'`;
  });
  if(renderedContent) html += ` content='${noSpaceOrComments(renderedContent).replaceAll("'", '"')}'`

  return `${html}></${element}>`;
};

export default function (metadata, renderedContent, index, last, editor) {
  const position = last ? "bottom" : "top";
  const topAddSection = addSectionHTML(index, editor, position);
  const bottomAddSection = last ? addSectionHTML(index, editor, position) : "";

  let sectionHTML = ``;

  switch (metadata.sectionType) {
    case "basic":
    case "map":
    case undefined:
      sectionHTML = getSectionHTML(metadata, renderedContent);
      break;
    default:
      sectionHTML = getSectionHTML(metadata);
      break;
  }

  return `<div class="wrap-main" id="${metadata.id}" ${position}">${topAddSection}<main>${sectionHTML}</main>${bottomAddSection}</div>`;
}
