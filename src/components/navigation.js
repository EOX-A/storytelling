import { html, LitElement } from "lit";
import { when } from "lit/directives/when.js";
import { highlightNavigation } from "../helpers";

export class StorytellingNavigation extends LitElement {
  static properties = {
    navigations: { attribute: false, type: Array },
    currentPageIndex: { attribute: false, type: Number },
  };
  constructor() {
    super();
    this.navigations = [];
    this.currentPageIndex = 0;
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    document.addEventListener("scroll", highlightNavigation);
  }

  render() {
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
                    (id) =>
                      html`
                        <li class="nav-${id}">
                          <a href="#${id}">${currentNavigation[id]}</a>
                        </li>
                      `
                  )}
              </ul>
            </div>
          </div>
        `
      )}
    `;
  }

  #styling = `
    .navigation {
        width: 100%;
        background: white;
        padding: 10px 0px;
        position: fixed;
        top:0;
        z-index: 999;
        color: black;
        box-shadow: 0px 0px 13px 3px #8080802e;
    }
    .navigation .container ul {
        display: flex;
        align-items: center;
        justify-content: center;
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
customElements.define("story-telling-navigation", StorytellingNavigation);
