import { html, LitElement } from "lit";
import { renderHtmlString } from "../../helpers";
/**
 * Markdown -
 *
 * [sectionType]:basic
 * [subType]:simple|container|sidecar|tour|slideshow
 * [center]:[0,0]
 * [config]:{}
 * [layers]:[{}]
 * [sync]:""
 * [zoom]:2
 *
 */

export class StoryTellingMap extends LitElement {
  static properties = {
    subType: { attribute: "sub-type", type: String },
    center: { attribute: false, type: Array },
    config: { attribute: false, type: Object },
    layers: { attribute: false, type: Array },
    sync: { attribute: "sync", type: String },
    zoom: { attribute: false, type: Number },
  };

  #style = "";
  constructor() {
    super();
    this.subType = "simple";
    this.center = [0, 0];
    this.config = null;
    this.layers = null;
    this.sync = null;
    this.zoom = null;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <slot></slot>
      <style>
        ${this.#styling}
      </style>
      <div>
        <eox-map
          class="map ${this.subType}"
          style="${this.#style}"
          .center="${this.center}"
          .layers="${this.layers}"
          .zoom="${this.zoom}"
        ></eox-map>
      </div>
    `;
  }

  #styling = `
    .map {
        margin: 0rem auto;
        padding: 1rem 0rem;
    }
    .map.simple {
        width: 41rem;height: 500px;
    }
    .map.container {
        height: 500px;
    }
  `;
}
customElements.define("story-telling-map", StoryTellingMap);
