// Import necessary modules from 'lit'
import { html, LitElement } from "lit";
import { renderHtmlString } from "../../helpers";

/**
 * StoryTellingBasic - A LitElement component for rendering basic content sections.
 *
 * Properties:
 * - [content]: The HTML content to be displayed in the basic section.
 */
export class StoryTellingBasic extends LitElement {
  // Define the properties of the component
  static properties = {
    content: { attribute: "content", type: String },
  };

  constructor() {
    super();
    this.content = null;
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
      <div class="basic">${renderHtmlString(this.content)}</div>
    `;
  }

  // Private field to store component-specific styling
  #styling = `
    .basic {
      width: 41rem;
      margin: 0 auto;
      padding: 1rem 0;
    }
  `;
}

// Define the custom element
customElements.define("story-telling-basic", StoryTellingBasic);
