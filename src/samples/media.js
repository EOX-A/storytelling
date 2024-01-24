const sectionType = `[sectionType]:media`

const mediaContent = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
`


const MEDIA_SIMPLE = `<!--
    ${sectionType}
    [subType]:scrollytelling
    [mediaTypes]:["img"]
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg"]
    [height]:400px
-->
`

const MEDIA_CONTAINER = `<!--
    ${sectionType}
    [subType]:container
    [mediaTypes]:["img"]
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg"]
    [height]:100%
-->
`

const MEDIA_FULL = `<!--
    ${sectionType}
    [subType]:full
    [mediaTypes]:["img"]
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg"]
-->
`


const MEDIA_IFRAME = `<!--${sectionType}
    [subType]:full
    [subType]:scrollytelling
    [mediaTypes]:["iframe"]
    [height]:800px
    [urls]:["https://spacetime.blueskyhq.io/ghg-emissions-fires?admin-levels=2&baseMap=light&data=fires&dataSetSubtype=point&dataSetType=vector&duration=6m&palette=default&pin=-&places=World&scale=quantile&shape-ids=dd0cd186-f7f7-4ced-b1ea-9da6100148fb&temporal=2023-05-15T00_00_00.000Z&timeBucket=1d&visualChoice=heatmap&embed=1&disable=zoom_search_timelapse_time-bucket&freezoBound=0&embedBound=-145.483897,-60.256167,154.878057,81.23915"]
-->
`

const MEDIA_HERO = `<!--
    [sectionType]:hero
    [subType]: full
    [vPosition]: middle
    [hPosition]: center
    [img]: https://www.gstatic.com/prettyearth/assets/full/14617.jpg
    [imgAlt]: Satellite Img
    [title]:Global Air Quality
    [description]:Exploring 19 years of particulate matter in the air we breathe
    [subDescription]: 
-->
`

const MEDIA_SIDECAR = `<!--
    ${sectionType}
    [subType]:sidecar
    [mediaTypes]:["img","iframe"]
    [sidecarPosition]:right
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg","https://spacetime.blueskyhq.io/ghg-emissions-fires?admin-levels=2&baseMap=light&data=fires&dataSetSubtype=point&dataSetType=vector&duration=6m&palette=default&pin=-&places=World&scale=quantile&shape-ids=dd0cd186-f7f7-4ced-b1ea-9da6100148fb&temporal=2023-05-15T00_00_00.000Z&timeBucket=1d&visualChoice=heatmap&embed=1&disable=zoom_search_timelapse_time-bucket&freezoBound=0&embedBound=-145.483897,-60.256167,154.878057,81.23915"]
    [captions]:["Loremipsum","Loremipsum","Loremipsum"]
-->

<section-step>
    <h3>India</h3>
    ${mediaContent}
</section-step>

<section-step>
    <h3>World</h3>
    ${mediaContent}
</section-step>
`

const MEDIA_TOUR = `<!--
    ${sectionType}
    [subType]:tour
    [mediaTypes]:["img","img","img"]
    [sidecarPosition]:right
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg","https://www.gstatic.com/prettyearth/assets/full/12516.jpg","https://www.gstatic.com/prettyearth/assets/full/5046.jpg"]
    [captions]:["Loremipsum","Loremipsum","Loremipsum"]
-->

<section-step>
    <h3>India</h3>
    ${mediaContent}
</section-step>

<section-step>
    <h3>World</h3>
    ${mediaContent}
</section-step>
`

export { MEDIA_CONTAINER, MEDIA_FULL, MEDIA_HERO, MEDIA_IFRAME, MEDIA_SIDECAR, MEDIA_SIMPLE, MEDIA_TOUR }