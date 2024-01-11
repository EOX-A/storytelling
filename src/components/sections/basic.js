import { html, LitElement } from "lit";
import { renderHtmlString } from "../../helpers";
/**
 * Markdown -
 *
 * [section-type]:hero
 * [sub-type]:full|cropped?
 * [v-position]:top|middle|bottom
 * [h-position]:left|center|right
 * [img]:https://www.gstatic.com/prettyearth/assets/full/1804.jpg
 * [img-alt]:https://www.gstatic.com/prettyearth/assets/full/1804.jpg
 *
 */

export class StoryTellingBasic extends LitElement {
  static properties = {
    content: { attribute: "content", type: String },
  };

  constructor() {
    super();
    this.content = null
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
      <div class="basic">
        ${renderHtmlString(this.content)}
      </div>
    `;
  }

  #styling = `
    .basic {
        width: 41rem;
        margin: 0rem auto;
        padding: 3.2rem 0rem;
    }
  `;
}
customElements.define("story-telling-basic", StoryTellingBasic);
