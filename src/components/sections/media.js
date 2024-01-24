// Import necessary modules from 'lit'
import { html, LitElement } from "lit";
import { changeMediaLayer, renderHtmlString } from "../../helpers/render-html";

/**
 * StoryTellingMedia - A LitElement component for rendering media sections.
 *
 * Properties:
 * - [id]: Unique identifier for the media component.
 * - [content]: HTML content for display alongside the media.
 * - [subType]: Type of media display (e.g., 'scrollytelling', 'container', 'full', 'sidecar', 'tour', 'slideshow').
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

  #arrNodes = null;
  constructor() {
    super();
    this.id = null;
    this.content = null;
    this.sectionType = "media";
    this.subType = "scrollytelling";
    this.mediaTypes = [];
    this.urls = [];
    this.captions = [];
    this.sidecarPosition = "left";
    this.tourVPosition = "middle";
    this.tourHPosition = "left";
    this.height = "auto";
  }

  // Update media item properties based on the rendered nodes
  #updateMediaItems(arrNodes) {
    if (["sidecar", "tour"].includes(this.subType)) {
      arrNodes.forEach((node, index) => {
        if (node) {
          this.urls[index] = node.getAttribute("url") || this.urls[index];
          this.captions[index] =
            node.getAttribute("caption") || this.captions[index];
          this.mediaTypes[index] =
            node.getAttribute("type") || this.mediaTypes[index];
        }
      });
    }
  }

  // Helper function to render media items
  #renderMediaItems() {
    return html`
      <div class="media ${this.subType}">
        ${this.urls.map((url, index) =>
          this.#renderMediaItem(
            url,
            this.mediaTypes?.[index],
            this.captions?.[index]
          )
        )}
      </div>
    `;
  }

  // Render individual media items based on their type
  #renderMediaItem(url, mediaType, caption) {
    switch (mediaType) {
      case "img":
        return html`
            <img 
              src="${url}" 
              id="media-${this.id}" 
              alt="${caption || ""}" 
              height="${this.height}"
            ></img>
          `;
      case "iframe":
        return html`
          <iframe
            src="${url}"
            id="media-${this.id}"
            height="${this.height}"
          ></iframe>
        `;
      default:
        return html``;
    }
  }

  // Render sidecar or tour content if applicable
  #renderSidecarOrTourContent(arrNodes) {
    return this.subType === "sidecar" || this.subType === "tour"
      ? html`
          <div
            class="media-content-wrap ${this.subType} order-${this
              .sidecarPosition}"
          >
            ${arrNodes}
          </div>
        `
      : html``;
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    // Render HTML content and update media items
    this.#arrNodes = renderHtmlString(this.content, {
      id: this.id,
      subType: this.subType,
      sectionType: this.sectionType,
    });
    this.#updateMediaItems(this.#arrNodes);

    // Update media layer if URLs are present
    if (this.urls?.length) changeMediaLayer(this.id, this.sectionType, 0);

    this.requestUpdate();
  }

  // Render the component's HTML template
  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="media-type-${this.subType}">
        <div class="media ${this.subType}">${this.#renderMediaItems()}</div>
        ${this.#renderSidecarOrTourContent(this.#arrNodes)}
      </div>
    `;
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
    .order-right {
      order: 2;
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
    .media.scrollytelling {
      width: 41rem;
    }
    .media.full {
      width: 100%;
      height: 100vh;
      padding: 0rem 0rem;
    }
    .media.full img {
      height: 100vh;
    }
    .media.sidecar, .media.tour {
      width: 100%;
      flex: 70%;
      height: 100vh;
      position: sticky;
      padding: 0rem 0rem;
      top:0;
    }
    .navigation-enabled .media.sidecar, 
    .navigation-enabled .media.tour, 
    .navigation-enabled .media.full, 
    .navigation-enabled .media.full img,
    .navigation-enabled .media.sidecar img, 
    .navigation-enabled .media.tour img,
    .navigation-enabled .media.sidecar iframe, 
    .navigation-enabled .media.tour iframe {
      height: calc(100vh - 60px);
      top: 60px;
    }
    .media.tour {
      width: 100%;
    }
  `;
}

// Define the custom element
customElements.define("story-telling-media", StoryTellingMedia);
