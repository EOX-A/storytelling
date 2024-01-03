import DOMPurify from "isomorphic-dompurify";
import { html, LitElement } from "lit";
import { marked } from "marked";
import { EOxMap } from "@eox/map/dist/eox-map.umd.cjs";
import { EOxLayerControl } from "../../EOxElements/elements/layercontrol/src/main";
import "@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import scrollama from "scrollama";
import { fromLonLat } from "ol/proj.js";

const scroller = scrollama();
const ELEMENTS = {
  "eox-map": {
    class: EOxMap,
    properties: {},
  },
  "eox-layercontrol": {
    class: EOxLayerControl,
    properties: {},
  },
};

function generatePropertiesKeys(elements) {
  let propertiesKeys = [];
  Object.keys(elements).forEach((key) => {
    const ele = elements[key];
    ele.class.elementProperties.forEach((i, prop) => {
      propertiesKeys = [...propertiesKeys, ...prop];
      if (!i.attribute && !i.state) {
        elements[key].properties = {
          ...elements[key].properties,
          [prop]: i.type?.name || "Array",
        };
      }
    });
  });
  return propertiesKeys;
}

const propertiesKeys = generatePropertiesKeys(ELEMENTS);

marked.use({
  breaks: true,
  gfm: true,
});

function renderHtmlString(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return Array.from(doc.body.childNodes).map((node) => {
    if (node.nodeName === "P" || node.nodeName === "DIV") {
      const childElements = node.querySelectorAll("*");
      childElements.forEach((element) => {
        if (element.tagName.toLowerCase().startsWith("eox-")) {
          processCustomElement(element);
        }
      });
    }
    return node;
  });
}

function processCustomElement(element) {
  const eleNodeName = element.nodeName.toLowerCase();
  if (Object.keys(ELEMENTS).includes(eleNodeName)) {
    const ele = ELEMENTS[eleNodeName];
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

export class Storytelling extends LitElement {
  static properties = {
    markdown: { attribute: "markdown-property", type: String },
  };

  #html = null;
  #sectionMetaData = [];
  #RenderEditor = null;
  #storyMetaData = {};

  constructor() {
    super();
    this.markdown = null;
  }

  pauseScrolling() {
    this.#RenderEditor.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  resumeScrolling() {
    this.#RenderEditor.style.overflow = "scroll";
    document.body.style.overflow = "";
  }

  yourStepByStepFunction(functionList, direction, callback) {
    let functionIndex = direction === "up" ? functionList.length : 0;
    let isWheeling = false;

    const handleScroll = (e) => {
      if (!isWheeling) {
        isWheeling = true;

        if (e.deltaY < 0) {
          if (functionIndex) {
            functionIndex = functionIndex - 1;
            functionList[functionIndex]();
            if (functionIndex === 0) cleanup();
          } else cleanup();
        } else if (e.deltaY > 0) {
          functionIndex = functionIndex + 1;
          functionList[functionIndex]();
          if (functionList.length === functionIndex + 1) cleanup();
        }

        // Set a new timer
        setTimeout(() => {
          isWheeling = false;
        }, 1500);
      }
    };

    const cleanup = () => {
      this.#RenderEditor.removeEventListener("wheel", handleScroll);
      callback(); // Resume normal scrolling
    };

    this.#RenderEditor.addEventListener("wheel", handleScroll);
  }

  parseHTML() {
    this.#sectionMetaData = [];
    this.#storyMetaData = {};
    const parsedHtml = this.processMarkdown(this.markdown || "");
    this.#html = DOMPurify.sanitize(parsedHtml, {
      CUSTOM_ELEMENT_HANDLING: {
        tagNameCheck: /^eox-/,
        attributeNameCheck: new RegExp(propertiesKeys.join("|")),
        allowCustomizedBuiltInElements: true,
      },
    });

    if (this.markdown && this.#html?.includes("wrap-main")) {
      setTimeout(() => {
        this.initializeScroller();
      }, 500);
    }
  }

  initializeScroller() {
    scroller.destroy();
    scroller
      .setup({
        step: ".wrap-main",
        container: this.#RenderEditor,
      })
      .onStepEnter((response) => {
        this.handleStepEnter(response);
      })
      .onStepExit((response) => {
        response.element.className = "wrap-main";
      });
  }

  handleStepEnter(response) {
    const storyMeta = this.#storyMetaData;
    if (storyMeta.type === "simple") {
      const existingFocusedElement = this.#RenderEditor.querySelector(".bg");
      if (existingFocusedElement)
        existingFocusedElement.className = "wrap-main";

      response.element.className = `${response.element.className} bg`;
    }
    const sectionMeta = this.#sectionMetaData[response.index];

    if (storyMeta.type === "map-bg") {
      const eoxMap = document.querySelector(`#${storyMeta.id}`);
      const view = eoxMap.map.getView();
      const step = JSON.parse(sectionMeta.step);

      view.animate({
        center: fromLonLat([step[1], step[0]]),
        duration: 1000,
        zoom: step[2],
      });
    }

    if (sectionMeta.steps && sectionMeta.for && storyMeta.type === "simple") {
      const eoxMap = document.querySelector(sectionMeta.for);
      const steps = JSON.parse(sectionMeta.steps);
      const resetStep = JSON.parse(sectionMeta.resetStep);
      const view = eoxMap.map.getView();
      let functionList = [];

      functionList.push(() => {
        view.animate({
          center: fromLonLat([resetStep[1], resetStep[0]]),
          zoom: resetStep[2],
        });
      });

      steps.forEach((step) => {
        functionList.push(() => {
          view.animate({
            center: fromLonLat([step[1], step[0]]),
            duration: 1000,
            zoom: step[2],
          });
        });
      });

      this.pauseScrolling();

      this.yourStepByStepFunction(functionList, response.direction, () => {
        this.resumeScrolling();
      });
    }
  }

  #handleMarkDown(evt) {
    this.markdown = evt.target.value;
    this.parseHTML();
    this.requestUpdate();
  }

  firstUpdated() {
    this.parseHTML();
    window.addEventListener("resize", scroller.resize);
    this.#RenderEditor = document.querySelector(".renderer-editor");
    this.requestUpdate();
  }

  renderBlocks(section, isAfterHorizontalLine) {
    const metadataRegex = /\+\+\+\n([\s\S]*?)\n\+\+\+/;
    const metadataMatch = section.match(metadataRegex);
    let metadata = {};
    let content = section;

    if (metadataMatch) {
      metadataMatch[1]
        .trim()
        .split("\n")
        .forEach((line) => {
          const [key, value] = line.split("=").map((s) => s.trim());
          metadata[key] = value;
        });

      content = section.replace(metadataRegex, "");
    }

    const renderedContent = marked(content);

    if (isAfterHorizontalLine) {
      this.#sectionMetaData = [...this.#sectionMetaData, metadata];
      return `<div class="wrap-main">${renderedContent}</div>`;
    } else {
      this.#storyMetaData = metadata;

      if (metadata.type === "map-bg") {
        return `<div style='position: fixed; top: 0; z-index: -1; width: 50%; height: 100%;'><eox-map id='${
          metadata.id
        }' style='${metadata.style}' center='${metadata.center}' layers='${
          metadata.layers
        }' zoom=${Number(metadata.zoom)}></eox-map></div>`;
      }
      return "";
    }
  }

  processMarkdown(markdown) {
    const sections = markdown.split(/(?:^|\n)---\n/);
    let isAfterHorizontalLine = false;
    let html = "";
    for (const section of sections) {
      html += this.renderBlocks(section, isAfterHorizontalLine);
      isAfterHorizontalLine = true;
    }

    return html;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="main">
        <div class="row renderer-editor">
          ${this.markdown
            ? html`<div>${renderHtmlString(this.#html)}</div>`
            : html` <div class="empty-preview">No Preview</div> `}
        </div>
        <div class="row editor-wrapper">
          <textarea
            placeholder="Add your markdown"
            @input=${this.#handleMarkDown}
            .value=${this.markdown}
          ></textarea>
        </div>
      </div>
    `;
  }

  #styling = `
      .main {
        width: 100%;
        height: 100vh;
        margin: 0;
        padding:0;
        display: flex;
      }
      .row {
        width: 50%;
      }
      .renderer-editor {
        overflow: scroll;
      }
      .editor-wrapper, textarea {
        background: #e7e7e7;
      }
      .editor-wrapper {
        padding: 20px;
      }
      textarea {
        width: 100%;
        height: 100%;
        border: 0;
        outline: 0;
        font-family: 'Courier New', monospace;
        font-weight: 600;
        font-size: 14px;
        line-height: 140%;
      }
      .empty-preview {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      .wrap-main {
        padding: 100px 20px;
      }
      .bg {
        background: #cecef6;
      }
  `;
}
customElements.define("story-telling", Storytelling);
