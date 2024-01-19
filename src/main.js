import DOMPurify from "isomorphic-dompurify";
import { html, LitElement, nothing } from "lit";
import { marked } from "marked";
import "@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import scrollama from "scrollama";
import { SAMPLE_COMPONENTS } from "./enums";
import {
  getSection,
  highlightNavigation,
  isBooleanString,
  loadMarkdown,
  renderHtmlString,
} from "./helpers";
import { when } from "lit/directives/when.js";
import { PROPERTIES_KEYS } from "./custom-elements";
import renderSection from "./components/sections/render-section";
import "./components/navigation";
import "./components/pagination";
import "./components/custom-sections";
import "./components/markdown-editor";

const scroller = scrollama();

marked.use({
  breaks: true,
  gfm: true,
});

export class Storytelling extends LitElement {
  static properties = {
    markdown: { attribute: "markdown-property", type: String },
    url: { attribute: "url-property", type: String },
    editor: { attribute: false, type: Boolean },
  };

  #html = null;
  #sectionMetaData = [];
  #RenderEditor = null;
  #storyMetaData = {};
  #mode = "editor";
  #currentPageIndex = 0;

  constructor() {
    super();
    this.markdown = null;
    this.editor = false;
    this.url = null;
  }

  pauseScrolling() {
    this.#RenderEditor.style.overflowY = "hidden";
    document.body.style.overflowY = "hidden";
  }

  resumeScrolling() {
    this.#RenderEditor.style.overflowY = "scroll";
    document.body.style.overflowY = "";
  }

  #purifyDOM(parsedHtml) {
    return DOMPurify.sanitize(parsedHtml, {
      CUSTOM_ELEMENT_HANDLING: {
        tagNameCheck: /^eox-|^story-telling-/,
        attributeNameCheck: new RegExp(PROPERTIES_KEYS.join("|")),
        allowCustomizedBuiltInElements: true,
      },
    });
  }

  parseHTML() {
    this.#sectionMetaData = [];
    this.#storyMetaData = {};
    const parsedHtml = this.processMarkdown(this.markdown || "");
    this.#html = this.#purifyDOM(parsedHtml);

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
      .onStepEnter(() => {})
      .onStepExit((response) => {
        response.element.className = "wrap-main";
      });
  }

  #handleMarkDown(markdown) {
    this.markdown = markdown;
    this.parseHTML();
    setTimeout(() => highlightNavigation(), 400);

    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent(`change`, {
        bubbles: true,
        composed: true,
      })
    );
  }

  renderBlocks(section, isAfterHorizontalLine, last, index) {
    const metadataRegex = /\[([^\]]+)\]:\s*(.+)/g;
    let metadataMatch;
    let metadata = {};
    let content = section;

    while ((metadataMatch = metadataRegex.exec(section)) !== null) {
      let value = metadataMatch[2].trim();
      if (
        (value.startsWith("[") && value.endsWith("]")) ||
        (value.startsWith("{") && value.endsWith("}"))
      ) {
        // Attempt to parse as an array
        try {
          value = JSON.parse(value.replace(/'/g, '"'));
        } catch (e) {
          console.error("Error parsing array: ", e);
        }
      } else if (isBooleanString(value)) {
        value = Boolean(value.toLowerCase());
      } else if (!isNaN(value)) {
        value = Number(value);
      }

      metadata[metadataMatch[1]] = value;
    }

    const renderedContent = marked(content);

    if (isAfterHorizontalLine) {
      this.#sectionMetaData = [...this.#sectionMetaData, metadata];
      const pageId = this.#storyMetaData.pageIds?.[this.#currentPageIndex];
      return renderSection(
        metadata,
        renderedContent,
        index,
        last,
        pageId,
        this.editor
      );
    } else {
      this.#storyMetaData = metadata;

      if (metadata.type === "map-bg") {
        return `<div style='position: fixed; top: 0; z-index: -1; width: 50%; height: 100%;'><eox-map id='${
          metadata.id
        }' style='${
          metadata.style
        }' center='[${metadata.center.toString()}]' layers='${JSON.stringify(
          metadata.layers
        )}' zoom=${Number(metadata.zoom)}></eox-map></div>`;
      }
      return "";
    }
  }

  processMarkdown(markdown) {
    const sections = getSection(markdown);
    let isAfterHorizontalLine = false;
    let html = "";
    sections.forEach((section, index) => {
      html += this.renderBlocks(
        section,
        isAfterHorizontalLine,
        Boolean(sections.length === index + 1),
        index
      );
      isAfterHorizontalLine = true;
    });

    return html;
  }

  async firstUpdated() {
    window.addEventListener("resize", scroller.resize);
    this.#RenderEditor = document.querySelector(".preview-wrapper");
    if (this.url) {
      const markdown = await loadMarkdown(this.url);
      this.#handleMarkDown(markdown);
    } else this.#handleMarkDown(this.markdown);

    document.addEventListener("scroll", highlightNavigation);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      ${when(
        this.#storyMetaData.navigations && this.#currentPageIndex >= 0,
        () => html`
          <story-telling-navigation
            .navigations=${this.#storyMetaData.navigations}
            .currentPageIndex=${this.#currentPageIndex}
          ></story-telling-navigation>
        `
      )}
      <div
        class="main ${this.#storyMetaData.navigations
          ? "extra-nav-padding"
          : ""}"
      >
        <div class="preview-wrapper row">
          ${this.#html
            ? html`<div>${renderHtmlString(this.#html)}</div>`
            : html`<div class="empty-preview">No Preview</div>`}
        </div>
      </div>
      ${when(
        this.editor,
        () => html`
          <markdown-editor
            .markdown=${this.markdown}
            @change=${(e) => this.#handleMarkDown(e.detail.markdown)}
          ></markdown-editor>
        `
      )}
      ${when(
        this.#storyMetaData.pageIds && this.#currentPageIndex >= 0,
        () => html`
          <story-telling-pagination
            .pageIds=${this.#storyMetaData.pageIds}
            .currentPageIndex=${this.#currentPageIndex}
            @change=${(e) => {
              this.#currentPageIndex = e.detail.currentPageIndex;
              this.#handleMarkDown(this.markdown);
            }}
          ></story-telling-pagination>
        `
      )}
      ${when(
        this.editor,
        () => html`
          <story-telling-custom-sections
            @change=${(e) => this.#handleMarkDown(e.detail.markdown)}
          ></story-telling-custom-sections>
        `
      )}
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
        width: 100%;
      }
      .page-hidden {
        display: none;
      }
      .extra-nav-padding {
        padding-top: 60px;
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
        resize: none;
      }
      .empty-preview {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      .wrap-main .add-wrap {
        position: absolute;
        display: flex;
        justify-content: center;
        padding: 0;
        margin: 0;
        top: -10px;
        left: 0;
        width: 100%;
        z-index: 3;
      }
      .wrap-main .add-wrap.bottom {
        top: unset;
        bottom: -10px;
      }
      .wrap-main .add-wrap span {
        background: white;
        padding: 0px 8px;
        border-radius: 100%;
        font-weight: 800;
        box-shadow: 1px 1px 10px #80808094;
        cursor: pointer;
      }
      .wrap-main {
        position: relative;
      }
      .bg {
        background: #cecef6;
      }
      .modal {
        background: #000000a1;
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        left:0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 99999;
      }
      .modal-section {
        width: 60%;
        padding: 12px 20px;
        background: white;
        border-radius: 10px;
      }
      .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
        gap: 10px;
      }
      .grid-item {
        text-align: center;
        border: 4px gray dotted;
        border-radius: 6px;
        cursor: pointer;
      }
      .component-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        font-size: 36px;
        font-weight: 600;
      }
      .modal-section p {
        border-top: 3px dotted gray;
        padding-top: 14px;
      }
      .modal-section .grid-item:hover {
        background: #8080803b;
      }
  `;
}
customElements.define("story-telling", Storytelling);
