import DOMPurify from "isomorphic-dompurify";
import { html, LitElement } from "lit";
import { marked } from "marked";
import { EOxMap } from "@eox/map/dist/eox-map.umd.cjs";
import { EOxLayerControl } from "../../EOxElements/elements/layercontrol/src/main";
import "@eox/map/dist/eox-map-advanced-layers-and-sources.js";
import scrollama from "scrollama";

const scroller = scrollama();
const ELEMENTS = {
  "eox-map": {
    class: EOxMap,
    properties: {},
  },
  "eox-layercontrol": {
    class: EOxLayerControl,
    properties: {},
  },
};

function generatePropertiesKeys(elements) {
  let propertiesKeys = [];
  Object.keys(elements).forEach((key) => {
    const ele = elements[key];
    ele.class.elementProperties.forEach((i, prop) => {
      propertiesKeys = [...propertiesKeys, ...prop];
      if (!i.attribute && !i.state) {
        elements[key].properties = {
          ...elements[key].properties,
          [prop]: i.type?.name || "Array",
        };
      }
    });
  });
  return propertiesKeys;
}

const propertiesKeys = generatePropertiesKeys(ELEMENTS);

marked.use({
  breaks: true,
  gfm: true,
});

function renderHtmlString(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return Array.from(doc.body.childNodes).map((node) => {
    if (node.nodeName === "P" || node.nodeName === "DIV") {
      const childElements = node.querySelectorAll("*");
      childElements.forEach((element) => {
        if (element.tagName.toLowerCase().startsWith("eox-")) {
          processCustomElement(element);
        }
      });
    }
    return node;
  });
}

function processCustomElement(element) {
  const eleNodeName = element.nodeName.toLowerCase();
  if (Object.keys(ELEMENTS).includes(eleNodeName)) {
    const ele = ELEMENTS[eleNodeName];
    Object.keys(ele.properties).forEach((propName) => {
      const propValue = element.getAttribute(propName);
      const propType = ele.properties[propName];

      if (propValue) {
        element[propName] = parsePropertyValue(propType, propValue);
      }
    });
  }
}

function parsePropertyValue(propType, propValue) {
  switch (propType) {
    case "Number":
      return Number(propValue);
    case "Boolean":
      return propValue.toLowerCase() !== "false";
    case "Array":
    case "Object":
      return JSON.parse(propValue.replaceAll("&quot;", '"'));
    default:
      return propValue;
  }
}

export class Storytelling extends LitElement {
  static properties = {
    markdown: { attribute: "markdown-property", type: String },
  };

  #html = null;
  #sectionMetaData = [];
  #RenderEditor = null;
  #storyMetaData = {};

  constructor() {
    super();
    this.markdown = `
+++
type: simple
+++
---
### Map Section
<div style="display: flex">
<eox-map id="maino" style="width: 100%; height: 300px;" zoom="3" center="[15,48]" layers='[ { "type": "Group", "properties": { "id": "group2", "title": "Data Layers", "layerControlExpand": true, "description": "# Hello world" }, "layers": [ { "type": "Tile", "properties": { "id": "WIND", "title": "WIND" }, "source": { "type": "TileWMS", "url": "https://services.sentinel-hub.com/ogc/wms/0635c213-17a1-48ee-aef7-9d1731695a54", "params": { "LAYERS": "AWS_VIS_WIND_V_10M" } } }, { "type": "Tile", "properties": { "id": "NO2", "title": "NO2" }, "source": { "type": "TileWMS", "url": "https://services.sentinel-hub.com/ogc/wms/0635c213-17a1-48ee-aef7-9d1731695a54", "params": { "LAYERS": "AWS_NO2-VISUALISATION" } } }, { "type": "Vector", "properties": { "title": "Regions", "id": "regions", "description": "Ecological regions of the earth." }, "source": { "type": "Vector", "url": "https://openlayers.org/data/vector/ecoregions.json", "format": "GeoJSON", "attributions": "Regions: @ openlayers.org" } } ] }, { "type": "Group", "properties": { "id": "group1", "title": "Background Layers" }, "layers": [ { "type": "WebGLTile", "properties": { "id": "s2", "layerControlExclusive": true, "title": "s2" }, "style": { "variables": { "red": 1, "green": 2, "blue": 3, "redMax": 3000, "greenMax": 3000, "blueMax": 3000 }, "color": [ "array", [ "/", [ "band", [ "var", "red" ] ], [ "var", "redMax" ] ], [ "/", [ "band", [ "var", "green" ] ], [ "var", "greenMax" ] ], [ "/", [ "band", [ "var", "blue" ] ], [ "var", "blueMax" ] ], 1 ], "gamma": 1.1 }, "source": { "type": "GeoTIFF", "normalize": false, "sources": [ { "url": "https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits_sinlge-file_z0-4.tif" } ] } }, { "type": "Tile", "properties": { "id": "osm", "title": "Open Street Map", "layerControlExclusive": true }, "visible": false, "opacity": 0.5, "source": { "type": "OSM" } } ] } ]' zoom="7"></eox-map>
<eox-layercontrol style="width: 100%; height: 300px;" idProperty="id" titleProperty="title" unstyled="false" for="eox-map#maino"></eox-layercontrol>
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

---
+++
subStep: [[-28.5682, -129.1632, 2], [-51.5662, 156.7488, 4], [66.1982, -30.1932, 1]]
resetStep: [15, 48, 3]
for: eox-map#main
+++
### Map Section
<div style="display: flex">
<eox-map id="main" style="width: 100%; height: 300px;" zoom="3" center="[15,48]" layers='[ { "type": "Group", "properties": { "id": "group2", "title": "Data Layers", "layerControlExpand": true, "description": "# Hello world" }, "layers": [ { "type": "Tile", "properties": { "id": "WIND", "title": "WIND" }, "source": { "type": "TileWMS", "url": "https://services.sentinel-hub.com/ogc/wms/0635c213-17a1-48ee-aef7-9d1731695a54", "params": { "LAYERS": "AWS_VIS_WIND_V_10M" } } }, { "type": "Tile", "properties": { "id": "NO2", "title": "NO2" }, "source": { "type": "TileWMS", "url": "https://services.sentinel-hub.com/ogc/wms/0635c213-17a1-48ee-aef7-9d1731695a54", "params": { "LAYERS": "AWS_NO2-VISUALISATION" } } }, { "type": "Vector", "properties": { "title": "Regions", "id": "regions", "description": "Ecological regions of the earth." }, "source": { "type": "Vector", "url": "https://openlayers.org/data/vector/ecoregions.json", "format": "GeoJSON", "attributions": "Regions: @ openlayers.org" } } ] }, { "type": "Group", "properties": { "id": "group1", "title": "Background Layers" }, "layers": [ { "type": "WebGLTile", "properties": { "id": "s2", "layerControlExclusive": true, "title": "s2" }, "style": { "variables": { "red": 1, "green": 2, "blue": 3, "redMax": 3000, "greenMax": 3000, "blueMax": 3000 }, "color": [ "array", [ "/", [ "band", [ "var", "red" ] ], [ "var", "redMax" ] ], [ "/", [ "band", [ "var", "green" ] ], [ "var", "greenMax" ] ], [ "/", [ "band", [ "var", "blue" ] ], [ "var", "blueMax" ] ], 1 ], "gamma": 1.1 }, "source": { "type": "GeoTIFF", "normalize": false, "sources": [ { "url": "https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits_sinlge-file_z0-4.tif" } ] } }, { "type": "Tile", "properties": { "id": "osm", "title": "Open Street Map", "layerControlExclusive": true }, "visible": false, "opacity": 0.5, "source": { "type": "OSM" } } ] } ]' zoom="7"></eox-map>
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

  pauseScrolling() {
    this.#RenderEditor.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  resumeScrolling() {
    this.#RenderEditor.style.overflow = "scroll";
    document.body.style.overflow = "";
  }

  yourStepByStepFunction(functionList, direction, callback) {
    let functionIndex = direction === "up" ? functionList.length : 0;
    let isWheeling = false;

    const handleScroll = (e) => {
      if (!isWheeling) {
        isWheeling = true;

        if (e.deltaY < 0) {
          if (functionIndex) {
            functionIndex = functionIndex - 1;
            functionList[functionIndex]();
            if (functionIndex === 0) cleanup();
          } else cleanup();
        } else if (e.deltaY > 0) {
          functionIndex = functionIndex + 1;
          functionList[functionIndex]();
          if (functionList.length === functionIndex + 1) cleanup();
        }

        // Set a new timer
        setTimeout(() => {
          isWheeling = false;
        }, 1500);
      }
    };

    const cleanup = () => {
      this.#RenderEditor.removeEventListener("wheel", handleScroll);
      callback(); // Resume normal scrolling
    };

    this.#RenderEditor.addEventListener("wheel", handleScroll);
  }

  parseHTML() {
    this.#sectionMetaData = [];
    this.#storyMetaData = {};
    const parsedHtml = this.processMarkdown(this.markdown || "");
    this.#html = DOMPurify.sanitize(parsedHtml, {
      CUSTOM_ELEMENT_HANDLING: {
        tagNameCheck: /^eox-/,
        attributeNameCheck: new RegExp(propertiesKeys.join("|")),
        allowCustomizedBuiltInElements: true,
      },
    });

    if (this.markdown && this.#html?.includes("wrap-main")) {
      setTimeout(() => {
        this.initializeScroller();
      }, 500);
    }
  }

  initializeScroller() {
    scroller
      .setup({
        step: ".wrap-main",
        container: this.#RenderEditor,
        threshold: 15000,
      })
      .onStepEnter((response) => {
        this.handleStepEnter(response);
      })
      .onStepExit((response) => {
        response.element.className = `wrap-main`;
      });
  }

  handleStepEnter(response) {
    response.element.className = `${response.element.className} bg`;
    const sectionMeta = this.#sectionMetaData[response.index];

    if (sectionMeta.subStep && sectionMeta.for) {
      const eoxMap = document.querySelector(sectionMeta.for);
      const subStep = JSON.parse(sectionMeta.subStep);
      const resetStep = JSON.parse(sectionMeta.resetStep);
      const view = eoxMap.map.getView();
      let functionList = [];

      functionList.push(() => {
        view.animate({
          center: [resetStep[0], resetStep[1]],
          zoom: resetStep[2],
        });
      });

      subStep.forEach((step) => {
        functionList.push(() => {
          view.animate({
            center: [step[0], step[1]],
            duration: 1000,
            zoom: step[2],
          });
        });
      });

      this.pauseScrolling();

      this.yourStepByStepFunction(functionList, response.direction, () => {
        this.resumeScrolling();
      });
    }
  }

  #handleMarkDown(evt) {
    this.markdown = evt.target.value;
    this.parseHTML();
    this.requestUpdate();
  }

  firstUpdated() {
    scroller.destroy();
    this.parseHTML();
    window.addEventListener("resize", scroller.resize);
    this.#RenderEditor = document.querySelector(".renderer-editor");
    this.requestUpdate();
  }

  renderBlocks(section, isAfterHorizontalLine) {
    const metadataRegex = /\+\+\+\n([\s\S]*?)\n\+\+\+/;
    const metadataMatch = section.match(metadataRegex);
    let metadata = {};
    let content = section;

    if (metadataMatch) {
      metadataMatch[1]
        .trim()
        .split("\n")
        .forEach((line) => {
          const [key, value] = line.split(":").map((s) => s.trim());
          metadata[key] = value;
        });

      content = section.replace(metadataRegex, "");
    }

    const renderedContent = marked(content);

    if (isAfterHorizontalLine) {
      this.#sectionMetaData = [...this.#sectionMetaData, metadata];
      return `<div class="wrap-main">${renderedContent}</div>`;
    } else {
      this.#storyMetaData = metadata;
      return "";
    }
  }

  processMarkdown(markdown) {
    const sections = markdown.split(/(?:^|\n)---\n/);
    let isAfterHorizontalLine = false;
    let html = "";
    for (const section of sections) {
      html += this.renderBlocks(section, isAfterHorizontalLine);
      isAfterHorizontalLine = true;
    }

    return html;
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
        background: #cecef6;
      }
  `;
}
customElements.define("story-telling", Storytelling);
