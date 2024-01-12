import { html, LitElement } from "lit";
import { renderHtmlString } from "../../helpers";
import { nothing } from "ol/pixel";

// <div class="map-content" data-lat="-28.5682" data-lon="-129.1632" data-zoom="2"><p>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1</p><p>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1</p></div><div class="map-content" data-lat="-51.5662" data-lon="156.7488" data-zoom="4"><p>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2</p><p>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2</p></div><div class="map-content" data-lat="66.1982" data-lon="-30.1932" data-zoom="1"><p>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 3</p><p>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 3</p></div>

/**
 * Markdown -
 *
 * [id]:some-id
 * [sectionType]:basic
 * [subType]:simple|container|full|sidecar|tour|slideshow
 * [center]:[0,0]
 * [config]:{}
 * [layers]:[{}]
 * [disableInteractions]:["MouseWheelZoom"]
 * [sync]:""
 * [zoom]:2
 * [controls]:{"zoom":{}}
 * [sidecarPosition]:left|right
 * [sidecarSteps]:[[-28.5682,-129.1632,2],[-51.5662,156.7488,4],[66.1982,-30.1932,1]]
 *
 */

export class StoryTellingMap extends LitElement {
  static properties = {
    id: { attribute: "id", type: String },
    content: { attribute: "content", type: String },
    subType: { attribute: "sub-type", type: String },
    center: { attribute: false, type: Array },
    config: { attribute: false, type: Object },
    layers: { attribute: false, type: Array },
    sync: { attribute: "sync", type: String },
    zoom: { attribute: false, type: Number },
    disableInteractions: { attribute: false, type: Array },
    controls: { attribute: false, type: Object },
    sidecarPosition: { attribute: "sidecar-map-position", type: String },
    sidecarSteps: { attribute: false, type: Array },
  };

  #style = "";
  constructor() {
    super();
    this.subType = "simple";
    this.id = null;
    this.center = [0, 0];
    this.config = null;
    this.layers = null;
    this.sync = null;
    this.zoom = null;
    this.disableInteractions = null;
    this.sidecarPosition = "left";
    this.sidecarSteps = null;
    this.content = null;
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    if (this.sidecarSteps?.length) {
      const firstStep = this.sidecarSteps[0];
      if (firstStep) {
        this.center = [firstStep[1], firstStep[0]];
        this.zoom = firstStep[2];
      }
    }
  }

  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="map-type-${this.subType}">
        ${this.subType === "sidecar"
          ? html`
              <div
                class="map-content-wrap ${this.subType} order-${this
                  .sidecarPosition}"
              >
                ${renderHtmlString(this.content, {
                  id: this.id,
                  sidecarSteps: this.sidecarSteps,
                })}
              </div>
            `
          : nothing}
        <eox-map
          id="map-${this.id}"
          class="map ${this.subType}"
          style="${this.#style}"
          .center="${this.center}"
          .layers="${this.layers}"
          .zoom="${this.zoom}"
          .disableInteractions="${this.disableInteractions}"
          .controls="${this.config}"
          .controls="${this.controls}"
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
    .map.full {
      width: 100%;
      height: 100vh;
      padding: 0rem 0rem;
    }
    .map.container {
      height: 500px;
    }
    .map-type-sidecar {
      display: flex;
    }
    .map.sidecar {
      width: 100%;
      flex: 70%;
      height: 100vh;
      position: sticky;
      padding: 0rem 0rem;
      top:0;
    }
    .map-content-wrap {
      flex: 30%;
      overflow-y: auto;
      display: none;
      padding: 2rem;
    }
    .map-content-wrap.sidecar {
      display: block;
    }
    .map-content {
      min-height: 100vh;
    }
    .order-right {
      order: 2;
    }
  `;
}
customElements.define("story-telling-map", StoryTellingMap);
