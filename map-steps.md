---
title: Map steps, alternative
author: EOX
format: scrollytelling
---
## Climate Related Disaster <!--{.sidecar .left for="eox-map#tour"}-->
<!--
<eox-map
  id="tour"
  .config=${
    {
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
    }
  }
></eox-map>
-->
![placeholder for="eox-map#tour"](https://placehold.co/600x400)
### Section Step 1 <!--{.step zoom='1' lat='20.333' lon='30.232' duration='4000' layers='["foo"]'}-->
Step 1 content

### Section Step 2 <!--{.step zoom='1' lat='20.333' lon='30.232' duration='4000' layers='["foo", "bar"]'}-->
Step 2 content

### Section Step 3 <!--{.step zoom='1' lat='20.333' lon='30.232' duration='4000' stac='https://[...]/collection.json'}-->
Step 3 content