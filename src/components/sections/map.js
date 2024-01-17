import { html, LitElement } from "lit";
import { changeMapLayer, renderHtmlString } from "../../helpers";

/**
 * Markdown -
 *
 * [id]:some-id
 * [sectionType]:map
 * [subType]:simple|container|full|sidecar|tour|slideshow
 * [center]:[0,0]
 * [config]:{}
 * [layers]:[{}]
 * [preventScroll]:true
 * [sync]:""
 * [zoom]:2
 * [controls]:{"zoom":{}}
 * [sidecarPosition]:left|right
 * [sidecarSteps]:[[-28.5682,-129.1632,2],[-51.5662,156.7488,4],[66.1982,-30.1932,1]]
 * [sidecarLayers]:[["regions","WIND"],["WIND"],["regions","NO2"]]
 * [tourVPosition]:top|middle|bottom
 * [tourHPosition]:left|center|right
 * [tourSteps]:[[-28.5682,-129.1632,2],[-51.5662,156.7488,4],[66.1982,-30.1932,1]]
 * [tourLayers]:[["regions","WIND"],["WIND"],["regions","NO2"]]
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
    preventScroll: { attribute: false, type: Boolean },
    controls: { attribute: false, type: Object },
    sidecarPosition: { attribute: "sidecar-position", type: String },
    sidecarSteps: { attribute: false, type: Array },
    sidecarLayers: { attribute: false, type: Array },
    tourVPosition: { attribute: "tour-v-position", type: String },
    tourHPosition: { attribute: "tour-h-position", type: String },
    tourSteps: { attribute: false, type: Array },
    tourLayers: { attribute: false, type: Array },
  };

  #style = "";
  constructor() {
    super();
    this.sectionType = "map";
    this.subType = "simple";
    this.id = null;
    this.center = [0, 0];
    this.config = null;
    this.layers = null;
    this.sync = null;
    this.zoom = null;
    this.preventScroll = false;
    this.sidecarPosition = "left";
    this.sidecarSteps = null;
    this.content = null;
    this.sidecarLayers = null;
    this.tourVPosition = "middle";
    this.tourHPosition = "left";
    this.tourLayers = null;
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const steps = this.sidecarSteps || this.tourSteps;
    const layers = this.sidecarLayers || this.tourLayers;

    if (steps?.length) {
      const firstStep = steps[0];
      if (firstStep) {
        this.center = [firstStep[1], firstStep[0]];
        this.zoom = firstStep[2];
      }
    }

    if (layers?.length) {
      const currLayer = layers[0];
      changeMapLayer(this.id, currLayer, this.sectionType);
    }
  }

  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="map-type-${this.subType}">
        ${this.subType === "sidecar" || this.subType === "tour"
          ? html`
              <div
                class="map-content-wrap ${this.subType} order-${this
                  .sidecarPosition}"
              >
                ${renderHtmlString(this.content, {
                  id: this.id,
                  subType: this.subType,
                  steps: this.sidecarSteps || this.tourSteps,
                  layers: this.sidecarLayers || this.tourLayers,
                  sectionType: this.sectionType
                })}
              </div>
            `
          : html``}
        <eox-map
          id="map-${this.id}"
          class="map ${this.subType}"
          style="${this.#style || " "}"
          .center="${this.center}"
          .layers="${this.layers}"
          .zoom="${this.zoom}"
          .preventScroll="${this.preventScroll}"
          .controls="${this.config}"
          .controls="${this.controls}"
        ></eox-map>
      </div>
    `;
  }

  #styling = `
    .map-type-sidecar {
      display: flex;
    }
    .map-type-tour {
      display: grid;
    }

    /** Map Content **/
    
    .map-content-wrap {
      flex: 30%;
      display: none;
      padding: 2rem;
    }
    .map-content {
      min-height: 100vh;
    }
    .order-right {
      order: 2;
    }
    .map-content-wrap.tour .map-content {
      background: white;
      padding: 1rem;
      border-radius: 10px;
      min-height: 30vh;
      max-height: 30vh;
      overflow-y: hidden;
      margin-bottom: calc(100vh);
    }
    .map-content-wrap.sidecar, .map-content-wrap.tour {
      display: block;
    }
    .map-content-wrap.tour {
      z-index: 1;
      width: 30%;
      padding: 1rem;
    }

    /** EOxmap **/

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
    .map.sidecar {
      width: 100%;
      flex: 70%;
      height: 100vh;
      position: sticky;
      padding: 0rem 0rem;
      top:0;
    }
    .map.tour {
      width: 100%;
      flex: 70%;
      height: 100vh;
      position: sticky;
      padding: 0rem 0rem;
      top:0;
    }
    .map.tour {
      width: 100%;
    }
    .map.container {
      height: 500px;
    }
  `;
}
customElements.define("story-telling-map", StoryTellingMap);
