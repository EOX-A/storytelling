import { StoryTelling } from "./StoryTelling";
import simplePreviewMarkdown from "../markdown/simple-preview.md?raw"
import paginationPreviewMarkdown from "../markdown/pagination-preview.md?raw"

export default {
  title: "Module",
  render: (args) => StoryTelling(args),
};

export const SimplePreview = {
  args: {
    editor: false,
    markdown: simplePreviewMarkdown
  },
  render: (args) => StoryTelling(args),
};

export const PaginationPreview = {
  args: {
    editor: false,
    markdown: paginationPreviewMarkdown
  },
  render: (args) => StoryTelling(args),
};

export const Editor = {
  args: {
    editor: true,
    markdown: simplePreviewMarkdown,
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
    url: `https://raw.githubusercontent.com/EOX-A/storytelling/cf7d5123ae8b056f254b1ef07ebceb95fd356dc8/public/simple-preview.md`
  },
  render: (args) => StoryTelling(args),
};
