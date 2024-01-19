import { html, LitElement } from "lit";
import "@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import { loadMarkdown, highlightNavigation } from "./helpers";
import { when } from "lit/directives/when.js";
import markdownToHtml from "./markdown-to-html";
import "./components/navigation";
import "./components/pagination";
import "./components/custom-sections";
import "./components/editor";
import "./components/renderer";

export class Storytelling extends LitElement {
  static properties = {
    markdown: { attribute: "markdown-property", type: String },
    url: { attribute: "url-property", type: String },
    editorMode: { attribute: false, type: Boolean },
  };

  #html = null;
  #storyMetaData = {};
  #currentPageIndex = 0;

  constructor() {
    super();
    this.markdown = null;
    this.editorMode = false;
    this.url = null;
  }

  #handleMarkDown(markdown) {
    this.markdown = markdown;
    const { storyMetaData, processedHtml } = markdownToHtml(
      this.editorMode,
      markdown,
      this.#currentPageIndex
    );
    this.#html = processedHtml;
    this.#storyMetaData = storyMetaData;
    setTimeout(() => highlightNavigation(), 400);

    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent(`change`, {
        bubbles: true,
        composed: true,
      })
    );
  }

  async firstUpdated() {
    if (this.url) {
      const markdown = await loadMarkdown(this.url);
      this.#handleMarkDown(markdown);
    } else this.#handleMarkDown(this.markdown);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${this.#styling}
      </style>

      <!-- Navigation Component -->
      ${when(
        this.#storyMetaData.navigations && this.#currentPageIndex >= 0,
        () => html`
          <story-telling-navigation
            .navigations=${this.#storyMetaData.navigations}
            .currentPageIndex=${this.#currentPageIndex}
          ></story-telling-navigation>
        `
      )}

      <!-- Editor Component -->
      ${when(
        this.editorMode,
        () => html`
          <story-telling-editor
            .markdown=${this.markdown}
            .isNavigation=${Boolean(this.#storyMetaData.navigations)}
            @change=${(e) =>
              e.detail && this.#handleMarkDown(e.detail.markdown)}
          ></story-telling-editor>
        `
      )}

      <!-- Main Renderer Component -->
      <story-telling-renderer
        .htmlStr=${this.#html}
        .isNavigationAvailable=${Boolean(this.#storyMetaData.navigations)}
      >
      </story-telling-renderer>

      <!-- Pagination Component -->
      ${when(
        this.#storyMetaData.pageIds && this.#currentPageIndex >= 0,
        () => html`
          <story-telling-pagination
            .pageIds=${this.#storyMetaData.pageIds}
            .currentPageIndex=${this.#currentPageIndex}
            @change=${(e) => {
              this.#currentPageIndex = e.detail.currentPageIndex;
              if (e.detail) this.#handleMarkDown(this.markdown);
            }}
          ></story-telling-pagination>
        `
      )}

      <!-- Custom Section Component -->
      ${when(
        this.editorMode,
        () => html`
          <story-telling-custom-sections
            .markdown=${this.markdown}
            @change=${(e) =>
              e.detail && this.#handleMarkDown(e.detail.markdown)}
          ></story-telling-custom-sections>
        `
      )}
    `;
  }

  #styling = ``;
}
customElements.define("story-telling", Storytelling);
