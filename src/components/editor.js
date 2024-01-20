import { LitElement, html } from "lit";
import initEditor from "../helpers/editor";

// Define LitElement for the editor
class StoryTellingEditor extends LitElement {
  // Define static properties for LitElement
  static properties = {
    markdown: { attribute: "markdown", type: String },
    isNavigation: { attribute: "markdown", type: Boolean },
  };

  #editorUpdate = false;
  constructor() {
    super();
    // Initialize properties
    this.markdown = "";
    this.isNavigation = false;
    this.dragging = false;
    this.resizing = false;
    // Bind methods to the instance
    this.disableTextSelection = this.disableTextSelection.bind(this);
    this.enableTextSelection = this.enableTextSelection.bind(this);
  }

  // Method to disable text selection
  disableTextSelection() {
    document.body.style.userSelect = "none";
  }

  // Method to enable text selection
  enableTextSelection() {
    document.body.style.userSelect = "";
  }

  // Lifecycle method called after the first update
  firstUpdated() {
    // Get editor container and resize handle elements
    const editorContainer = document.querySelector(".editor-wrapper");
    const resizeHandle = document.querySelector(".resize-handle");

    this.editor = initEditor(editorContainer, resizeHandle, this);
    this.#editorUpdate = true;

    // Event listener for editor content change
    this.editor.onDidChangeModelContent(() => {
      this.#editorUpdate = true;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { markdown: this.getCurrentValue() },
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  // Method to get the current value of the editor
  getCurrentValue() {
    if (this.editor) return this.editor.getValue();
    else return "";
  }

  // Lifecycle method called when the element is removed from the DOM
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.editor) {
      this.editor.dispose();
    }
  }

  // Override createRenderRoot to use LitElement as the render root
  createRenderRoot() {
    return this;
  }

  updated(changedProperties) {
    if (changedProperties.has("markdown") && !this.#editorUpdate)
      this.updateEditorContent(this.markdown);

    this.#editorUpdate = false;
  }

  updateEditorContent(markdown) {
    if (this.editor && markdown) this.editor.setValue(markdown);
  }

  // Override render method to define the HTML structure
  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="editor-wrapper ${this.isNavigation ? "partial-height" : ""}">
        <div id="editor"></div>
        <div class="resize-handle"></div>
      </div>
    `;
  }

  // Private styling CSS
  #styling = `
    .editor-wrapper {
      padding: 20px;
      padding-right: 22px;
      z-index: 9999;
      width: 35%;
      height: calc(100vh - 40px);
      position: fixed;
      top: 20px;
      right: 20px;
      border-radius: 10px;
      background: #f2f2f2;
      cursor: move;
      box-shadow: 0px 0px 3px 2px #80808026;
    }
    .resize-handle {
      position: absolute;
      width: 10px;
      height: 10px;
      bottom: 0;
      left: 0;
      background-color: #444444;
      cursor: sw-resize;
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

// Define custom element "story-telling-editor"
customElements.define("story-telling-editor", StoryTellingEditor);
