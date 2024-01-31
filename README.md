# EOxStoryTelling

A web component that allow us to create Map based interactive stories using `markdown`.

## Major Feature

- Create stories using **ScrollyTelling** and **Pagination**, implemented through Markdown code.
- Offer multiple section types, such as:
  - **Basic**
    - Allows generating content using any Markdown format.
  - **Map**
    - Includes Basic, Container, Full Size, Sidecar, and Tour options.
    - Capable of changing layers and adjusting location and zoom levels while scrolling.
  - **Hero Section**
    - Features image-based and video-based hero backgrounds.
  - **Media**
    - Supports Image/Iframe in various sizes: Basic, Container, Full Size, Sidecar, and Tour.
    - Enables media changes during scrolling.
    - Incorporates interactive map and media components in sidecar and tour sections.
- Enables story generation through Markdown code or URLs.
- Utilizes a fast `Monaco`-based editor for quick story creation using Markdown.
- Provides editor snippets to easily generate predefined Markdown meta code.
- Allows seamless toggling between preview and editor modes.
- Customizable editor resizing and dragging for optimal screen placement.
- Auto-play feature with controls for play, pause, and speed (0.5x, 1x and 2x).
- Allows the addition of custom, pre-defined examples into stories.
- Makes extensive use of [EOxMap](https://github.com/EOX-A/EOxElements/tree/main/elements/map) for map functionalities.
- Ensures basic mobile compatibility for story viewing.

## Parser and render flow-

![image](https://github.com/EOX-A/storytelling/assets/10809211/c0d1dd4c-e684-4b29-954d-0198c2fa09ef)

## Development

### Initial Setup

In order to use npm workspaces and all the elements properly, please use **Node.js >= 20.9.0 LTS**.

Install all root and all element dependencies:

```
npm install
```

### Dev server

To start the storybook dev server, use:

```
npm start
```

### Format the code:

```
npm run format
```

## Usage

```javascript
<story-telling
  .editorMode=${true|false}
  .url=${"URI"}
  .markdown=${"### Hello"}
  .theme=${{
    "primary-color": "#bc6c0c",
    "primary-hover-color": "#b6680a",
    "header-font-family": "'Oswald', sans-serif",
  }}
  .type=${"scrollytelling|pagination"}
  .autoplay=${true|false}
></story-telling>
<link
  href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

## Styling

### Using theme property inside `story-telling` element -

```jsonc
{
  "background-color": "white",
  "font-color": "#2c3d49",
  "primary-color": "#0c88db",
  "primary-hover-color": "#08769b",
  "secondary-color": "#596b78",
  "secondary-hover-color": "#415462",
  "header-font-family": "'Signika Negative', sans-serif", // Manually `<link>`/`@import` font-source
  "body-font-family": "'Mukta', sans-serif", // Manually `<link>`/`@import` font-source
}
```

### Using CSS variables to override value -

```css
:root,
[data-theme="dark"],
[data-theme="light"],
:root:not([data-theme="dark"]),
:root:not([data-theme="light"]) {
  --color: #2c3d49;
  --h1-color: #2c3d49;
  --h2-color: #2c3d49;
  --h3-color: #2c3d49;
  --h4-color: #2c3d49;
  --h5-color: #2c3d49;
  --h6-color: #2c3d49;
  --primary: #0c88db;
  --primary-hover: #08769b;
  --primary-background-hover: #08769b;
  --secondary: #596b78;
  --secondary-hover: #415462;
  --header-font-family: "Signika Negative", sans-serif;
  --body-font-family: "Mukta", sans-serif;
}
```

## Properties to render different sections -

---

## Properties to generate Story Meta-

| Property      | Description                                                                                                    | Example                              |
| ------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `id`          | Unique identifier for the whole story.                                                                         | `id`                                 |
| `type`        | Type of story i.e. - `scrollytelling` or `pagination`                                                          | `scrollytelling`                     |
| `navigations` | Array of objects with `id` and `title` for navigation. Each object element represent navigation for each page. | `[{"id": "Title"}, {"id": "Title"}]` |

## Properties to generate `basic`-

| Property      | Description                        | Example                                          |
| ------------- | ---------------------------------- | ------------------------------------------------ |
| `id`          | Unique identifier for the section. | `id`                                             |
| `sectionType` | Type of section to be rendered     | `basic`                                          |
| `content`     | Markdown based content             | `### Any markdown based content or <html> based` |

### Editor snippet command -

```markdown
---basic
```

### Example

```markdown
[sectionType]: basic

## What is Lorem Ipsum?

Lorem Ipsum is simply **dummy text of the printing and typesetting** industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. **Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,** from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. **Sections 1.10.32 and 1.10.33** from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
```

## Properties to generate `map`-

| Property        | Description                                               | Example                                                    |
| --------------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| `id`            | Unique identifier for the section.                        | `map-1`                                                    |
| `sectionType`   | Type of section to be rendered                            | `map`                                                      |
| `content`       | HTML content for display alongside the map.               | `<section-step>Anything in between</section-step>`         |
| `subType`       | Type of map display (e.g., 'simple', 'container', etc.).  | `full`                                                     |
| `center`        | Geographic center of the map (latitude, longitude).       | `[37.7749, -122.4194]`                                     |
| `layers`        | Array of layer configurations for the map.                | `[{ "type": "tile", "url": "https://example.com/tiles" }]` |
| `preventScroll` | Boolean to prevent map scrolling.                         | `true`                                                     |
| `zoom`          | Zoom level of the map.                                    | `10`                                                       |
| `controls`      | Object defining map controls.                             | `{ "zoom": {}, "pan": {} }`                                |
| `stepPosition`  | Position for map section content (left, center or right). | `left`                                                     |
| `steps`         | Array of steps for the map display.                       | `[[37.7749, -122.4194, 2], [-34.6118, -58.4173, 4]]`       |
| `layersVisible` | Array of layer configurations for each sidecar step.      | `[["regions", "WIND"], ["WIND"]]`                          |

### Editor snippet command -

```markdown
---map
```

### Example

```markdown
[sectionType]: map
[subType]: simple

[center]:[15,48]
[layers]:[{"type":"Tile","source":{"type":"OSM"}}]
[zoom]:7
[preventScroll]:true

// Showing scroll content with - section-step
<section-step lat="12" lon="32" zoom="3" duration="2000" layers="layer1,layer2">
Text here
<section-step>
```

## Properties to generate `hero`-

| Property         | Description                                                           | Example                      |
| ---------------- | --------------------------------------------------------------------- | ---------------------------- |
| `id`             | Unique identifier for the section.                                    | `id`                         |
| `sectionType`    | Type of section to be rendered                                        | `hero`                       |
| `subType`        | Defines the subtype of the hero section.                              | `full`                       |
| `vPosition`      | Vertical position of the content. (e.g., 'top', 'middle', 'bottom')   | `middle`                     |
| `hPosition`      | Horizontal position of the content. (e.g., 'left', 'center', 'right') | `center`                     |
| `img`            | URL of the background image.                                          | `https://example.com/image`  |
| `imgAlt`         | Alternate text for the image.                                         | `Hero Image`                 |
| `video`          | URL of the background video.                                          | `https://example.com/video`  |
| `videoAlt`       | Alternate text for the video.                                         | `Hero Video`                 |
| `title`          | Title text for the hero section.                                      | `Welcome to the Story`       |
| `description`    | Description text.                                                     | `Explore the tales we share` |
| `subDescription` | Sub-description text.                                                 | `Join us on this journey`    |

### Editor snippet command -

```markdown
---hero
```

### Example

```markdown
[sectionType]: hero
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

| Property       | Description                                                                                  | Example                                                              |
| -------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `id`           | Unique identifier for the media component.                                                   | `media-1`                                                            |
| `sectionType`  | Type of section to be rendered.                                                              | `media`                                                              |
| `content`      | HTML content for display alongside the media.                                                | `<section-step>Text here </section-step>`                            |
| `subType`      | Type of media display. (e.g., 'simple', 'container', 'full', 'sidecar', 'tour', 'slideshow') | `full`                                                               |
| `mediaTypes`   | Types of media included (e.g., 'iframe', 'img', 'video').                                    | `["img", "video"]`                                                   |
| `urls`         | Array of URLs for the media content.                                                         | `["https://example.com/image.jpg", "https://example.com/video.mp4"]` |
| `captions`     | Array of captions for each media item.                                                       | `["A beautiful image", "An engaging iframe"]`                        |
| `stepPosition` | Position for media section content (left, center or right).                                  | `right`                                                              |
| `height`       | Height of the media element.                                                                 | `300px`                                                              |

### Editor snippet command -

```markdown
---media
```

### Example

```markdown
[sectionType]: media
[subType]: simple

[mediaTypes]:["img"]
[urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg"]
[height]:400px

// Showing scroll content with - section-step
<section-step type="type of media - img/iframe" url="media-url" caption="any caption">
Text here
<section-step>
```
