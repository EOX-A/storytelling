/**
 * Highlights the navigation based on the scrolling position.
 */
function highlightNavigation() {
  const sections = document.querySelectorAll(".wrap-main");
  let scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 300;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(`.navigation li.nav-${sectionId}`)
        ?.classList.add("active");
    } else {
      document
        .querySelector(`.navigation li.nav-${sectionId}`)
        ?.classList.remove("active");
    }
  });
}

/**
 * Loads Markdown content from a given URL.
 */
async function loadMarkdown(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

/**
 * Splits Markdown content into an array of sections.
 */
function getSectionsAsMarkdownArray(markdown) {
  return markdown.split(/(?:^|\n)---\n/);
}

// Export functions
export { loadMarkdown, highlightNavigation, getSectionsAsMarkdownArray };
