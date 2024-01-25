import { html, LitElement } from "lit";

/**
 * StoryTellingHero - A LitElement component for rendering a hero section.
 *
 * Properties:
 * - [subType]: Defines the subtype of the hero section (e.g., 'full', 'cropped').
 * - [vPosition]: Vertical position of the content (e.g., 'top', 'middle', 'bottom').
 * - [hPosition]: Horizontal position of the content (e.g., 'left', 'center', 'right').
 * - [img]: URL of the background image.
 * - [imgAlt]: Alternate text for the image.
 * - [title]: Title text for the hero section.
 * - [description]: Description text.
 * - [subDescription]: Sub-description text.
 */
export class StoryTellingHero extends LitElement {
  static properties = {
    id: { attribute: "id", type: String, example: "id" },
    sectionType: { attribute: "section-type", type: String, example: "hero" },
    subType: { attribute: "sub-type", type: String, example: "full" },
    vPosition: {
      attribute: "v-position",
      type: String,
      example: "top|middle|bottom",
    },
    hPosition: {
      attribute: "h-position",
      type: String,
      example: "left|center|right",
    },
    img: { attribute: "img", type: String, example: "url" },
    imgAlt: { attribute: "img-alt", type: String, example: "Some caption" },
    title: { attribute: "title", type: String, example: "Title here!" },
    description: {
      attribute: "description",
      type: String,
      example: "Description here!",
    },
    subDescription: {
      attribute: "subDescription",
      type: String,
      example: "Sub-Description here!",
    },
  };

  constructor() {
    super();
    this.id = null;
    this.sectionType = "hero";
    this.subType = "full";
    this.vPosition = "middle";
    this.hPosition = "center";
    this.img = "https://www.gstatic.com/prettyearth/assets/full/14617.jpg";
    this.imgAlt = "";
    this.title = "";
    this.description = "";
    this.subDescription = "";
  }

  // Overriding LitElement's method to use light DOM
  createRenderRoot() {
    return this;
  }

  // Rendering the HTML template
  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="hero hero-${this.subType}">
        <img class="hero-img" src=${this.img} alt=${this.imgAlt} />
        <div class="hero-overlay"></div>
        <div
          class="hero-content hero-${this.hPosition} hero-${this
            .vPosition} container"
        >
          <h1 class="title">${this.title}</h1>
          <p class="description">${this.description}</p>
          <p class="sub-description">${this.subDescription}</p>
        </div>
      </div>
    `;
  }

  // Private field to store component-specific styling
  #styling = `
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
    .navigation-enabled .hero {
      height: calc(100vh - 60px);
    }
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(to bottom,rgba(0,0,0,0.7) 25%,rgba(0,0,0,0.06) 100%);
      z-index: 0;
    }
    .hero-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
    .hero-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .hero-content h1,
    .hero-content p {
      color: white;
      margin-bottom: 0rem;
    }
    .hero-content p.description {
      font-size: 1.25rem;
      font-weight: 400;
      margin-bottom: 0rem;
      margin-top: 0.2rem;
    }
    .hero-content p.sub-description {
      font-size: 0.75rem;
      font-weight: 600;
    }
    .hero-center {
      align-items: center;
      text-align: center;
    }
    .hero-left {
      align-items: start;
      text-align: left;
    }
    .hero-right {
      align-items: end;
      text-align: right;
    }
    .hero-top {
      justify-content: start;
    }
    .hero-middle {
      justify-content: center;
    }
    .hero-bottom {
      justify-content: end;
    }
  `;
}

// Define the custom element
customElements.define("story-telling-hero", StoryTellingHero);
