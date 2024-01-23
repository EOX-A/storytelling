// Import necessary modules from 'lit'
import { html, LitElement } from "lit";
import { changeMapLayer, getContentChildren, getEOxMap, handleMapSection, renderHtmlString } from "../../helpers/render-html";

/**
 * StoryTellingMap - A LitElement component for rendering map sections.
 *
 * Properties:
 * - [id]: Unique identifier for the map component.
 * - [content]: HTML content for display alongside the map.
 * - [subType]: Type of map display (e.g., 'scrollytelling', 'container', 'full', 'sidecar', 'tour', 'slideshow').
 * - [center]: Geographic center of the map (eg., latitude, longitude).
 * - [config]: General configuration object for the map. (eg., EOxMap Config - {})
 * - [layers]: Array of layer configurations for the map. (eg., EOxMap Layer - [{}])
 * - [preventScroll]: Boolean to prevent map scrolling. (eg., true, false)
 * - [sync]: Synchronization identifier for coordinating multiple maps.
 * - [zoom]: Zoom level of the map.
 * - [controls]: Object defining map controls (e.g., {"zoom":{}}).
 * - [sidecarPosition]: Position of the sidecar content (eg., 'left' or 'right').
 * - [steps]: Array of steps for the map display. (eg., [[-28.5682,-129.1632,2],[-51.5662,156.7488,4],[66.1982,-30.1932,1]])
 * - [layersVisible]: Array of layer configurations for each step. (eg., [["regions","WIND"],["WIND"],["regions","NO2"]])
 * - [tourVPosition]: Vertical position of tour content (eg., 'top', 'middle', 'bottom').
 * - [tourHPosition]: Horizontal position of tour content (eg., 'left', 'center', 'right').
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
    steps: { attribute: false, type: Array },
    layersVisible: { attribute: false, type: Array },
    tourVPosition: { attribute: "tour-v-position", type: String },
    tourHPosition: { attribute: "tour-h-position", type: String },
  };

  constructor() {
    super();
    this.id = null;
    this.content = null;
    this.sectionType = "map";
    this.subType = "scrollytelling";
    this.center = [0, 0];
    this.config = null;
    this.layers = null;
    this.sync = null;
    this.zoom = null;
    this.preventScroll = false;
    this.sidecarPosition = "left";
    this.steps = null;
    this.layersVisible = null;
    this.tourVPosition = "middle";
    this.tourHPosition = "left";
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
    const index = 0

    const mapEle = getEOxMap(this.id, "map")
    const contentEle = getContentChildren(this.id)[index]

    if(contentEle || steps)
    setTimeout(() => handleMapSection(this.id, mapEle, contentEle, index, steps, layers), 300)
  }

  // Rendering the HTML template
  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="map-type-${this.subType}">
        ${this.#renderMapContent()}
        <eox-map
          id="map-${this.id}"
          class="map ${this.subType}"
          style="${""}"
          .center="${this.center}"
          .layers="${this.layers}"
          .zoom="${this.zoom}"
          .preventScroll="${this.preventScroll}"
          ${this.config ? `.config=${this.config}` : ""}
          ${this.controls ? `.config=${this.controls}` : ""}
        ></eox-map>
      </div>
    `;
  }

  // Private method to render map content conditionally
  #renderMapContent() {
    const mapContentClass = `map-content-wrap ${this.subType} order-${this.sidecarPosition}`;
    const eventObj = {
      id: this.id,
      subType: this.subType,
      steps: this.steps,
      layers: this.layersVisible,
      sectionType: this.sectionType
    }
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

    /** Map Content **/
    
    .map-content-wrap {
      flex: 30%;
      display: none;
      padding: 2rem;
    }
    .order-right {
      order: 2;
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
    .map.scrollytelling {
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

// Define the custom element
customElements.define("story-telling-map", StoryTellingMap);
