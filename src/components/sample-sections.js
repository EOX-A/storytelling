import { html, LitElement } from "lit";
import SAMPLE_COMPONENTS from "../samples";
import { when } from "lit/directives/when.js";
import { getSectionsAsMarkdownArray } from "../helpers/misc";
console.log(SAMPLE_COMPONENTS[2].components[0].markdown)
export class StorytellingSampleSection extends LitElement {
  static properties = {
    markdown: { attribute: false, type: String },
  };
  #addSection = null;
  constructor() {
    super();
    this.markdown = null;
  }

  addComponent(index, typeIndex) {
    let sections = getSectionsAsMarkdownArray(this.markdown || "");
    sections.splice(
      this.#addSection,
      0,
      SAMPLE_COMPONENTS[typeIndex].components[index].markdown
    );
    const markdown = sections.join("\n---\n");
    this.#addSection = null;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { markdown: markdown },
        bubbles: true,
        composed: true,
      })
    );
    this.requestUpdate();
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
    }, 200);
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
              <div class="modal-overflow-y">
                ${SAMPLE_COMPONENTS.map(
                  (type, typeIndex) => html`
                    <div class="section-type-wrap">
                      <div class="header">
                        <h4>${type.name}</h4>
                        <p>${type.components.length}</p>
                      </div>
                      <hr></hr>
                      <div class="grid-container">
                        ${type.components.map(
                          (component, index) => html`
                            <div
                              class="grid-item"
                              @click=${() => this.addComponent(index, typeIndex)}
                              id="${type.name}-${index}"
                            >
                              <icon></icon>
                              <p>${component.name}</p>
                            </div>
                            <style>
                              .modal-section #${type.name}-${index} icon::before {
                                content: url("${component.icon}");
                              }
                            </style>
                          `
                        )}
                      </div>
                    </div>
                  `
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

  #styling = `
    .modal {
      background: #000000a1;
      width: 100%;
      height: 100%;
      position: fixed;
      top:0;
      left:0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: 99999;
    }
    .modal-section {
      width: 60%;
      max-width: 900px;
      padding: 18px 30px;
      background: white;
      border-radius: 10px;
    }
    .modal-section .modal-overflow-y {
      overflow-y: auto;
      height: 70vh;
    }
    .modal-section .section-type-wrap {
      padding: 8px 0px;
    }
    .modal-section .section-type-wrap .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal .section-type-wrap .header p {
      background: #2273EC;
      border-radius: 20px;
      padding: 0px 15px;
      color: white;
      height: 1.1rem;
      display: flex;
      align-items: center;
    }
    .modal-section icon {
      font-size: 0px;
    }
    .modal-section icon::before {
      width: 100%;
      color: black;
      display: inline-block;
      border: 6px solid transparent;
      border-radius: 4px;
    }
    .modal-section hr {
      border-top: 2.5px solid #e5eaf0;
    }
    .modal-section h4 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
    }
    .modal-section p {
      padding: 0px;
      margin: 0px;
      font-size: 0.8rem;
      color: #555555;
      font-weight: 500;
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px 20px;
    }
    .grid-item {
      text-align: center;
      cursor: pointer;
    }
    .modal-section .grid-item:hover > icon::before {
      border-color: #dbdbdb;
    }
    .modal-section .grid-item:hover > p {
      color: black;
      font-weight: 900;
    }
  `;
}
customElements.define(
  "story-telling-custom-sections",
  StorytellingSampleSection
);