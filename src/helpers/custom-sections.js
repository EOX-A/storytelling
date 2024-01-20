// customSectionHelpers.js

import { html, when } from "lit";
import { SAMPLE_COMPONENTS } from "../enums";
import { getSectionsAsMarkdownArray } from "../helpers/misc";

// Function to add a component to the sections
export function addComponent(instance, index) {
  let sections = getSectionsAsMarkdownArray(instance.markdown || "");
  sections.splice(instance.#addSection, 0, SAMPLE_COMPONENTS[index].markdown);
  const markdown = sections.join("\n---\n");
  instance.#addSection = null;
  instance.dispatchEvent(
    new CustomEvent("change", {
      detail: { markdown: markdown },
      bubbles: true,
      composed: true,
    })
  );
  instance.requestUpdate();
}

// Function to add a section
export function addSection(instance, e, index, position) {
  instance.#addSection = Number(index) + (position === "top" ? 0 : 1);
  instance.requestUpdate();
}

// Function to handle component click event
export function handleComponentClick(instance, index) {
  return () => addComponent(instance, index);
}

// Function to handle close click event
export function handleCloseClick(instance) {
  return () => {
    instance.#addSection = null;
    instance.requestUpdate();
  };
}

// Function to create the modal content
export function createModalContent(instance) {
  return html`
    <div class="modal">
      <div class="modal-section">
        <h3>Sample Components</h3>
        <div class="grid-container">
          ${SAMPLE_COMPONENTS.map(
            (component, index) => html`<div
              class="grid-item"
              @click=${handleComponentClick(instance, index)}
            >
              <div class="component-icon">Icon ${index + 1}</div>
              <p>${component.name}</p>
            </div>`
          )}
        </div>
      </div>
      <p
        style="color: white;font-weight: 600"
        @click=${handleCloseClick(instance)}
      >
        Close
      </p>
    </div>
  `;
}