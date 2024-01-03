import { MAP_BG_MARKDOWN, SIMPLE_MARKDOWN } from "../enums";
import { StoryTelling } from "./StoryTelling";

export default {
  title: "Module",
  render: (args) => StoryTelling(args),
};

export const Simple = {
  args: {
    markdown: SIMPLE_MARKDOWN,
  },
  render: (args) => StoryTelling(args),
};

export const MapBackground = {
  args: {
    markdown: MAP_BG_MARKDOWN,
  },
  render: (args) => StoryTelling(args),
};

export const BlankPreview = {
  args: {
    markdown: "",
  },
  render: (args) => StoryTelling(args),
};
