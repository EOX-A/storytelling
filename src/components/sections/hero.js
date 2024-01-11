import { html, LitElement } from "lit";
/**
 * Markdown -
 *
 * [sectionType]:hero
 * [subType]:full|cropped?
 * [vPosition]:top|middle|bottom
 * [hPosition]:left|center|right
 * [img]:https://www.gstatic.com/prettyearth/assets/full/1804.jpg
 * [imgAlt]:https://www.gstatic.com/prettyearth/assets/full/1804.jpg
 * [title]:Text
 * [description]:Text
 * [subDescription]:Text
 */

export class StoryTellingHero extends LitElement {
  static properties = {
    subType: { attribute: "sub-type", type: String },
    vPosition: { attribute: "v-position", type: String },
    hPosition: { attribute: "h-position", type: String },
    img: { attribute: "img", type: String },
    imgAlt: { attribute: "img-alt", type: String },
    title: { attribute: "title", type: String },
    description: { attribute: "description", type: String },
    subDescription: { attribute: "subDescription", type: String },
  };

  constructor() {
    super();
    this.subType = "full"
    this.vPosition = "middle"
    this.hPosition = "center"
    this.img = "https://www.gstatic.com/prettyearth/assets/full/14617.jpg"
    this.imgAlt = null
    this.title = null
    this.description = null
    this.subDescription = null
  }

  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="hero hero-${this.subType}">
        <img
          class="hero-img"
          src="https://www.gstatic.com/prettyearth/assets/full/14617.jpg"
          alt="img-alt"
        />
        <div class="hero-overlay"></div>
        <div class="hero-content hero-${this.hPosition} hero-${this.vPosition} container">
          <h1 class="title">${this.title}</h1>
          <p class="description">${this.description}</p>
          <p class="sub-description">${this.subDescription}</p>
        </div>
      </div>
    `;
  }

  #styling = `
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
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
    }
    .hero-content p.description {
      font-size: 1.25rem;
      font-weight: 400;
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
customElements.define("story-telling-hero", StoryTellingHero);
