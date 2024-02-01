import { html, LitElement } from "lit";
import { when } from "lit/directives/when.js";

// Predefined speed settings
const SPEED = [
  { value: "0.1", title: "0.5x" },
  { value: "0.5", title: "1x" },
  { value: "1", title: "2x" },
];

export class StorytellingAutoPlay extends LitElement {
  // Define static properties for LitElement
  static properties = {
    sectionMetaData: { attribute: false, type: Array },
  };

  #speedIndex = 1; // Index of the current speed setting

  constructor() {
    super();
    this.sectionMetaData = [];
    this.isPaused = true;
    this.isStopped = true;
  }

  // Smooth scrolling function with wheel event simulation
  smoothScrollWithWheelEvent(endY, speed) {
    const startY = window.scrollY || window.pageYOffset;
    const distanceY = endY - startY;
    const duration = Math.abs(distanceY) / speed;
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (this.isStopped) return;
      if (startTime === null) startTime = currentTime;

      const timeElapsed = currentTime - startTime;
      const nextY = startY + distanceY * Math.min(timeElapsed / duration, 1);

      if (!this.isPaused) {
        this.simulateWheelEvents();
        window.scrollTo(0, nextY);

        if (
          timeElapsed < duration &&
          window.scrollY + window.innerHeight < document.body.offsetHeight
        ) {
          requestAnimationFrame(animateScroll);
        } else {
          this.stop();
        }
      }
    };

    requestAnimationFrame(animateScroll);
  }

  // Simulates wheel events for sections with specific subtypes
  simulateWheelEvents() {
    this.sectionMetaData.forEach((meta) => {
      if (["sidecar", "tour"].includes(meta.subType)) {
        const wheelEvent = new WheelEvent("wheel", {
          deltaY: SPEED[this.#speedIndex].value,
          deltaMode: 0,
          bubbles: true,
          cancelable: true,
        });

        const contentParent = document.querySelector(
          `#${meta.id} .${meta.sectionType}-type-${meta.subType}`,
        );
        contentParent?.dispatchEvent(wheelEvent);
      }
    });
  }

  // Play control functions
  pause() {
    if (!this.isPaused) {
      this.isPaused = true;
      this.requestUpdate();
    }
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.play();
    }
  }

  stop() {
    if (!this.isStopped) {
      this.isStopped = true;
      this.isPaused = true;
      this.#speedIndex = 1;
      window.scrollTo({ top: 0 });

      this.requestUpdate();
    }
  }

  play() {
    if (this.isStopped || this.isPaused) {
      if (this.isStopped) window.scrollTo({ top: 0 });
      this.isStopped = false;
      this.isPaused = false;
      this.smoothScrollWithWheelEvent(
        document.body.scrollHeight,
        SPEED[this.#speedIndex].value,
      );
      this.requestUpdate();
    } else {
      this.pause();
    }
  }

  // Handles speed selection
  handleSpeed(index) {
    if (this.#speedIndex !== index) {
      this.#speedIndex = index;
      if (this.isPaused) this.requestUpdate();
      else {
        this.pause();
        this.play();
      }
    }
  }

  // Override createRenderRoot to use LitElement as the render root
  createRenderRoot() {
    return this;
  }

  // Render function to define the UI of the component
  render() {
    const currBtn = this.isPaused ? "play-button" : "pause-button";
    const stopBtnState = this.isStopped ? "disabled" : "enabled";

    return html`
      <style>
        ${this.#styling}
      </style>
      <div class="autoplay">
        <ul>
          <li @click="${this.play}" class="${currBtn}"></li>
          <div class="speed">
            ${SPEED.map((speed, index) =>
              this.#renderSpeedButton(speed, index),
            )}
          </div>
          <li @click="${this.stop}" class="stop-button ${stopBtnState}"></li>
        </ul>
      </div>
      ${when(!this.isPaused, () => html`<div class="autoplay-overlay"></div>`)}
    `;
  }

  // Helper method to render each speed button
  #renderSpeedButton(speed, index) {
    const curr = this.#speedIndex === index ? "curr" : "";
    return html`<span @click="${() => this.handleSpeed(index)}" class="${curr}"
      >${speed.title}</span
    >`;
  }

  // Private styling CSS
  #styling = `
    .autoplay {
      position: fixed;
      bottom: 20px;
      width: 100%;
      z-index: 9999;
    }
    .autoplay ul {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0;
    }
    .autoplay ul li {
      list-style: none;
      border-radius: 100%;
      background: white;
      margin: 0px 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      cursor: pointer;
    }
    .autoplay ul li, 
    div.speed {
      box-shadow: 1px 2px 10px 1px #7e7e7e59;
    }
    .autoplay ul li:hover {
      background: #f2f2f2;
      box-shadow: 1px 2px 3px 1px #7e7e7e42;
    }
    .autoplay ul li.disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .autoplay ul li.disabled:hover {
      background: white;
      box-shadow: 1px 2px 10px 1px #7e7e7e1f;
    }
    .autoplay ul li::before {
      width: 1.25rem;
      height: 1.25rem;
      color: black;
      display: inline-block;
    }
    .autoplay ul li.play-button::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctitle%3Eplay%3C/title%3E%3Cpath d='M8,5.14V19.14L19,12.14L8,5.14Z' /%3E%3C/svg%3E");
    }
    .autoplay ul li.stop-button::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctitle%3Estop%3C/title%3E%3Cpath d='M18,18H6V6H18V18Z' /%3E%3C/svg%3E");
    }
    .autoplay ul li.pause-button::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctitle%3Epause%3C/title%3E%3Cpath d='M14,19H18V5H14M6,19H10V5H6V19Z' /%3E%3C/svg%3E");
    }
    .autoplay .speed {
      background: white;
      height: 2.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0rem 0.6rem;
      border-radius: 100px;
    }
    .autoplay .speed span {
      font-size: 0.6rem;
      color: black;
      background: transparent;
      margin: 0rem 0.2rem;
      padding: 0px 0.15rem;
      font-weight: 800;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      cursor: pointer;
    }
    .autoplay .speed span.curr {
      background: black;
      color: white;
      cursor: not-allowed;
    }
    .autoplay .speed span:hover {
      background: black;
      color: white;
    }
    .autoplay-overlay {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100vh;
      background: transparent;
      z-index: 9998;
    }
  `;
}

// Define custom element "story-telling-autoplay"
customElements.define("story-telling-autoplay", StorytellingAutoPlay);
