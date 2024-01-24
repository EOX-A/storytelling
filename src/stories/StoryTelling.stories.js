import { StoryTelling } from "./StoryTelling";
import scrollytellingPreviewMarkdown from "../markdown/scrollytelling-preview.md?raw";
import paginationPreviewMarkdown from "../markdown/pagination-preview.md?raw";

export default {
  title: "Module",
  render: (args) => StoryTelling(args),
};

export const ScrollyTellingPreview = {
  args: {
    editorMode: false,
    markdown: scrollytellingPreviewMarkdown,
  },
  render: (args) => StoryTelling(args),
};

export const PaginationPreview = {
  args: {
    editorMode: false,
    markdown: paginationPreviewMarkdown,
  },
  render: (args) => StoryTelling(args),
};

export const Editor = {
  args: {
    editorMode: true,
    markdown: scrollytellingPreviewMarkdown,
  },
  render: (args) => StoryTelling(args),
};

export const BlankPreview = {
  args: {
    editorMode: true,
    markdown: `[type]: scrollytelling`,
  },
  render: (args) => StoryTelling(args),
};

export const MarkdownAsURL = {
  args: {
    editorMode: true,
    url: `${window.location.origin}/scrollytelling-preview.md`,
  },
  render: (args) => StoryTelling(args),
};
