import { html, LitElement } from "lit";
import { renderHtmlString } from "../../helpers";
/**
 * Markdown -
 *
 * [sectionType]: basic
 * [content]:<p>some text</p>
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
        padding: 1rem 0rem;
    }
  `;
}
customElements.define("story-telling-basic", StoryTellingBasic);
