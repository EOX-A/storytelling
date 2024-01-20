// Import necessary modules from 'lit'
import { html, LitElement } from "lit";
import { changeMediaLayer, renderHtmlString } from "../../helpers/render-html";

/**
 * StoryTellingMedia - A LitElement component for rendering media sections.
 *
 * Properties:
 * - [id]: Unique identifier for the media component.
 * - [content]: HTML content for display alongside the media.
 * - [subType]: Type of media display (e.g., 'simple', 'container', 'full', 'sidecar', 'tour', 'slideshow').
 * - [mediaTypes]: Types of media included (e.g., 'iframe', 'img', 'video').
 * - [urls]: Array of URLs for the media content.
 * - [captions]: Array of captions for each media item.
 * - [sidecarPosition]: Position of the sidecar content ('left' or 'right').
 * - [tourVPosition]: Vertical position of tour content ('top', 'middle', 'bottom').
 * - [tourHPosition]: Horizontal position of tour content ('left', 'center', 'right').
 * - [height]: Height of the media element.
 */
export class StoryTellingMedia extends LitElement {
  static properties = {
    id: { attribute: "id", type: String },
    content: { attribute: "content", type: String },
    subType: { attribute: "sub-type", type: String },
    mediaTypes: { attribute: "media-type", type: Array },
    urls: { attribute: "urls", type: Array },
    captions: { attribute: "captions", type: Array },
    sidecarPosition: { attribute: "sidecar-position", type: String },
    tourVPosition: { attribute: "tour-v-position", type: String },
    tourHPosition: { attribute: "tour-h-position", type: String },
    height: { attribute: "height", type: String },
  };

  constructor() {
    super();
    this.id = null;
    this.content = null;
    this.sectionType = "media";
    this.subType = "simple";
    this.mediaTypes = null;
    this.urls = null;
    this.captions = null;
    this.sidecarPosition = "left";
    this.tourVPosition = "middle";
    this.tourHPosition = "left";
    this.height = "auto";
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    if (this.urls) {
      changeMediaLayer(this.id, this.sectionType, 0);
    }
  }

  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="media-type-${this.subType}">
        <div class="media ${this.subType}">
          ${this.urls.map((url, index) => this.#renderMediaItem(url, index))}
        </div>
        ${this.#renderSidecarOrTourContent()}
      </div>
    `;
  }

  #renderMediaItem(url, index) {
    switch (this.mediaTypes[index]) {
      case "img":
        return html`<img id="media-${this.id}" src="${url}" alt="${this.captions[index]}" height="${this.height}"></img>`;
      case "iframe":
        return html`<iframe
          id="media-${this.id}"
          src="${url}"
          height="${this.height}"
        ></iframe>`;
      default:
        return null;
    }
  }

  #renderSidecarOrTourContent() {
    const eventObj = {
      id: this.id,
      subType: this.subType,
      sectionType: this.sectionType,
    };

    return this.subType === "sidecar" || this.subType === "tour"
      ? html`
          <div
            class="media-content-wrap ${this.subType} order-${this
              .sidecarPosition}"
          >
            ${renderHtmlString(this.content, eventObj)}
          </div>
        `
      : html``;
  }

  #styling = `
    .media-type-sidecar {
      display: flex;
    }
    .media-type-tour {
      display: grid;
    }

    /** Map Content **/
    
    .media-content-wrap {
      flex: 30%;
      display: none;
      padding: 2rem;
    }
    .media-content {
      min-height: 100vh;
    }
    .order-right {
      order: 2;
    }
    .media-content-wrap.tour .media-content {
      background: white;
      padding: 1rem;
      border-radius: 10px;
      min-height: 30vh;
      max-height: 30vh;
      overflow-y: hidden;
      margin-bottom: calc(100vh);
    }
    .media-content-wrap.sidecar, .media-content-wrap.tour {
      display: block;
    }
    .media-content-wrap.tour {
      z-index: 1;
      width: 30%;
      padding: 1rem;
    }

    /** media **/

    .media {
      overflow: hidden;
    }

    .media img, .media iframe {
      width: 100%;
      object-fit: cover;
    }

    .media.sidecar img, .media.tour img,
    .media.sidecar iframe, .media.tour iframe {
      height: 100vh;
    }

    .media {
      margin: 0rem auto;
      padding: 1rem 0rem;
    }
    .media.simple {
      width: 41rem;
    }
    .media.full {
      width: 100%;
      height: 100vh;
      padding: 0rem 0rem;
    }
    .media.sidecar {
      width: 100%;
      flex: 70%;
      height: 100vh;
      position: sticky;
      padding: 0rem 0rem;
      top:0;
    }
    .media.tour {
      width: 100%;
      flex: 70%;
      height: 100vh;
      position: sticky;
      padding: 0rem 0rem;
      top:0;
    }
    .media.tour {
      width: 100%;
    }
  `;
}

// Define the custom element
customElements.define("story-telling-media", StoryTellingMedia);
