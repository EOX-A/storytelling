import { html, LitElement } from "lit";
import "@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import { loadMarkdown, highlightNavigation } from "./helpers/misc";
import { when } from "lit/directives/when.js";
import markdownToHtml from "./helpers/markdown-to-html";
import "./components/navigation";
import "./components/pagination";
import "./components/sample-sections";
import "./components/editor";
import "./components/renderer";

/**
 * Storytelling component extends LitElement to create a custom storytelling web component
 */
export class StoryTelling extends LitElement {
  // Define properties for the component
  static properties = {
    markdown: { attribute: "markdown-property", type: String },
    url: { attribute: "url-property", type: String },
    editorMode: { attribute: false, type: Boolean },
  };

  // Private fields to store component state
  #html = null;
  #storyMetaData = {};
  #currentPageIndex = 0;

  constructor() {
    super();
    this.markdown = null;
    this.editorMode = false;
    this.url = null;
  }

  // Handles markdown processing
  #handleMarkDown(markdown) {
    this.markdown = markdown;
    const { storyMetaData, processedHtml } = markdownToHtml(
      this.editorMode,
      markdown,
      this.#currentPageIndex,
    );
    this.#html = processedHtml;
    this.#storyMetaData = storyMetaData;
    setTimeout(() => highlightNavigation(), 400);
    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent("change", { bubbles: true, composed: true }),
    );
  }

  // Lifecycle method that runs when the component is first updated
  async firstUpdated() {
    const markdown = this.url ? await loadMarkdown(this.url) : this.markdown;
    setTimeout(() => this.#handleMarkDown(markdown), 1000);
  }

  // Overriding LitElement's method to use light DOM
  createRenderRoot() {
    return this;
  }

  // Rendering HTML template
  render() {
    return html`
      <style>
        ${this.#styling}
      </style>

      <!-- Init Loader Component -->
      ${when(
        this.#html === null,
        () => html`
          <div class="init-loader">
            <span class="loader"></span>
          </div>
        `,
      )}

      <!-- Navigation Component -->
      ${this.#renderNavigation()}

      <!-- Editor Component -->
      ${this.#renderEditor()}

      <!-- Main Renderer Component -->
      ${this.#renderHTMLRenderer()}

      <!-- Pagination Component -->
      ${this.#renderPagination()}

      <!-- Custom Section Component -->
      ${this.#renderCustomSections()}
    `;
  }

  // Private method to render navigation component
  #renderNavigation() {
    return when(
      this.#storyMetaData.navigations && this.#currentPageIndex >= 0,
      () => html`
        <story-telling-navigation
          .navigations=${this.#storyMetaData.navigations}
          .currentPageIndex=${this.#currentPageIndex}
        ></story-telling-navigation>
      `,
    );
  }

  // Private method to render editor component
  #renderEditor() {
    return when(
      this.editorMode,
      () => html`
        <story-telling-editor
          .markdown=${this.markdown}
          .isNavigation=${Boolean(this.#storyMetaData.navigations)}
          @change=${(e) => e.detail && this.#handleMarkDown(e.detail.markdown)}
        ></story-telling-editor>
      `,
    );
  }

  // Private method to render html renderer component
  #renderHTMLRenderer() {
    const isNavigationAvailable = Boolean(
      (this.#storyMetaData?.navigations || [])[this.#currentPageIndex],
    );
    return html`
      <story-telling-renderer
        class="${isNavigationAvailable ? "navigation-enabled" : ""}"
        .htmlStr=${this.#html}
      ></story-telling-renderer>
    `;
  }

  // Private method to render pagination component
  #renderPagination() {
    return when(
      this.#storyMetaData.type === "pagination" && this.#currentPageIndex >= 0,
      () => html`
        <story-telling-pagination
          .numOfSections=${this.#storyMetaData.numOfSections}
          .currentPageIndex=${this.#currentPageIndex}
          @change=${(e) => {
            this.#currentPageIndex = e.detail.currentPageIndex;
            if (e.detail) this.#handleMarkDown(this.markdown);
          }}
        ></story-telling-pagination>
      `,
    );
  }

  // Private method to render custom sections component
  #renderCustomSections() {
    return when(
      this.editorMode,
      () => html`
        <story-telling-custom-sections
          .markdown=${this.markdown}
          @change=${(e) => e.detail && this.#handleMarkDown(e.detail.markdown)}
        ></story-telling-custom-sections>
      `,
    );
  }

  #styling = `
    @import url("https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.classless.min.css");
    * {
      font-family: "Mukta", sans-serif;
    }
    :root {
      --spacing: 1rem;
      --block-spacing-vertical: calc(var(--spacing) * 2);
      --block-spacing-horizontal: var(--spacing);
    }
    @media (min-width: 576px) {
      .container{
        max-width: 510px;
        padding-right: 0;
        padding-left: 0;
        --block-spacing-vertical: calc(var(--spacing) * 2.5);
      }
    }
    @media (min-width: 768px) {
      .container {
        max-width: 700px;
        --block-spacing-vertical: calc(var(--spacing) * 3);
      }
    }
    @media (min-width: 992px) {
      .container {
        max-width: 920px;
        --block-spacing-vertical: calc(var(--spacing) * 3.5);
      }
    }
    @media (min-width: 1200px) {
      .container{
        max-width: 1130px;
        --block-spacing-vertical: calc(var(--spacing) * 4);
      }
    }
    .container{
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      display: block;
      padding: var(--block-spacing-vertical) var(--block-spacing-horizontal);
    }
    h1,
    h2,
    h3 {
      font-family: "Signika Negative", sans-serif;
      line-height: 120%;
      margin-top: 0.8rem;
      margin-bottom: 0.8rem;
    }
    p {
      font-weight: 400;
      line-height: 170%;
      margin-top: 0.8rem;
      margin-bottom: 1.6rem;
    }
    body {
      padding: 0;
      margin: 0;
    }
    .sb-show-main.sb-main-padded {
      padding: 0;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      --font-weight: 700;
    }

    h1 {
      --font-size: 3rem;
      --typography-spacing-vertical: 0.5rem;
    }

    h2 {
      --font-size: 2rem;
      --typography-spacing-vertical: 0.5rem;
    }

    h3 {
      --font-size: 1.75rem;
      --typography-spacing-vertical: 0.5rem;
    }

    h4 {
      --font-size: 1.5rem;
      --typography-spacing-vertical: 0.5rem;
    }

    h5 {
      --font-size: 1.25rem;
      --typography-spacing-vertical: 0.5rem;
    }
    story-telling, story-telling-renderer {    
      height: auto;
      display: block;
    }
    story-telling-renderer.navigation-enabled {
      padding-top: 60px;
    }
    story-telling-navigation {
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 999;
    }
    section-step {
      min-height: 100vh;
      display: block;
    }
    div.tour section-step {
      background: white;
      padding: 1rem;
      border-radius: 10px;
      min-height: 8vh;
      max-height: 30vh;
      overflow-y: hidden;
      margin-bottom: calc(100vh);
    }
    div.init-loader {
      background: white;
      position: fixed;
      width: 100%;
      height: 100vh;
      top: 0;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .init-loader .loader {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      position: relative;
      animation: rotate 1s linear infinite;
    }
    .init-loader .loader::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: 2.5px solid #858585;
      animation: init-loader-animation 2s linear infinite;
    }
    @keyframes rotate {
      100%   {transform: rotate(360deg)}
    }
    @keyframes init-loader-animation {
        0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
        25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
        50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
        75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
        100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
    }
  `;
}

// Defining the custom element
customElements.define("story-telling", StoryTelling);
