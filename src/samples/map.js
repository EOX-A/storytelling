const sectionTypeMap = `[sectionType]:map`;

const basicMapConfig = `
[center]:[15,48]
[layers]:[{"type":"Tile","source":{"type":"OSM"}}]
[zoom]:7
[preventScroll]:true
`;

const mapContent = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
`

const sidecarMapLayer = `[{"type":"Tile","properties":{"id":"osm","title":"OpenStreetMap","layerControlExclusive":true},"visible":false,"opacity":0.5,"source":{"type":"OSM"}},{"type":"Tile","properties":{"title":"EOxCloudless2019","id":"EOxCloudless"},"source":{"type":"XYZ","url":"//s2maps-tiles.eu/wmts/1.0.0/s2cloudless-2019_3857/default/g/{z}/{y}/{x}.jpg"}},{"type":"Vector","properties":{"title":"Regions","id":"regions","description":"Ecologicalregionsoftheearth."},"source":{"type":"Vector","url":"https://openlayers.org/data/vector/ecoregions.json","format":"GeoJSON","attributions":"Regions:@openlayers.org"}}]`

const MAP_SIMPLE = `${sectionTypeMap}
[subType]:simple
${basicMapConfig}
`;

const MAP_CONTAINER = `${sectionTypeMap}
[subType]:container
${basicMapConfig}
`;


const MAP_FULL = `${sectionTypeMap}
[subType]:full
${basicMapConfig}
`;

const MAP_TOUR = `${sectionTypeMap}
[subType]:tour
${basicMapConfig}
[sidecarPosition]:right
[tourVPosition]:middle
[tourHPosition]:left
[tourSteps]:[[20.5937,78.9629,5],[-30.5662,130.7488,4],[66.1982,-30.1932,1]]

<div class="map-content">
<h3>India</h3>
${mapContent}
</div>

<div class="map-content">
<h3>Australia</h3>
${mapContent}
</div>

<div class="map-content">
<h3>World</h3>
${mapContent}
</div>
`

const MAP_SIDECAR = `${sectionTypeMap}
[subType]:sidecar
[center]:[15,48]
[layers]:${sidecarMapLayer}
[zoom]:7
[preventScroll]:true
[sidecarPosition]:right
[sidecarSteps]:[[20.5937,78.9629,5],[-30.5662,130.7488,4],[66.1982,-30.1932,1]]
[sidecarLayers]:[["regions","EOxCloudless"],["EOxCloudless"],["regions","osm"]]

<div class="map-content">
<h3>India</h3>
${mapContent}
</div>

<div class="map-content">
<h3>Australia</h3>
${mapContent}
</div>

<div class="map-content">
<h3>World</h3>
${mapContent}
</div>
`

export { MAP_SIMPLE, MAP_CONTAINER, MAP_FULL, MAP_SIDECAR, MAP_TOUR };
