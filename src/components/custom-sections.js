import { html, LitElement } from "lit";
import { SAMPLE_COMPONENTS } from "../enums";
import { when } from "lit/directives/when.js";
import { getSection } from "../helpers";

export class StorytellingCustomSection extends LitElement {
  #addSection = null;
  constructor() {
    super();
  }

  addComponent(index) {
    let sections = getSection(this.markdown || "");
    sections.splice(this.#addSection, 0, SAMPLE_COMPONENTS[index].markdown);
    const markdown = sections.join("\n---\n");
    this.#addSection = null;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { markdown: markdown },
        bubbles: true,
        composed: true,
      })
    );
    this.requestUpdate()
  }

  addSection(e, index, position) {
    this.#addSection = Number(index) + (position === "top" ? 0 : 1);
    this.requestUpdate();
  }

  updated() {
    setTimeout(() => {
      const addList = document.querySelectorAll(".add-wrap span");
    if (addList?.length) {
      addList.forEach((add) => {
        const index = add.getAttribute("data-key");
        const position = add.getAttribute("data-position") || "top";
        add.addEventListener("click", (e) =>
          this.addSection(e, index, position)
        );
      });
    }
    }, 200)
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      ${when(
        this.#addSection,
        () => html`
          <div class="modal">
            <div class="modal-section">
              <h3>Sample Components</h3>
              <div class="grid-container">
                ${SAMPLE_COMPONENTS.map(
                  (component, index) => html`<div
                    class="grid-item"
                    @click=${() => this.addComponent(index)}
                  >
                    <div class="component-icon">Icon ${index + 1}</div>
                    <p>${component.name}</p>
                  </div>`
                )}
              </div>
            </div>
            <p
              style="color: white;font-weight: 600"
              @click=${() => {
                this.#addSection = null;
                this.requestUpdate();
              }}
            >
              Close
            </p>
          </div>
        `
      )}
    `;
  }

  #styling = ``;
}
customElements.define("story-telling-custom-sections", StorytellingCustomSection);
