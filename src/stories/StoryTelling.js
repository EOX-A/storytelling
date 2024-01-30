import { html } from "lit";
import "../main";

/**
 * Primary UI component for user interaction
 */
export const StoryTelling = ({
  markdown,
  url,
  editorMode,
  theme,
  type,
  autoplay,
}) => {
  return html`
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;700;800&family=Signika+Negative:wght@400;500;600;700;900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <story-telling
      .editorMode=${editorMode || false}
      .url=${url || null}
      .theme=${theme || {}}
      .type=${type}
      .markdown=${markdown}
      .autoplay=${autoplay || false}
    ></story-telling>
  `;
};
