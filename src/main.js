import DOMPurify from "isomorphic-dompurify";
import { html, LitElement } from "lit";
import { marked } from "marked";
import { EOxMap } from "@eox/map/dist/eox-map.umd.cjs";
import { EOxLayerControl } from "../../EOxElements/elements/layercontrol/src/main";
import "@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import scrollama from "../node_modules/scrollama/src/entry";

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

let propertiesKeys = [];

Object.keys(ELEMENTS).forEach((key) => {
  const ele = ELEMENTS[key];
  ele.class.elementProperties.forEach((i, prop) => {
    propertiesKeys = [...propertiesKeys, ...prop];
    if (!i.attribute && !i.state) {
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

// Function to render each segment
function renderSegment(segment, isAfterHorizontalLine) {
  if (isAfterHorizontalLine) {
    return `<div class="wrap-main">${marked(segment)}</div>`;
  } else {
    return marked(segment);
  }
}

// Split the markdown into segments based on horizontal lines
function processMarkdown(markdown) {
  const segments = markdown.split(/(?:^|\n)---\n/);
  let isAfterHorizontalLine = false;
  let html = "";
  for (const segment of segments) {
    html += renderSegment(segment, isAfterHorizontalLine);
    isAfterHorizontalLine = true;
  }

  return html;
}

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
                  case "Boolean":
                    element[propName] =
                      propValue.toLowerCase() === "false" ? false : true;
                  case "Array":
                  case "Object":
                    element[propName] = JSON.parse(
                      propValue.replaceAll("&quot;", '"')
                    );
                    break;
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
    this.markdown = `# EOx Storytelling
---
<div style="display: flex">
<eox-map style="width: 100%; height: 300px;" zoom="3" center="[15,48]" layers='[ { "type": "Group", "properties": { "id": "group2", "title": "Data Layers", "layerControlExpand": true, "description": "# Hello world" }, "layers": [ { "type": "Tile", "properties": { "id": "WIND", "title": "WIND" }, "source": { "type": "TileWMS", "url": "https://services.sentinel-hub.com/ogc/wms/0635c213-17a1-48ee-aef7-9d1731695a54", "params": { "LAYERS": "AWS_VIS_WIND_V_10M" } } }, { "type": "Tile", "properties": { "id": "NO2", "title": "NO2" }, "source": { "type": "TileWMS", "url": "https://services.sentinel-hub.com/ogc/wms/0635c213-17a1-48ee-aef7-9d1731695a54", "params": { "LAYERS": "AWS_NO2-VISUALISATION" } } }, { "type": "Vector", "properties": { "title": "Regions", "id": "regions", "description": "Ecological regions of the earth." }, "source": { "type": "Vector", "url": "https://openlayers.org/data/vector/ecoregions.json", "format": "GeoJSON", "attributions": "Regions: @ openlayers.org" } } ] }, { "type": "Group", "properties": { "id": "group1", "title": "Background Layers" }, "layers": [ { "type": "WebGLTile", "properties": { "id": "s2", "layerControlExclusive": true, "title": "s2" }, "style": { "variables": { "red": 1, "green": 2, "blue": 3, "redMax": 3000, "greenMax": 3000, "blueMax": 3000 }, "color": [ "array", [ "/", [ "band", [ "var", "red" ] ], [ "var", "redMax" ] ], [ "/", [ "band", [ "var", "green" ] ], [ "var", "greenMax" ] ], [ "/", [ "band", [ "var", "blue" ] ], [ "var", "blueMax" ] ], 1 ], "gamma": 1.1 }, "source": { "type": "GeoTIFF", "normalize": false, "sources": [ { "url": "https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits_sinlge-file_z0-4.tif" } ] } }, { "type": "Tile", "properties": { "id": "osm", "title": "Open Street Map", "layerControlExclusive": true }, "visible": false, "opacity": 0.5, "source": { "type": "OSM" } } ] } ]' zoom="7"></eox-map>
<eox-layercontrol style="width: 100%; height: 300px;" idProperty="id" titleProperty="title" unstyled="false" for="eox-map"></eox-layercontrol>
</div>

---
**caption here**   

# EOxElements

A Web Component collection of geospatial UI elements, crafted by EOX.

## Documentation, Examples

Please find [descriptions, API docs and interactive examples here](https://eox-a.github.io/EOxElements).

## Elements

- ⭕️ **Alpha** elements are in-development and may have many frequent breaking
  changes.
- 🟡 **Beta** elements are mostly polished and ready for use, but may still have
  breaking changes.
- ✅ **Stable** elements are reviewed, documented, and API complete.

<table>
  <tr>
    <th>Element</th>
    <th>Description</th>
    <th>Docs & Examples</th>
    <th>Version</th>
    <th>State</th>
  </tr>
  <tr>
    <td><a href="./elements/chart/">eox-chart</a></td>
    <td>Dynamic chart with built-in data fetching</td>
    <td><a href="https://eox-a.github.io/EOxElements/index.html?path=/docs/elements-eox-chart--docs">Docs & Examples</a></td>
    <td><a href="elements/chart/CHANGELOG.md"><img src="https://img.shields.io/npm/v/@eox/chart.svg?label=%20" /></a></td>
    <td>⭕️</td>
  </tr>
  <tr>
    <td><a href="./elements/drawtools/">eox-drawtools</a></td>
    <td>Draw and manage features on a map</td>
    <td><a href="https://eox-a.github.io/EOxElements/index.html?path=/docs/elements-eox-drawtools--docs">Docs & Examples</a></td>
    <td><a href="elements/drawtools/CHANGELOG.md"><img src="https://img.shields.io/npm/v/@eox/drawtools.svg?label=%20" /></a></td>
    <td>🟡</td>
  </tr>
</table>
`;
  }

  parseHTML() {
    const parsedHtml = processMarkdown(this.markdown || "");
    this.#html = DOMPurify.sanitize(parsedHtml, {
      CUSTOM_ELEMENT_HANDLING: {
        tagNameCheck: /^eox-/,
        attributeNameCheck: new RegExp(propertiesKeys.join("|")),
        allowCustomizedBuiltInElements: true,
      },
    });

    setTimeout(() => {
      const scroller = scrollama();

      scroller
        .setup({
          step: ".wrap-main",
          parent: document.querySelector(".renderer-editor"),
        })
        .onStepEnter((response) => {
          response.element.className = `${response.element.className} bg`;
        })
        .onStepExit((response) => {
          response.element.className = `wrap-main`;
        });
    }, 500);
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

  createRenderRoot() {
    return this;
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
        width: 50%;
        padding: 10px;
      }
      .renderer-editor {
        overflow: scroll;
      }
      .editor-wrapper, textarea {
        background: #e7e7e7;
      }
      textarea {
        width: 100%;
        height: 100%;
        border: 0;
        outline: 0;
        font-family: 'Courier New', monospace;
        font-weight: 600;
        font-size: 14px;
        line-height: 140%;
      }
      .empty-preview {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      .wrap-main {
        min-height: 50vh;
        padding: 20px;
      }
      .bg {
        background: #f7f7fd;
      }
    `;
}
customElements.define("story-telling", Storytelling);
