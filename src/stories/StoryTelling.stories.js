import { StoryTelling } from "./StoryTelling";
import scrollytellingPreviewMarkdown from "../markdown/scrollytelling-preview.md?raw";
import paginationPreviewMarkdown from "../markdown/pagination-preview.md?raw";
import withoutNavPreviewMarkdown from "../markdown/without-nav-preview.md?raw";

export default {
  title: "Module",
  render: (args) => StoryTelling(args),
};

export const DemoStory = {
  args: {
    editorMode: false,
    url: `./demo/scrollytelling.md`,
  },
  render: (args) => StoryTelling(args),
};

export const ScrollyTellingPreview = {
  args: {
    editorMode: false,
    markdown: scrollytellingPreviewMarkdown,
    autoplay: true,
  },
  render: (args) => StoryTelling(args),
};

export const PaginationPreview = {
  args: {
    editorMode: false,
    type: "pagination",
    markdown: paginationPreviewMarkdown,
  },
  render: (args) => StoryTelling(args),
};

export const WithoutNavPreview = {
  args: {
    editorMode: false,
    markdown: withoutNavPreviewMarkdown,
    autoplay: true,
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
