---
title: Map steps
author: EOX
format: scrollytelling
---

<eox-map id="tour" .config=${{
  view:{
    center:[0,0],
    zoom:7
  },
  layers:[
    {
      type:"Tile",
      properties: {
        id: "foo"
      },
      source:{
        type:"OSM"
      }
    },
    {
      type:"Tile",
      properties: {
        id: "bar"
      },
      source:{
        type:"OSM"
      }
    }
  ]
}}></eox-map>
## Climate Related Disaster {.sidecar .left map="#tour"}
### Section Step 1 {.step zoom='1' lat='20.333' lon='30.232' duration='4000' layers='["foo"]'}
Step 1 content

### Section Step 2 {.step zoom='1' lat='20.333' lon='30.232' duration='4000' layers='["foo", "bar"]'}
Step 2 content

### Section Step 3 {.step zoom='1' lat='20.333' lon='30.232' duration='4000' stac='https://[...]/collection.json'}
Step 3 content