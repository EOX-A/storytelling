const initTheme = {
  "background-color": "white",
  "font-color": "#2c3d49",
  "font-hover-color": "#1b2832",
  "primary-color": "#0c88db",
  "primary-hover-color": "#08769b",
  "secondary-color": "#596b78",
  "secondary-hover-color": "#415462",
};

function hexToRGBA(hex, alpha = 1) {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let r = 0,
      g = 0,
      b = 0;

    if (hex.length === 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    } else return hex;

    return `rgba(${+r}, ${+g}, ${+b}, ${alpha})`;
  } else return hex;
}

export default function getBrandStyling(newTheme = {}) {
  const theme = {
    ...initTheme,
    ...newTheme,
  };

  const bgColor = theme["background-color"];
  const fontColor = theme["font-color"];
  const fontHoverColor = theme["font-hover-color"];
  const primaryColor = theme["primary-color"];
  const primaryHoverColor = theme["primary-hover-color"];
  const primaryHoverBgColor = hexToRGBA(theme["primary-hover-color"], 0.1);
  const secondaryColor = theme["secondary-color"];
  const secondaryHoverColor = theme["secondary-hover-color"];

  return `
    @import url("https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.classless.min.css");
    * {
      font-family: "Mukta", sans-serif;
    }
    :root, 
    [data-theme=dark], 
    [data-theme=light],
    :root:not([data-theme=dark]),
    :root:not([data-theme=light]) {
      --spacing: 1rem;
      --block-spacing-vertical: calc(var(--spacing) * 2);
      --block-spacing-horizontal: var(--spacing);
      --background-color: ${bgColor};

      --color: ${fontColor};
      --h1-color: ${fontColor};
      --h2-color: ${fontColor};
      --h3-color: ${fontColor};
      --h4-color: ${fontColor};
      --h5-color: ${fontColor};
      --h6-color: ${fontColor};
      --primary: ${primaryColor};
      --primary-hover: ${primaryHoverColor};
      --primary-background-hover: ${primaryHoverBgColor};
      --secondary: ${secondaryColor};
      --secondary-hover: ${secondaryHoverColor};
    }
    @media (min-width: 576px) {
      .container{
          max-width: 510px;
          padding-right: 0;
          padding-left: 0;
          --block-spacing-vertical: calc(var(--spacing) * 2.5);
      }
    }
    @media (min-width: 768px) {
      .container {
          max-width: 700px;
          --block-spacing-vertical: calc(var(--spacing) * 3);
      }
    }
    @media (min-width: 992px) {
      .container {
          max-width: 920px;
          --block-spacing-vertical: calc(var(--spacing) * 3.5);
      }
    }
    @media (min-width: 1200px) {
      .container{
          max-width: 1130px;
          --block-spacing-vertical: calc(var(--spacing) * 4);
      }
    }
    .container{
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      display: block;
      padding: var(--block-spacing-vertical) var(--block-spacing-horizontal);
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
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      --font-weight: 700;
    }
    h1 {
      --font-size: 3rem;
      --typography-spacing-vertical: 0.5rem;
    }
    h2 {
      --font-size: 2rem;
      --typography-spacing-vertical: 0.5rem;
    }
    h3 {
      --font-size: 1.75rem;
      --typography-spacing-vertical: 0.5rem;
    }
    h4 {
      --font-size: 1.5rem;
      --typography-spacing-vertical: 0.5rem;
    }
    h5 {
      --font-size: 1.25rem;
      --typography-spacing-vertical: 0.5rem;
    }
    [role=link]:hover, a:hover {
      background-color: var(--primary-background-hover);
    }
  `;
}
