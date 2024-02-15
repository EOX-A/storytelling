---
title: Demo story
author: EOX
format: scrollytelling
navigation: true
---

# Section 1
Some content here using basic markdown.

# Section 2 {#identifier .class .class key=value key=value}
Some code examples:
```js
const foo = "bar"
```

```js {.dark}
const bla = "blub"
```

# Videos
Simple video embed:
{{< video https://www.youtube.com/embed/wo9vZccmqwc >}}

Advanced video embed:
{{< video https://www.youtube.com/embed/wo9vZccmqwc
    title="What is the CERN?"
    start="116"
    aspect-ratio="21x9" 
>}}

# DIVs
A simple HTML div with a class:

::: {.simple-div}
Some **md** div content.
:::

Nested DIVs:

::::: {#id .parent-div}
::: {.child-div}
Some **md** div content.
:::
:::::

# Page Layout
See https://quarto.org/docs/authoring/article-layout.html

# Embedding an eox-element
<eox-map id="one"><img alt="placeholder image" src="https://placehold.co/600x400" /></eox-map>

```{js}
document.querySelector("eox-map#one").config = {
  view:{
    center:[0,0],
    zoom:7
  },
  layers:[
    {
      type:"Tile",
      source:{
        type:"OSM"
      }
    }
  ]
}

```

