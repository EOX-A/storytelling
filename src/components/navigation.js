import { html, LitElement } from "lit";
import { when } from "lit/directives/when.js";
import { highlightNavigation } from "../helpers/misc";

// Define LitElement for navigation
export class StorytellingNavigation extends LitElement {
  // Define static properties for LitElement
  static properties = {
    navigations: { attribute: false, type: Array },
    currentPageIndex: { attribute: false, type: Number },
  };

  constructor() {
    super();
    // Initialize properties
    this.navigations = [];
    this.currentPageIndex = 0;
  }

  // Override createRenderRoot to use LitElement as the render root
  createRenderRoot() {
    return this;
  }

  // Lifecycle method called after the first update
  firstUpdated() {
    // Add scroll event listener for navigation highlighting
    document.addEventListener("scroll", highlightNavigation);
  }

  // Override render method to define the HTML structure
  render() {
    // Get the current navigation based on the current page index
    const currentNavigation = this.navigations[this.currentPageIndex] || null;

    return html`
      <style>
        ${this.#styling}
      </style>
      ${when(
        currentNavigation,
        () => html`
          <div class="navigation">
            <div class="container">
              <ul>
                ${Object.keys(currentNavigation)
                  .slice(0, 5)
                  .map(
                    (id) => html`
                      <li class="nav-${id}">
                        <a href="#${id}">${currentNavigation[id]}</a>
                      </li>
                    `,
                  )}
              </ul>
            </div>
          </div>
        `,
      )}
    `;
  }

  // Private styling CSS
  #styling = `
    .navigation {
      width: 100%;
      background: white;
      padding: 10px 0px;
      color: black;
      box-shadow: 0px 0px 13px 3px #8080802e;
      max-height: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .navigation .container ul {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0px;
      -ms-overflow-style: none;
      scrollbar-width: none;
      overflow-x: auto;
    }
    .navigation .container ul::-webkit-scrollbar { 
      display: none;
    }
    .navigation .container ul li {
      list-style: none;
      margin: 0px 10px;
    }
    .navigation li a {
      color: black;
      font-weight: 300;
      text-decoration: none;
      position: relative;
      display: inline-grid;
    }
    .navigation li a:after {
      content: "";
      bottom: -10px;
      width: 100%;
      height: 2px;
      background: transparent;
    }
    .navigation li a:hover:after {
      background: black;
    }
    .navigation li.active a {
      font-weight: 900;
    }
    .navigation li.active a:after {
      background: black;
    }
  `;
}

// Define custom element "story-telling-navigation"
customElements.define("story-telling-navigation", StorytellingNavigation);
