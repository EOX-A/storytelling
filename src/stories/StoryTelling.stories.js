import { StoryTelling } from "./StoryTelling";
import mapBgMarkdown from "../markdown/map-bg.md?raw"
import simpleMarkdown from "../markdown/simple.md?raw"

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
