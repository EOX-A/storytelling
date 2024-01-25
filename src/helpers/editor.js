import * as monaco from "monaco-editor/esm/vs/editor/editor.main";
import { buildWorkerDefinition } from "monaco-editor-workers";
import { CUSTOM_ELEMENTS } from "./custom-elements";

buildWorkerDefinition(
  "../../node_modules/monaco-editor-workers/dist/workers",
  import.meta.url,
  false,
);

function getMarkDownSuggestions() {
  let suggestions = [];

  // Iterate over each key in the CUSTOM_ELEMENTS object.
  Object.keys(CUSTOM_ELEMENTS).forEach((eleKey) => {
    if (!eleKey.includes("story-telling-")) return;

    const element = CUSTOM_ELEMENTS[eleKey];
    let section = `\n<!--\n`;

    element.class.elementProperties.forEach((property, key) => {
      const example = property.example;
      if (example) {
        section += `    [${key}]:${example}\n`;
      }
    });

    // Close the markdown comment section.
    section += `-->\n\n`;

    // Add a suggestion object to the suggestions array.
    suggestions.push({
      label: eleKey.replace("story-telling-", "---"),
      kind: 27,
      insertText: section,
    });
  });

  // Return the array of suggestions.
  return suggestions;
}

// Function to disable text selection
function disableTextSelection() {
  document.body.style.userSelect = "none";
}

// Function to enable text selection
function enableTextSelection() {
  document.body.style.userSelect = "";
}

// Function to handle mouse down on the editor container
function handleEditorContainerMouseDown(
  e,
  editorContainer,
  StoryTellingEditor,
) {
  if (e.target === editorContainer) {
    disableTextSelection();
    StoryTellingEditor.dragging = true;
    StoryTellingEditor.lastX = e.clientX;
    StoryTellingEditor.lastY = e.clientY;
  }
}

// Function to handle mouse move for dragging and resizing
function handleMouseMove(e, editorContainer, StoryTellingEditor) {
  if (StoryTellingEditor.dragging) {
    let dx = e.clientX - StoryTellingEditor.lastX;
    let dy = e.clientY - StoryTellingEditor.lastY;
    let { top, left } = editorContainer.getBoundingClientRect();

    editorContainer.style.top = `${top + dy}px`;
    editorContainer.style.left = `${left + dx}px`;

    StoryTellingEditor.lastX = e.clientX;
    StoryTellingEditor.lastY = e.clientY;
  }

  if (StoryTellingEditor.dragging || StoryTellingEditor.resizing) {
    let dx = StoryTellingEditor.lastX - e.clientX;
    let dy = e.clientY - StoryTellingEditor.lastY;
    let { width, height, left } = editorContainer.getBoundingClientRect();

    editorContainer.style.width = `${width + dx}px`;
    editorContainer.style.height = `${height + dy}px`;
    editorContainer.style.left = `${left - dx}px`;

    StoryTellingEditor.lastX = e.clientX;
    StoryTellingEditor.lastY = e.clientY;
  }
}

// Function to handle mouse up and enable text selection
function handleMouseUp(StoryTellingEditor) {
  enableTextSelection();
  StoryTellingEditor.dragging = false;
  StoryTellingEditor.resizing = false;
}

// Function to handle resize handle mouse down
function handleResizeHandleMouseDown(e, StoryTellingEditor) {
  e.stopPropagation();
  disableTextSelection();
  StoryTellingEditor.resizing = true;
  StoryTellingEditor.lastX = e.clientX;
  StoryTellingEditor.lastY = e.clientY;
}

// Function to create Monaco editor
function createMonacoEditor(StoryTellingEditor) {
  monaco.languages.registerCompletionItemProvider("markdown", {
    provideCompletionItems: function () {
      return { suggestions: getMarkDownSuggestions() };
    },
  });

  return monaco.editor.create(document.getElementById("editor"), {
    language: "markdown",
    theme: "vs",
    automaticLayout: true,
    lineNumbersMinChars: 4,
    mouseWheelZoom: true,
    fontSize: null,
    minimap: { enabled: false },
    wordWrap: false,
    wrappingIndent: null,
    value: StoryTellingEditor.markdown,
    fontSize: "16px",
  });
}

export default function initEditor(
  editorContainer,
  resizeHandle,
  StoryTellingEditor,
) {
  editorContainer.addEventListener("mousedown", (e) =>
    handleEditorContainerMouseDown(e, editorContainer, StoryTellingEditor),
  );

  window.addEventListener("mousemove", (e) =>
    handleMouseMove(e, editorContainer, StoryTellingEditor),
  );

  window.addEventListener("mouseup", () => handleMouseUp(StoryTellingEditor));

  resizeHandle.addEventListener("mousedown", (e) =>
    handleResizeHandleMouseDown(e, StoryTellingEditor),
  );

  return createMonacoEditor(StoryTellingEditor);
}
