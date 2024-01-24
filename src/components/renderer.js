import { html, LitElement } from "lit";
import { renderHtmlString } from "../helpers/render-html";

// Define LitElement for rendering storytelling content
export class StorytellingRenderer extends LitElement {
  static properties = {
    htmlStr: { attribute: "html", type: String },
  };

  constructor() {
    super();
    this.htmlStr = null;
  }

  #addFirstSection() {
    const StoryTellingCustomSectionsEle = document.querySelector(
      "story-telling-custom-sections"
    );
    StoryTellingCustomSectionsEle.addSection(1, top);
  }

  createRenderRoot() {
    return this;
  }

  // Override render method to define the HTML structure
  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="main">
        <div class="preview-wrapper row">
          ${this.htmlStr
            ? html`<div>${renderHtmlString(this.htmlStr)}</div>`
            : html`<div class="empty-preview">
                <h6>No Preview</h6>
                <div @click=${this.#addFirstSection} class="add-first-section">
                  +
                </div>
              </div>`}
        </div>
      </div>
    `;
  }

  // Private styling CSS
  #styling = `
    .main {
      width: 100%;
      height: 100vh;
      margin: 0;
      padding:0;
      display: flex;
      height: fit-content;
    }
    .preview-wrapper {
      height: fit-content;
    }
    .row {
      width: 100%;
    }
    .page-hidden {
      display: none;
    }
    .extra-padding {
      // padding-top: 60px;
    }
    .empty-preview {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      flex-direction: column;
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
    .wrap-main .add-wrap span, .add-first-section {
      background: white;
      padding: 0px 8.5px;
      border-radius: 100%;
      font-weight: 800;
      box-shadow: 1px 1px 10px #80808094;
      cursor: pointer;
    }
    .wrap-main {
      position: relative;
    }
  `;
}

// Define custom element "story-telling-renderer"
customElements.define("story-telling-renderer", StorytellingRenderer);
