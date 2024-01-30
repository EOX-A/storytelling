// Import necessary modules from 'lit'
import { html, LitElement, nothing } from "lit";
import {
  changeMapLayer,
  getContentChildren,
  getEOxMap,
  handleMapSection,
  renderHtmlString,
} from "../../helpers/render-html";

/**
 * StoryTellingMap - A LitElement component for rendering map sections.
 *
 * Properties:
 * - [id]: Unique identifier for the map component.
 * - [content]: HTML content for display alongside the map.
 * - [subType]: Type of map display (e.g., 'basic', 'container', 'full', 'sidecar', 'tour', 'slideshow').
 * - [center]: Geographic center of the map (eg., latitude, longitude).
 * - [layers]: Array of layer configurations for the map. (eg., EOxMap Layer - [{}])
 * - [preventScroll]: Boolean to prevent map scrolling. (eg., true, false)
 * - [zoom]: Zoom level of the map.
 * - [controls]: Object defining map controls (e.g., {"zoom":{}}).
 * - [stepPosition]: Position of the sidecar content (eg., 'left', 'center' or 'right').
 * - [steps]: Array of steps for the map display. (eg., [[-28.5682,-129.1632,2],[-51.5662,156.7488,4],[66.1982,-30.1932,1]])
 * - [layersVisible]: Array of layer configurations for each step. (eg., [["regions","WIND"],["WIND"],["regions","NO2"]])
 */
export class StoryTellingMap extends LitElement {
  static properties = {
    id: { attribute: "id", type: String, example: "id" },
    sectionType: { attribute: "section-type", type: String, example: "map" },
    content: { attribute: "content", type: String },
    subType: {
      attribute: "sub-type",
      type: String,
      example: "basic|container|full|sidecar|tour|slideshow",
    },
    center: { attribute: false, type: Array, example: "[0,0]" },
    config: { attribute: false, type: Object },
    layers: {
      attribute: false,
      type: Array,
      example: `[{"type":"Tile","source":{"type":"OSM"}}]`,
    },
    zoom: { attribute: false, type: Number, example: "2" },
    preventScroll: { attribute: false, type: Boolean, example: "true" },
    controls: { attribute: false, type: Object },
    stepPosition: {
      attribute: "step-position",
      type: String,
      example: "left|right|center",
    },
    steps: {
      attribute: false,
      type: Array,
      example: `[["lat","long","zoom"]]`,
    },
    layersVisible: { attribute: false, type: Array, example: `[["layer-id"]]` },
  };

  constructor() {
    super();
    this.id = null;
    this.content = null;
    this.sectionType = "map";
    this.subType = "basic";
    this.center = [0, 0];
    this.layers = null;
    this.zoom = null;
    this.preventScroll = false;
    this.stepPosition = "left";
    this.steps = null;
    this.layersVisible = null;
  }

  createRenderRoot() {
    return this;
  }

  // Lifecycle method for initial component setup
  firstUpdated() {
    this.#initializeMap();
  }

  // Private method to handle initial map setup
  #initializeMap() {
    const steps = this.steps;
    const layers = this.layersVisible;
    const index = 0;

    const mapEle = getEOxMap(this.id, "map");
    const contentEle = getContentChildren(this.id)[index];

    if (contentEle || steps)
      setTimeout(
        () =>
          handleMapSection(this.id, mapEle, contentEle, index, steps, layers),
        300,
      );
  }

  // Rendering the HTML template
  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="map-type-${this.subType} wrap-${this.stepPosition}">
        <eox-map
          id="map-${this.id}"
          class="map ${this.subType}"
          style="${""}"
          .center="${this.center}"
          .layers="${this.layers}"
          .zoom="${this.zoom}"
          .preventScroll="${this.preventScroll}"
          .controls="${this.controls || {}}"
        ></eox-map>
        ${this.#renderMapContent()}
      </div>
    `;
  }

  // Private method to render map content conditionally
  #renderMapContent() {
    const mapContentClass = `map-content-wrap ${this.subType} order-${this.stepPosition}`;
    const eventObj = {
      id: this.id,
      subType: this.subType,
      steps: this.steps,
      layers: this.layersVisible,
      sectionType: this.sectionType,
    };
    return this.subType === "sidecar" || this.subType === "tour"
      ? html`
          <div class="${mapContentClass}">
            ${renderHtmlString(this.content, eventObj)}
          </div>
        `
      : html``;
  }

  #styling = `
    .map-type-sidecar {
      display: flex;
    }
    .map-type-tour {
      display: grid;
    }
    .map-type-tour.wrap-left {
      justify-items: start;
    }
    .map-type-tour.wrap-right {
      justify-items: end;
    }
    @media screen and (max-width: 1024px) {
      .map-type-sidecar {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
      }
    }

    /** Map Content **/
    
    .map-content-wrap {
      flex: 30%;
      display: none;
      padding: 2rem;
    }
    .order-left {
      order: 1;
    }
    .map-type-tour .order-left, .order-right {
      order: 3;
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
      order: 2;
      margin: 0rem auto;
      padding: 1rem 0rem;
    }
    .map.basic {
      width: 41rem;
      height: 500px;
    }
    .map.full {
      width: 100%;
      height: 100vh;
      padding: 0rem 0rem;
    }
    .map.sidecar, .map.tour {
      width: 100%;
      flex: 70%;
      height: 100vh;
      position: sticky;
      padding: 0rem 0rem;
      top:0;
    }
    .navigation-enabled .map.sidecar, 
    .navigation-enabled .map.tour, 
    .navigation-enabled .map.full {
      height: calc(100vh - 60px);
      top: 60px;
    }
    .map.tour {
      width: 100%;
    }
    .map.container {
      height: 500px;
    }
    @media screen and (max-width: 1024px) {
      .navigation-enabled .map.sidecar, .map.sidecar {
        background: white;
        height: 40vh;
        box-shadow: 0 10px 17px 0px #80808036;
      }
      .map-content-wrap.sidecar {
        order: 2;
      }
      .map.basic {
        width: 100%;
      }
      .map-content-wrap.tour {
        width: 100%;
      }
    }
  `;
}

// Define the custom element
customElements.define("story-telling-map", StoryTellingMap);
