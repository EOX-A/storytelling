import { StoryTelling } from "./StoryTelling";
import simplePreviewMarkdown from "../markdown/simple-preview.md?raw"
import paginationPreviewMarkdown from "../markdown/pagination-preview.md?raw"

export default {
  title: "Module",
  render: (args) => StoryTelling(args),
};

export const SimplePreview = {
  args: {
    editorMode: false,
    markdown: simplePreviewMarkdown
  },
  render: (args) => StoryTelling(args),
};

export const PaginationPreview = {
  args: {
    editorMode: false,
    markdown: paginationPreviewMarkdown
  },
  render: (args) => StoryTelling(args),
};

export const Editor = {
  args: {
    editorMode: true,
    markdown: simplePreviewMarkdown,
  },
  render: (args) => StoryTelling(args),
};

export const BlankPreview = {
  args: {
    editorMode: true,
    markdown: "",
  },
  render: (args) => StoryTelling(args),
};

export const MarkdownAsURL = {
  args: {
    editorMode: true,
    url: "https://raw.githubusercontent.com/EOX-A/storytelling/536f06b6567c1f83ad03f5c8bcff21da727a3f58/public/simple-preview.md"
  },
  render: (args) => StoryTelling(args),
};
