import DOMPurify from "isomorphic-dompurify";
import { html, LitElement } from "lit";
import { marked } from "marked";
import { EOxMap } from "@eox/map/dist/eox-map.umd.cjs";
import { EOxLayerControl } from "@eox/layercontrol/dist/eox-layercontrol.umd.cjs";

let ELEMENTS = {
  "eox-map": {
    class: EOxMap,
    properties: {},
  },
  "eox-layercontrol": {
    class: EOxLayerControl,
    properties: {},
  },
};

Object.keys(ELEMENTS).forEach((key) => {
  const ele = ELEMENTS[key];
  console.log(ele.class.elementProperties);
  ele.class.elementProperties.forEach((i, prop) => {
    if (i.attribute === false && !i.state) {
      console.log(i.type, i, prop);
      ELEMENTS[key].properties = {
        ...ELEMENTS[key].properties,
        [prop]: i.type?.name || "Array",
      };
    }
  });
});

marked.use({
  breaks: true,
  gfm: true,
});

function renderHtmlString(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return Array.from(doc.body.childNodes).map((node) => {
    // Check if the node is a <p> element
    if (node.nodeName === "P" || node.nodeName === "DIV") {
      // Get all child elements of the node
      const childElements = node.querySelectorAll("*");

      // Check if any child elements' tag name starts with 'eox-'
      for (let element of childElements) {
        if (element.tagName.toLowerCase().startsWith("eox-")) {
          const eleNodeName = element.nodeName.toLowerCase();
          if (Object.keys(ELEMENTS).includes(eleNodeName)) {
            const ele = ELEMENTS[eleNodeName];
            Object.keys(ele.properties).forEach((propName) => {
              const propValue = element.getAttribute(propName);
              const propType = ele.properties[propName];

              if (propValue) {
                switch (propType) {
                  case "Number":
                    element[propName] = Number(propValue);
                    break;
                  case "Array":
                  case "Object":
                    element[propName] = JSON.parse(
                      propValue.replaceAll("&quot;", '"')
                    );
                  default:
                    break;
                }
              }
            });
          }
        }
      }
    }
    return node;
  });
}

export class Storytelling extends LitElement {
  // Define static properties for the component
  static properties = {
    markdown: { attribute: "markdown-property", type: String },
  };

  #html = null;
  constructor() {
    super();

    /**
     * @type {String}
     */
    this.markdown = `## Map is here
---
<eox-layercontrol style="width: 100%; height: 300px;" idProperty="id" titleProperty="title" for="eox-map"></eox-layercontrol>

<eox-map style="width: 100%; height: 300px;" zoom="10" center="[15,48]" layers='[{ "type": "Tile", "source": { "type": "OSM" } }]' zoom="7"></eox-map>

---
**caption here**    
`;
  }

  parseHTML() {
    const parsedHtml = marked.parse(this.markdown || "");
    this.#html = DOMPurify.sanitize(parsedHtml, {
      CUSTOM_ELEMENT_HANDLING: {
        tagNameCheck: /^eox-/,
        attributeNameCheck: /style|zoom|center|layers/,
        allowCustomizedBuiltInElements: true,
      },
    });
  }

  /**
   * @param {{target: { value: string }}} evt
   */
  #handleMarkDown(evt) {
    this.markdown = evt.target.value;
    this.parseHTML();
    this.requestUpdate();
  }

  firstUpdated() {
    this.parseHTML();
    this.requestUpdate();
  }

  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="main">
        <div class="row renderer-editor">
          ${this.markdown
            ? html`<div>${renderHtmlString(this.#html)}</div>`
            : html` <div class="empty-preview">No Preview</div> `}
        </div>
        <div class="row editor-wrapper">
          <textarea
            placeholder="Add your markdown"
            @input=${this.#handleMarkDown}
            .value=${this.markdown}
          ></textarea>
        </div>
      </div>
    `;
  }

  #styling = `
      .main {
        width: 100%;
        height: 100vh;
        margin: 0;
        padding:0;
        display: flex;
      }
      .row {
        width: 100%;
        padding: 10px;
      }
      .editor-wrapper, textarea {
        background: #e7e7e7;
      }
      textarea {
        width: 100%;
        height: 100%;
        border: 0;
        outline: 0;
      }
      .empty-preview {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    `;
}
customElements.define("story-telling", Storytelling);
