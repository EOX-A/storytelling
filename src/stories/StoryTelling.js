import { html } from "lit";
import "../main";
import picoCSS from "../picocss";

/**
 * Primary UI component for user interaction
 */
export const StoryTelling = ({ markdown, url, editorMode }) => {
  return html`
    <story-telling
      .editorMode=${editorMode || false}
      .url=${url || null}
      .markdown=${markdown}
    ></story-telling>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;700&family=Signika+Negative:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      ${picoCSS}* {
        font-family: "Mukta", sans-serif;
      }
      h1,
      h2,
      h3 {
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
  `;
};
