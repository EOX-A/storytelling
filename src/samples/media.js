const sectionType = `[sectionType]:media`;

const mediaContent = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
`;

const MEDIA_SIMPLE = `<!--
    ${sectionType}
    [subType]:basic
    [mediaTypes]:["img"]
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg"]
    [height]:400px
-->
`;

const MEDIA_CONTAINER = `<!--
    ${sectionType}
    [subType]:container
    [mediaTypes]:["img"]
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg"]
    [height]:100%
-->
`;

const MEDIA_FULL = `<!--
    ${sectionType}
    [subType]:full
    [mediaTypes]:["img"]
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg"]
-->
`;

const MEDIA_IFRAME = `<!--${sectionType}
    [subType]:full
    [subType]:basic
    [mediaTypes]:["iframe"]
    [height]:800px
    [urls]:["https://ourworldindata.org/grapher/carbon-intensity-electricity"]
-->
`;

const MEDIA_HERO_IMAGE = `<!--
    [sectionType]:hero
    [subType]: full
    [vPosition]: middle
    [hPosition]: center
    [img]: https://www.gstatic.com/prettyearth/assets/full/14617.jpg
    [imgAlt]: Satellite Img
    [title]:Global Air Quality
    [description]:Exploring 19 years of particulate matter in the air we breathe
-->
`;

const MEDIA_HERO_VIDEO = `<!--
    [sectionType]:hero
    [subType]: full
    [vPosition]: middle
    [hPosition]: center
    [video]: https://i.imgur.com/i9nkrTM.mp4
    [imgAlt]: Some Text 
    [title]:Global Air Quality
    [description]:Exploring 19 years of particulate matter in the air we breathe
-->
`;

const MEDIA_SIDECAR = `<!--
    ${sectionType}
    [subType]:sidecar
    [mediaTypes]:["img","iframe"]
    [stepPosition]:right
    [urls]:["https://www.gstatic.com/prettyearth/assets/full/14617.jpg","https://ourworldindata.org/grapher/carbon-intensity-electricity"]
    [captions]:["Loremipsum","Loremipsum"]
-->

<section-step>
    <h3>India</h3>
    ${mediaContent}
</section-step>

<section-step>
    <h3>World</h3>
    ${mediaContent}
</section-step>
`;

const MEDIA_TOUR = `<!--
    ${sectionType}
    [subType]:tour
    [mediaTypes]:["img","img","img"]
    [stepPosition]:right
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
`;

export {
  MEDIA_CONTAINER,
  MEDIA_FULL,
  MEDIA_HERO_IMAGE,
  MEDIA_HERO_VIDEO,
  MEDIA_IFRAME,
  MEDIA_SIDECAR,
  MEDIA_SIMPLE,
  MEDIA_TOUR,
};
