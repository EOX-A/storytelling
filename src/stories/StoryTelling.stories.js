import { StoryTelling } from "./StoryTelling";
import mapBgMarkdown from "../markdown/map-bg.md?raw"
import simpleMarkdown from "../markdown/simple.md?raw"
import "../sample-component"
import { html } from "lit";
import picoCSS from "../picocss";

export default {
  title: "Module",
  render: (args) => StoryTelling(args),
};

export const Simple = {
  args: {
    editor: true,
    markdown: simpleMarkdown,
  },
  render: (args) => StoryTelling(args),
};

export const MapBackground = {
  args: {
    editor: true,
    markdown: mapBgMarkdown,
  },
  render: (args) => StoryTelling(args),
};

export const BlankPreview = {
  args: {
    editor: true,
    markdown: "",
  },
  render: (args) => StoryTelling(args),
};

export const MarkdownAsURL = {
  args: {
    editor: true,
    url: `https://raw.githubusercontent.com/EOX-A/storytelling/cf7d5123ae8b056f254b1ef07ebceb95fd356dc8/public/simple.md`
  },
  render: (args) => StoryTelling(args),
};

export const Preview = {
  args: {
    editor: false,
    markdown: simpleMarkdown
  },
  render: (args) => StoryTelling(args),
};


export const ComponentPreview = {
  args: {
    editor: false,
    markdown: simpleMarkdown
  },
  render: (args) => html`
      <sample-component></sample-component>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;700&family=Signika+Negative:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        ${picoCSS}* {
          font-family: "Mukta", sans-serif;
        }
        h1, h2, h3 {
          font-family: "Signika Negative", sans-serif;
          line-height: 120%;
          margin-top: 0.8rem;
          margin-bottom: 0.8rem;
        }
        p {
          font-weight: 400;
          line-height: 170%;
          margin-top: 0.8rem;
          margin-bottom: 1.6rem;
        }
        body {
          padding: 0;
          margin: 0;
        }
        .sb-show-main.sb-main-padded {
          padding: 0;
        }
      </style>
  `,
};
