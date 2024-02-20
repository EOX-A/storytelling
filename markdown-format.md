---
author: EOX
tags:
- earth
- observation
format: scrollytelling
---

# General concepts
- sections are defined by h1 headings (`#`)
- section steps are defined by h3 headings (`###`) in order to avoid underline
- attributes are defined by HTML comments: `<!--{...}-->`
  - supports `#id`, `.class` and generic `attr="val"`
  - if the attribute `as` is present, the entire element is replaced by that module, e.g. `# title <!--{as="eox-map"}-->` is entirely replaced by an `eox-map`
- the navigation is built automatically from all section headings, unless
  - it is disabled globally in the frontmatter (`nav: false`)
  - it is disabled for a specific section with the `<!--{no-nav}-->` attribute

---
# Hero Title <!--{.hero .full style="background-image: url(https://placehold.co/1000x800)"}-->
## Hero subtitle
Hero description

# Container section <!--{.container}-->
Description

# Sidecar section <!--{as="sidecar" .right}-->
### ![section-step 01](https://placehold.co/800x400)
Sidecar step one
### ![section-step 02](https://placehold.co/800x400)
Sidecar step two

# This is a map <!--{as="eox-map" .tour .left center=[0,0] zoom="7" stac="https://stac-catalog.org/01/item.json"}-->
### ![section-step 01 placeholder](https://placehold.co/800x400) <!--{center=[48,15] zoom="10"}-->
Description of step one
### ![section-step 02 placeholder](https://placehold.co/800x400) <!--{stac="https://stac-catalog.org/01/item.json"}-->
Description of step two
