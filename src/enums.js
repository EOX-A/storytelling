const SAMPLE_COMPONENTS = [
  {
    name: "Component 1",
    markdown: `
### Component 1 here
Some text here just sample
`,
  },
  {
    name: "Component 2",
    markdown: `
### Component 2 here
<div>
    <button>Hello world</button>
</div>
`,
  },
  {
    name: "Component 3",
    markdown: `
### Component 3 here
<div>
    <ul>
      <li>List 1</li>
      <li>List 2</li>
      <li>List 3</li>
    </ul>
    <button>Hello world</button>
</div>
`,
  },
];

const MAP_BG_MARKDOWN = `
+++
type = map-bg
center = [15,48]
zoom = 1 
layers=[{ "type": "Tile", "properties": { "id": "osm", "title": "Open Street Map" }, "visible": true, "source": { "type": "OSM" } }]
id = main-map
style = width: 100%; height: 100%;
+++

---
+++
step = [20.5937,78.9629,5]
+++
<div style="display: flex; width: 100%; height: 100vh; background:transparent;align-items:center;justify-content: center;">
    <div style="padding: 20px; border-radius: 8px; max-width; 600px; min-width: 300px;background: white;height: auto; box-shadow: 1px 1px 7px #80808038;">
        India
    </div>
</div>

---
+++
step = [39.218015,-101.886808,5]
+++
<div style="display: flex; width: 100%; height: 100vh; background:transparent;align-items:center;justify-content: center;">
    <div style="padding: 20px; border-radius: 8px; max-width; 600px; min-width: 300px;background: white;height: auto; box-shadow: 1px 1px 7px #80808038;">
        USA
    </div>
</div>

---
+++
step = [47.5162,14.5501,5]
+++
<div style="display: flex; width: 100%; height: 100vh; background:transparent;align-items:center;justify-content: center;">
    <div style="padding: 20px; border-radius: 8px; max-width; 600px; min-width: 300px;background: white;height: auto; box-shadow: 1px 1px 7px #80808038;">
        Austria
    </div>
</div>
`;

const SIMPLE_MARKDOWN = `
+++
type = simple
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
steps = [[-28.5682, -129.1632, 2], [-51.5662, 156.7488, 4], [66.1982, -30.1932, 1]]
resetStep = [15, 48, 3]
for = eox-map#main
+++
### Map Section
<div style="display: flex">
<eox-map id="main" style="width: 100%; height: 300px;" zoom="3" center="[15,48]" layers='[{ "type": "Tile", "properties": { "id": "osm", "title": "Open Street Map" }, "visible": true, "source": { "type": "OSM" } }]' zoom="7"></eox-map>
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

export { SIMPLE_MARKDOWN, MAP_BG_MARKDOWN, SAMPLE_COMPONENTS };
