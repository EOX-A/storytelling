import DOMPurify from "dompurify";
import { html, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { marked } from "marked";

export class Storytelling extends LitElement {
  // Define static properties for the component
  static properties = {
    markdown: { attribute: "markdown-property", type: String },
  };

  #html = null;
  constructor() {
    super();

    /**
     * @type {String}
     */
    this.markdown = null;
  }

  /**
   * @param {{target: { value: string }}} evt
   */
  #handleMarkDown(evt) {
    this.markdown = evt.target.value;
    const parsedHtml = marked.parse(this.markdown || "");
    console.log(parsedHtml);
    console.log(marked.lexer(this.markdown));
    this.#html = DOMPurify.sanitize(parsedHtml);
    console.log(this.#html);
    this.requestUpdate();
  }

  firstUpdated() {
    const parsedHtml = marked.parse(this.markdown || "");
    this.#html = DOMPurify.sanitize(parsedHtml);
  }

  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="main">
        <div class="row renderer-editor">
          ${this.markdown
            ? html`<div>${unsafeHTML(this.#html)}</div>`
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
        width: 100%;
        padding: 10px;
      }
      .editor-wrapper, textarea {
        background: #e7e7e7;
      }
      textarea {
        width: 100%;
        height: 100%;
        border: 0;
        outline: 0;
      }
      .empty-preview {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    `;
}
customElements.define("story-telling", Storytelling);
