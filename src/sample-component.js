import { html, LitElement } from "lit";
import { marked } from "marked";
import "@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import "./components/sections/hero"
import "./components/sections/basic"
import scrollama from "scrollama";
import {
  CUSTOM_ELEMENTS} from "./custom-elements" 

marked.use({
  breaks: true,
  gfm: true,
});

export class SampleComponent extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <style>
        ${this.#styling}
        ${this.#elementStyling}
      </style>
      <div class="main no-editor">
        <div class="preview-wrapper row">
        
          <story-telling-hero .hPosition=${"center"} .vPosition=${"middle"}></story-telling-hero>
          <story-telling-basic></storytelling-basic>
        
        </div>
      </div>
    `;
  }

  #elementStyling = `
    
  `

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
      }
      .wrap-main .add-wrap.bottom {
        top: unset;
        bottom: -10px;
      }
      .wrap-main .add-wrap span {
        background: white;
        padding: 2px 8px;
        border-radius: 100%;
        font-weight: 800;
        box-shadow: 1px 1px 10px #80808094;
        cursor: pointer;
      }
      .wrap-main {
        padding: 3.2rem 0rem;
        // padding: 100px 20px;
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
customElements.define("sample-component", SampleComponent);
