import { StoryTelling } from "./StoryTelling";
import mapBgMarkdown from "../markdown/map-bg.md?raw"
import simpleMarkdown from "../markdown/simple.md?raw"

export default {
  title: "Module",
  render: (args) => StoryTelling(args),
};

export const Simple = {
  args: {
    markdown: simpleMarkdown,
  },
  render: (args) => StoryTelling(args),
};

export const MapBackground = {
  args: {
    markdown: mapBgMarkdown,
  },
  render: (args) => StoryTelling(args),
};

export const BlankPreview = {
  args: {
    markdown: "",
  },
  render: (args) => StoryTelling(args),
};

export const MarkdownAsURL = {
  args: {
    markdown: "",
    url: `${window.location.origin}/simple.md`
  },
  render: (args) => StoryTelling(args),
};
