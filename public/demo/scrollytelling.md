<!--
    [type]: scrollytelling
    [navigations]:[{"hero-section":"Hero","intro-section":"Introduction"}]
-->

---
<!--
    [id]: hero-section
    [sectionType]: hero
    [subType]: full
    [vPosition]: middle
    [hPosition]: center
    [video]: https://dlmultimedia.esa.int/download/public/videos/2023/06/010/2306_010_AR_EN.mp4
    [title]: Storytelling with EOxElements
    [description]: Functionality demonstration
    [subDescription]: by EOX
-->

---
<!--
    [id]: intro-section
    [sectionType]: basic
-->

## Storytelling for Earth Observation

Earth Observation (EO) helps us understand our planet, but it can be hard to grasp all the technical details. That's where storytelling comes in. It turns data into stories that everyone can relate to. This is important because stories make information easier to understand and care about.

When we tell stories about EO, we bring out the emotions and show why it matters. It's not just about sharing facts; it's about getting people to care about the environment and inspiring them to do something. Storytelling makes EO personal and helps us all feel connected to the planet we call home.

---
<!--
    [id]: format-section
    [sectionType]:basic
-->

## Input format: markdown

Every story you read here originates from a Markdown file. Why Markdown? It's a widely known and easily learned formatting language that simplifies the writing process.

Markdown allows us to structure our text without getting bogged down in complex code, making it accessible to a broad audience.

![](/demo/md-1.png)

The markdown file is structured into sections (think of them as the "story blocks"), and, optionally, into individual steps within those sections.

![](/demo/md-2.png)

But it's not just about convenience in writing—Markdown comes with an extra perk. When we host our Markdown files on GitHub, the platform automatically renders them. This means we get a neatly formatted, readable story without any additional effort.

So, from the simplicity of writing to the seamless rendering on platforms like GitHub, Markdown plays a crucial role in bringing these stories to our readers effortlessly.

![](/demo/md-3.png)

---
<!--
    [id]: editor-section
    [sectionType]:basic
-->
## In-browser editor with live preview

Welcome to our user-friendly in-browser Markdown editor! You have the power to toggle it on and off, giving you control over when and where you want to make edits to our Markdown files. The best part? As you tweak the text, the story preview updates in real-time, allowing you to see the changes instantly.

![](/demo/editor-1.png)

This editor is designed for convenience. It boasts syntax highlighting, making it easier to spot errors or emphasize important elements. Row numbers provide quick orientation, and you can resize or drag the editor to suit your preferences.

![](/demo/editor-2.png)
So, whether you're fine-tuning a narrative or adding a fresh perspective, this intuitive in-browser Markdown editor puts the creative reins in your hands, ensuring a seamless and interactive editing experience.

---
<!--
    [id]: modes-section
    [sectionType]:basic
-->
## Rendering modes: Simple, pages and scrollytelling
Dive into our storytelling software with three dynamic rendering modes—Simple, Paginated, and Scrollytelling.

### 1. Simple Mode:

Default Magic: This is where the GitHub magic happens. The story is rendered effortlessly in its default format, making it easy for you to read without any extra steps.
<video src="/demo/mode-1.webm" autoplay loop muted width="100%" height="300" />

### 2. Paginated Mode:

Page-Turning Experience: In this mode, each section becomes a page. Navigate through the story with user-friendly buttons, turning pages as you go. It's a structured journey, offering a seamless reading experience.
<video src="/demo/mode-2.webm" autoplay loop muted width="100%" height="300" />

### 3. Scrollytelling Mode:

Vertical Exploration: Brace yourself for a vertical adventure! Scrollytelling turns your screen into a storytelling canvas. Scroll your way through the narrative, unveiling each section as you journey down. It's an engaging and visually dynamic mode that brings a sense of flow to your reading experience.
<video src="/demo/mode-3.webm" autoplay loop muted width="100%" height="300" />

With these versatile rendering modes, your reading adventure can be as simple or interactive as you desire, offering a tailored experience for every storytelling preference.

---
<!--
    [id]: modes-section
    [sectionType]: basic
-->
## Storytelling building blocks

Our storytelling platform comes equipped with a variety of blocks, each serving a unique purpose to enhance your narrative. Let's explore a few:

## Text Block:

Versatile Narration: The foundation of storytelling, where you can weave your narrative seamlessly. Use it to convey information, set the tone, or share anecdotes.

<div style="border: 1px solid grey; padding: 200px; display: grid; place-content: center; border-radius: 5px;"><em>This is a text block</em></div>

---
<!--
    [sectionType]:basic
-->
## Container:

Structural Brilliance: Organize your content effortlessly. Containers group different elements, giving your story a clear and structured layout.

---
<!--
    [sectionType]:media
    [subType]:container
    [mediaTypes]:["img"]
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg"]
    [height]:100%
-->

---
<!--
    [sectionType]:media
    [subType]:sidecar
    [mediaTypes]:["img","iframe"]
    [stepPosition]:right
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg","https://ourworldindata.org/grapher/carbon-intensity-electricity"]
    [captions]:["Loremipsum","Loremipsum"]
-->
<section-step>
<h1>Sidecar</h1>
Multimedia Companion: Amplify your storytelling with a sidecar.
</section-step>
<section-step>
Display images, videos, or additional information alongside your text, creating a richer, more immersive narrative.
</section-step>

---
<!--
    [sectionType]:media
    [subType]:tour
    [mediaTypes]:["img","img","img"]
    [stepPosition]:right
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg","https://www.gstatic.com/prettyearth/assets/full/12516.jpg","https://www.gstatic.com/prettyearth/assets/full/5046.jpg"]
    [captions]:["Loremipsum","Loremipsum","Loremipsum"]
-->
<section-step>
<h1>Tour</h1>
Guided Exploration: Take your audience on a journey with a tour block.
</section-step>
<section-step>
Lead them through key points or significant locations, providing a curated experience.
</section-step>
<section-step>
Each step passes by, showing different content.
</section-step>

---
<!--
[sectionType]:basic

-->
## iFrame:

External Inclusion: Embed content seamlessly. The iFrame block lets you incorporate external elements like maps, interactive visualizations, or other web content directly into your story.

These storytelling blocks are the building blocks of your narrative, offering versatility and creativity to tailor your storytelling experience. Mix and match them to craft a compelling and engaging tale that captivates your audience.

More blocks can be added easily to expand the capabilities of the Storytelling software.

---
<!--[sectionType]:media
    [subType]:full
    [subType]:basic
    [mediaTypes]:["iframe"]
    [height]:800px
    [urls]:["https://ourworldindata.org/grapher/carbon-intensity-electricity"]
-->

---
<!--
    [sectionType]:map
    [subType]:tour
    [center]:[15,48]
    [layers]:[{"type": "Tile", "properties": {"id": "TERRAIN"}, "source": { "type": "XYZ", "url": "//s2maps-tiles.eu/wmts/1.0.0/terrain-light_3857/default/g/{z}/{y}/{x}.jpg"}}, { "type": "Tile", "properties": { "id": "TOPO_NASA" }, "source": { "type": "TileWMS", "url": "https://wms.openstreetmap.fr/wms", "params": { "LAYERS": "nasa_black_marble" } } } ]
    [zoom]:7
    [preventScroll]:true
    [stepPosition]:left
-->
<section-step style="max-height: unset" lat="48" lon="15" zoom="5" layersVisible="TERRAIN">
<h1>Map block</h1>

<p>Let's have a closer look at the different ways of how to include maps into storytelling:</p>

<p>Easily load a map block as a story section and configure layers, center, and zoom.</p>
</section-step>

<section-step lat="20" lon="50" zoom="5" layersVisible="TERRAIN">
Move the map between locations fron one step to the other, either without animation...
</section-step>

<section-step lat="-30" lon="130" zoom="5" duration="1000" layersVisible="TERRAIN">
...or with animation. The duration of the animation can be individually set, e.g. to be veeery slow...
</section-step>

<section-step lat="48" lon="15" zoom="5" duration="3000" layersVisible="TERRAIN">
...like so. But animating the view is not the only functionality. Also changing the visualized layers is as easy as changing the JSON configuration of the map. Showing one layer...
</section-step>

<section-step lat="48" lon="15" zoom="7" duration="1000" layersVisible="TOPO_NASA">
... and a different layer.
</section-step>

---
<!--
    [sectionType]:media
    [subType]:sidecar
    [mediaTypes]:["iframe","iframe"]
    [stepPosition]:left
    [urls]:["/demo/widget-python.html","https://vega.github.io/editor/#/examples/vega/connected-scatter-plot/view"]
-->
<section-step>
<h1>Embeddable external Blocks</h1>
<p>Should the story content need to include more specialized elements such as custom charts etc., the iframe block allows to easily embed any possible visualization:</p>

<p>This example is an interactive chart built with Python inside a Jupyter Notebook and rendered via <a href="https://quarto.org/">Quarto</a>.</p>
</section-step>

<section-step>
<p>This example shows a chart built using the <a href="https://vega.github.io/">Vega grammar</a>.</p>
</section-step>

---
<!--
[sectionType]:basic

-->
## Branding

The story rendering can be adapted to fit the look & feel of the application using it. Modifying various variables such as header text, body text and more allows to seamlessly integrate storytelling into the application.

```
  "background-color": "white",
  "font-color": "#2c3d49",
  "primary-color": "#0c88db",
  "primary-hover-color": "#08769b",
  "secondary-color": "#596b78",
  "secondary-hover-color": "#415462",
  "header-font-family": "'Signika Negative', sans-serif",
  "body-font-family": "'Mukta', sans-serif",
```

![](/demo/branding-1.png)

---
<!--
[sectionType]:basic

-->
## Mobile view

On mobile, sidecar and tour blocks become stacked on top of each other:

![](/demo/mobile-1.png)
![](/demo/mobile-2.png)
---
<!--
[sectionType]:basic

-->
## Deployment

Stories don't need to be deployed, as they are just a markdown file (with some additional statically linked files). The story rendering engine is deployed once and customized for a specific brand, and then any compatible story markdown file can be rendered with it.
