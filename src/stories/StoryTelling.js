import { html } from "lit";
import "../main";

/**
 * Primary UI component for user interaction
 */
export const StoryTelling = ({ markdown, url }) => {
  return html`
    <story-telling .url=${url || null} .markdown=${markdown}></story-telling>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
      * {
        font-family: "Roboto", sans-serif;
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
