import { html, LitElement } from "lit";
/**
 * Markdown -
 *
 * [section-type]:hero
 * [sub-type]:full|cropped?
 * [v-position]:top|middle|bottom
 * [h-position]:left|center|right
 * [img]:https://www.gstatic.com/prettyearth/assets/full/1804.jpg
 * [img-alt]:https://www.gstatic.com/prettyearth/assets/full/1804.jpg
 *
 */

export class StoryTellingBasic extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="wrap-main basic">
        <h2>Black Americans are disproportionately burdened.</h2>
        <p>PM 2.5 refers to particulate matter with a diameter of <strong>2.5 micrometers and smaller. Because they are so small</strong>, PM 2.5 particles can get through the lungs’ defense systems, making PM 2.5 one of the most dangerous air pollutants for human health. Exposure to PM 2.5 can cause a host of health problems, including asthma, heart disease, decreased lung function, heart attacks, and premature death.[6] Lifetime exposure also leaves people, especially children, more vulnerable to respiratory illnesses, including COVID-19.[7,8] Communities of color are being poisoned by this pollution, leaving them with chronic illnesses and leading to premature death.</p>
        <p>The current <strong>EPA threshold is 12 micrograms per cubic meter</strong>, 20% higher than the World Health Organization’s recommended limit of <strong>10 micrograms per cubic meter</strong>. Researchers have found that PM 2.5 is harmful at any concentration, and that lowering thresholds even below 10  micrograms per cubic meter could save thousands of lives.[9,10]</p>
        <p>PM 2.5 is just one of the environmental stresses that is compounding environmental racism. We have a lack of data on other air pollutants, as well as sewage issues, and others. Some communities are very physically experiencing the effects of these environmental stresses.</p>
      </div>
    `;
  }

  #styling = `
    .basic {
        width: 41rem;
        margin: 0rem auto;
    }
  `;
}
customElements.define("story-telling-basic", StoryTellingBasic);
