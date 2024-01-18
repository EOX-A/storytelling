import DOMPurify from "isomorphic-dompurify";
import { html, LitElement, nothing } from "lit";
import { marked } from "marked";
import "@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import scrollama from "scrollama";
import { fromLonLat } from "ol/proj.js";
import { SAMPLE_COMPONENTS } from "./enums";
import picoCSS from "./picocss";
import {
  getHandlerMarkdown,
  highlightNavigation,
  isBooleanString,
  loadMarkdown,
  renderHtmlString,
} from "./helpers";
import { CUSTOM_ELEMENTS, PROPERTIES_KEYS } from "./custom-elements";
import renderSection from "./components/sections/render-section";

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
  #addSection = null;
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
      .onStepEnter((response) => {
        // this.handleStepEnter(response);
      })
      .onStepExit((response) => {
        response.element.className = "wrap-main";
      });
  }

  handleStepEnter(response) {
    const storyMeta = this.#storyMetaData;
    if (storyMeta.type === "simple") {
      // TODO: Section selection code
      // const existingFocusedElement = this.#RenderEditor.querySelector(".bg");
      // if (existingFocusedElement)
      //   existingFocusedElement.className = "wrap-main";
      // response.element.className = `${response.element.className} bg`;
    }
    const sectionMeta = this.#sectionMetaData[response.index];

    if (storyMeta.type === "map-bg") {
      const eoxMap = document.querySelector(`#${storyMeta.id}`);
      const view = eoxMap.map.getView();
      const step = sectionMeta.step;

      view.animate({
        center: fromLonLat([step[1], step[0]]),
        duration: 1000,
        zoom: step[2],
      });
    }

    if (sectionMeta.steps && sectionMeta.for && storyMeta.type === "simple") {
      const eoxMap = document.querySelector(sectionMeta.for);
      const steps = sectionMeta.steps;
      const resetStep = sectionMeta.resetStep;
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
    setTimeout(() => highlightNavigation(), 400);
    this.requestUpdate();
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

  getSection(markdown) {
    return markdown.split(/(?:^|\n)---\n/);
  }

  processMarkdown(markdown) {
    const sections = this.getSection(markdown);
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

  #handleMode(mode) {
    this.#mode = mode;
    this.parseHTML();
    // this.requestUpdate();
  }

  addSection(e, index, position) {
    this.#addSection = Number(index) + (position === "top" ? 0 : 1);
    // this.requestUpdate();
  }

  addComponent(index) {
    let sections = this.getSection(this.markdown || "");
    sections.splice(this.#addSection, 0, SAMPLE_COMPONENTS[index].markdown);
    const markdown = sections.join("\n---\n");
    this.#addSection = null;
    this.resumeScrolling();
    this.#handleMarkDown(getHandlerMarkdown(markdown));
  }

  handelPageChange = (newPageIndex) => {
    if (
      newPageIndex >= 0 &&
      newPageIndex < this.#storyMetaData.pageIds.length
    ) {
      this.#currentPageIndex = newPageIndex;
      this.#handleMarkDown(getHandlerMarkdown(this.markdown));
    }
  };

  async firstUpdated() {
    window.addEventListener("resize", scroller.resize);
    this.#RenderEditor = document.querySelector(".preview-wrapper");
    if (this.url) {
      const markdown = await loadMarkdown(this.url);
      this.#handleMarkDown(getHandlerMarkdown(markdown));
    } else this.#handleMarkDown(getHandlerMarkdown(this.markdown));

    document.addEventListener("scroll", highlightNavigation);
  }

  updated() {
    const addList = document.querySelectorAll(".add-wrap span");
    if (addList?.length) {
      addList.forEach((add) => {
        const index = add.getAttribute("data-key");
        const position = add.getAttribute("data-position") || "top";
        add.addEventListener("click", (e) =>
          this.addSection(e, index, position)
        );
      });
    }
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      ${Object.keys(this.#storyMetaData.navigations?.[this.#currentPageIndex] || {}).length
        ? html`<div class="navigation">
            <div class="container">
              <ul>
                ${Object.keys(this.#storyMetaData.navigations[this.#currentPageIndex])
                  .slice(0, 5)
                  .map(
                    (id) =>
                      html`<li class="nav-${id}">
                        <a href="#${id}"
                          >${this.#storyMetaData.navigations[this.#currentPageIndex][id]}</a
                        >
                      </li>`
                  )}
              </ul>
            </div>
          </div>`
        : nothing}
      <div class="main ${this.editor ? "" : `no-editor`} ${this.#storyMetaData.navigations ? "extra-nav-padding": ""}">
        <div class="preview-wrapper row">
          ${this.#html
            ? html`<div>${renderHtmlString(this.#html)}</div>`
            : html`<div class="empty-preview">No Preview</div>`}
        </div>
        ${this.editor
          ? html`<div class="row editor-wrapper">
              <textarea
                placeholder="Add your markdown"
                @input=${this.#handleMarkDown}
                .value=${this.markdown}
              ></textarea>
            </div>`
          : nothing}
      </div>
      ${this.#storyMetaData.pageIds
        ? html`
          <div class="pagination">
            <ul>
              <li
               .onclick="${() =>
                 this.handelPageChange(this.#currentPageIndex - 1)}"
               class="pagination-left ${
                 this.#currentPageIndex === 0 ? "disabled" : "enabled"
               }"></li>
              <li .onclick="${() =>
                this.handelPageChange(this.#currentPageIndex + 1)}" 
              class="pagination-right ${
                this.#currentPageIndex >= this.#storyMetaData.pageIds.length - 1
                  ? "disabled"
                  : "enabled"
              }"></li>
            <ul>
          </div>
      `
        : nothing}
      ${this.#addSection && this.editor
        ? html`
            <div class="modal">
              <div class="modal-section">
                <h3>Sample Components</h3>
                <div class="grid-container">
                  ${SAMPLE_COMPONENTS.map(
                    (component, index) => html`<div
                      class="grid-item"
                      @click=${() => this.addComponent(index)}
                    >
                      <div class="component-icon">Icon ${index + 1}</div>
                      <p>${component.name}</p>
                    </div>`
                  )}
                </div>
              </div>
              <p
                style="color: white;font-weight: 600"
                @click=${() => {
                  this.#addSection = null;
                  // this.requestUpdate();
                }}
              >
                Close
              </p>
            </div>
          `
        : nothing}
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
      .page-hidden {
        display: none;
      }
      .extra-nav-padding {
        padding-top: 60px;
      }
      .navigation {
        width: 100%;
        background: white;
        padding: 10px 0px;
        position: fixed;
        top:0;
        z-index: 999;
        color: black;
        box-shadow: 0px 0px 13px 3px #8080802e;
      }
      .navigation .container ul {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .navigation .container ul li {
        list-style: none;
        margin: 0px 10px;
      }
      .navigation li a {
        color: black;
        font-weight: 300;
        text-decoration: none;
        position: relative;
        display: inline-grid;
      }
      .navigation li a:after {
        content: "";
        bottom: -10px;
        width: 100%;
        height: 2px;
        background: transparent;
      }
      .navigation li a:hover:after {
        background: black;
      }
      .navigation li.active a {
        font-weight: 900;
      }
      .navigation li.active a:after {
        background: black;
      }
      .pagination {
        position: fixed;
        bottom: 20px;
        width: 100%;
        z-index:999;
      }
      .pagination ul {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pagination ul li {
        list-style: none;
        border-radius: 100%;
        background: white;
        margin: 0px 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.1rem;
        cursor: pointer;
        box-shadow: 1px 2px 10px 1px #7e7e7e1f;
      }
      .pagination ul li:hover {
        background: #f2f2f2;
        box-shadow: 1px 2px 3px 1px #7e7e7e42;
      }
      .pagination ul li.disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .pagination ul li.disabled:hover {
        background: white;
        box-shadow: 1px 2px 10px 1px #7e7e7e1f;
      }
      .pagination ul li::before {
        width: 2rem;
        height: 2rem;
        color: black;
        display: inline-block;
      }
      .pagination ul li.pagination-left::before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctitle%3Emenu-left%3C/title%3E%3Cpath d='M14,7L9,12L14,17V7Z' /%3E%3C/svg%3E");
      }
      .pagination ul li.pagination-right::before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctitle%3Emenu-right%3C/title%3E%3Cpath d='M10,17L15,12L10,7V17Z' /%3E%3C/svg%3E");
      }
      .no-editor .row {
        width: 100%;
      }
      .preview-wrapper {
        overflow-y: scroll;
      }
      .no-editor .preview-wrapper {
        overflow-y: unset;
      }
      .editor-wrapper, textarea {
        background: #e7e7e7;
      }
      .editor-wrapper {
        padding: 20px;
        position: relative;
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
