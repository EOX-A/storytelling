## Parser and render flow- 

![image](https://github.com/EOX-A/storytelling/assets/10809211/c0d1dd4c-e684-4b29-954d-0198c2fa09ef)



# Properties to render different sections


## Properties to generate `basic`-

| Property             | Description                                               | Example                                                   |
|----------------------|-----------------------------------------------------------|-----------------------------------------------------------|
| `id`                 | Unique identifier for the section.                        | `id`                                                      |
| `sectionType`        | Type of section to be rendered                            | `basic`                                                   |
| `content`            | Markdown based content                                    | `### Any markdown based content`                          |


### Example 
```markdown
[sectionType]: basic
## What is Lorem Ipsum?

Lorem Ipsum is simply **dummy text of the printing and typesetting** industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. **Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,** from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. **Sections 1.10.32 and 1.10.33** from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
```


## Properties to generate `map`-

| Property            | Description                                               | Example                                                   |
|---------------------|-----------------------------------------------------------|-----------------------------------------------------------|
| `id`                | Unique identifier for the section.                        | `map-1`                                                   |
| `sectionType`       | Type of section to be rendered                            | `map`                                                     |
| `content`           | HTML content for display alongside the map.               | `<section-step>Anything in between</section-step>`      |
| `subType`           | Type of map display (e.g., 'simple', 'container', etc.).  | `full`                                                    |
| `center`            | Geographic center of the map (latitude, longitude).       | `[37.7749, -122.4194]`                                    |
| `config`            | General configuration object for the map.                 | `{ "mapType": "terrain", "showLabels": true }`            |
| `layers`            | Array of layer configurations for the map.                | `[{ "type": "tile", "url": "https://example.com/tiles" }]`|
| `preventScroll`     | Boolean to prevent map scrolling.                         | `true`                                                    |
| `sync`              | Synchronization identifier for coordinating multiple maps.| `sync-1`                                                  |
| `zoom`              | Zoom level of the map.                                    | `10`                                                      |
| `controls`          | Object defining map controls.                             | `{ "zoom": {}, "pan": {} }`                               |
| `sidecarPosition`   | Position of the sidecar content (left or right).          | `left`                                                    |
| `steps`      | Array of steps for the map display.                   | `[[37.7749, -122.4194, 2], [-34.6118, -58.4173, 4]]`      |
| `layersVisible`     | Array of layer configurations for each sidecar step.      | `[["regions", "WIND"], ["WIND"]]`                         |
| `tourVPosition`     | Vertical position of tour content (top, middle, bottom).  | `middle`                                                  |
| `tourHPosition`     | Horizontal position of tour content (left, center, right).| `center`                                                  |


### Example 
```markdown
[sectionType]:map
[subType]:simple
[center]:[15,48]
[layers]:[{"type":"Tile","source":{"type":"OSM"}}]
[zoom]:7
[preventScroll]:true

// Showing scroll content with - section-step
<section-step lat="12" lon="32" zoom="3" layers="layer1,layer2">
    Text here
<section-step>
```

## Properties to generate `hero`-

| Property          | Description                                                                      | Example                        |
|-------------------|----------------------------------------------------------------------------------|--------------------------------|
| `id`              | Unique identifier for the section.                                               | `id`                           |
| `sectionType`     | Type of section to be rendered                                                   | `hero`                         |
| `subType`         | Defines the subtype of the hero section.                                         | `full`                         |
| `vPosition`       | Vertical position of the content. (e.g., 'top', 'middle', 'bottom')              | `middle`                       |
| `hPosition`       | Horizontal position of the content. (e.g., 'left', 'center', 'right')            | `center`                       |
| `img`             | URL of the background image.                                                     | `https://example.com/image`    |
| `imgAlt`          | Alternate text for the image.                                                    | `Hero Image`                   |
| `title`           | Title text for the hero section.                                                 | `Welcome to the Story`         |
| `description`     | Description text.                                                                | `Explore the tales we share`   |
| `subDescription`  | Sub-description text.                                                            | `Join us on this journey`      |


### Example 
```markdown
[sectionType]:hero
[subType]: full
[vPosition]: middle
[hPosition]: center
[img]: https://www.gstatic.com/prettyearth/assets/full/14617.jpg
[imgAlt]: Satellite Img
[title]:Global Air Quality
[description]:Exploring 19 years of particulate matter in the air we breathe
[subDescription]:Hello world
```

## Properties to generate `media`-

| Property           | Description                                                     | Example                                                              |
|--------------------|-----------------------------------------------------------------|----------------------------------------------------------------------|
| `id`               | Unique identifier for the media component.                      | `media-1`                                                          |
| `sectionType`      | Type of section to be rendered.                                 | `image-gallery`                                                    |
| `content`          | HTML content for display alongside the media.                   | `<section-step>Text here </section-step>`                          |
| `subType`          | Type of media display. (e.g., 'simple', 'container', 'full', 'sidecar', 'tour', 'slideshow')| `full`                                                             |
| `mediaTypes`       | Types of media included (e.g., 'iframe', 'img', 'video').       | `["img", "video"]`                                                   |
| `urls`             | Array of URLs for the media content.                            | `["https://example.com/image.jpg", "https://example.com/video.mp4"]` |
| `captions`         | Array of captions for each media item.                          | `["A beautiful image", "An engaging video"]`                         |
| `sidecarPosition`  | Position of the sidecar content ('left' or 'right').            | `right`                                                            |
| `tourVPosition`    | Vertical position of tour content ('top', 'middle', 'bottom').  | `bottom`                                                           |
| `tourHPosition`    | Horizontal position of tour content ('left', 'center', 'right').| `center`                                                           |
| `height`           | Height of the media element.                                    | `300px`                                                            |


### Example 
```markdown
[sectionType]:media
[subType]:simple
[mediaTypes]:["img"]
[urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg"]
[height]:400px

// Showing scroll content with - section-step
<section-step type="type of media - img/iframe" url="media-url" caption="any caption">
    Text here
<section-step>
```