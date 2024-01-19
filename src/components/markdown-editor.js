import { LitElement, html } from "lit";
import * as monaco from "monaco-editor/esm/vs/editor/editor.main";

class MarkdownEditor extends LitElement {
  static properties = {
    markdown: { attribute: "markdown", type: String },
    isNavigation: { attribute: "markdown", type: Boolean },
  };
  constructor() {
    super();
    this.markdown = "";
    this.isNavigation = false;
  }

  firstUpdated() {
    super.firstUpdated();

    const editorContainer = document.querySelector(".editor-wrapper");

    editorContainer.addEventListener("mousedown", (e) => {
      if (e.target === editorContainer) {
        this.dragging = true;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
      }
    });

    document.addEventListener("mousemove", (e) => {
      if (this.dragging) {
        let dx = e.clientX - this.lastX;
        let dy = e.clientY - this.lastY;
        let { top, left } = editorContainer.getBoundingClientRect();

        editorContainer.style.top = `${top + dy}px`;
        editorContainer.style.left = `${left + dx}px`;

        this.lastX = e.clientX;
        this.lastY = e.clientY;
      }
    });

    document.addEventListener("mouseup", () => {
      this.dragging = false;
    });

    this.editor = monaco.editor.create(document.getElementById("editor"), {
      language: "markdown",
      theme: "vs",
      automaticLayout: true,
      lineNumbersMinChars: 4,
      mouseWheelZoom: true,
      fontSize: null,
      minimap: {
        enabled: false,
      },
      wordWrap: false,
      wrappingIndent: null,
      value: this.markdown,
      fontSize: "16px",
    });

    this.editor.onDidChangeModelContent(() => {
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { markdown: this.getCurrentValue() },
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  getCurrentValue() {
    if (this.editor) return this.editor.getValue();
    else return "";
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.editor) {
      this.editor.dispose();
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
      <div class="editor-wrapper ${this.isNavigation ? "partial-height" : ""}">
        <div id="editor"></div>
      </div>
    `;
  }

  #styling = `
    .editor-wrapper {
      padding: 20px;
      padding-right: 22px;
      z-index: 99;
      width: 40%;
      height: calc(100vh - 40px);
      position: fixed;
      top: 20px;
      right: 20px;
      border-radius: 10px;
      background: #f2f2f2;
      cursor: move;
      box-shadow: 0px 0px 3px 2px #80808026;
    }
    .editor-wrapper.partial-height {
      height: calc(100vh - 100px);
      top: 80px
    }
    #editor {
      width: 100%;
      height: 100%;
      border: 2px solid #ebebeb;
      cursor: auto;
    }
  `;
}

customElements.define("markdown-editor", MarkdownEditor);
