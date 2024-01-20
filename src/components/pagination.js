import { html, LitElement } from "lit";

// Define LitElement for pagination
export class StorytellingPagination extends LitElement {
  // Define static properties for LitElement
  static properties = {
    pageIds: { attribute: false, type: Array },
    currentPageIndex: { attribute: false, type: Number },
  };

  constructor() {
    super();
    // Initialize properties
    this.pageIds = [];
    this.currentPageIndex = 0;
  }

  // Handler for page change event
  handelPageChange = (newPageIndex) => {
    // Check if the new page index is within bounds
    if (newPageIndex >= 0 && newPageIndex < this.pageIds.length) {
      // Update current page index
      this.currentPageIndex = newPageIndex;

      // Dispatch a custom event to notify page change
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { currentPageIndex: newPageIndex },
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  // Override createRenderRoot to use LitElement as the render root
  createRenderRoot() {
    return this;
  }

  // Override render method to define the HTML structure
  render() {
    // Determine the state of left and right arrows
    const leftArrowStateClass =
      this.currentPageIndex === 0 ? "disabled" : "enabled";
    const rightArrowStateClass =
      this.currentPageIndex >= this.pageIds.length - 1 ? "disabled" : "enabled";

    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="pagination">
        <ul>
          <!-- Left Arrow -->
          <li
            @click="${() => this.handelPageChange(this.currentPageIndex - 1)}"
            class="pagination-left ${leftArrowStateClass}"
          ></li>

          <!-- Right Arrow -->
          <li
            @click="${() => this.handelPageChange(this.currentPageIndex + 1)}"
            class="pagination-right ${rightArrowStateClass}"
          ></li>
        </ul>
      </div>
    `;
  }

  // Private styling CSS
  #styling = `
    .pagination {
      position: fixed;
      bottom: 20px;
      width: 100%;
      z-index: 999;
    }
    .pagination ul {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pagination ul li {
      list-style: none;
      border-radius: 100%;
      background: white;
      margin: 0px 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.1rem;
      cursor: pointer;
      box-shadow: 1px 2px 10px 1px #7e7e7e1f;
    }
    .pagination ul li:hover {
      background: #f2f2f2;
      box-shadow: 1px 2px 3px 1px #7e7e7e42;
    }
    .pagination ul li.disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .pagination ul li.disabled:hover {
      background: white;
      box-shadow: 1px 2px 10px 1px #7e7e7e1f;
    }
    .pagination ul li::before {
      width: 2rem;
      height: 2rem;
      color: black;
      display: inline-block;
    }
    .pagination ul li.pagination-left::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctitle%3Emenu-left%3C/title%3E%3Cpath d='M14,7L9,12L14,17V7Z' /%3E%3C/svg%3E");
    }
    .pagination ul li.pagination-right::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctitle%3Emenu-right%3C/title%3E%3Cpath d='M10,17L15,12L10,7V17Z' /%3E%3C/svg%3E");
    }
  `;
}

// Define custom element "story-telling-pagination"
customElements.define("story-telling-pagination", StorytellingPagination);
