let scale = 0.6;
const MIN_SCALE = 0.4;
const MAX_SCALE = 1.2;
const STEP = 0.1;

function getZoomTarget() {
  let wrapper = document.querySelector(".md-content-zoom");
  if (wrapper) return wrapper;

  const content = document.querySelector(".md-content");
  if (!content) return null;

  wrapper = document.createElement("div");
  wrapper.className = "md-content-zoom";

  // Move existing content inside wrapper
  while (content.firstChild) {
    wrapper.appendChild(content.firstChild);
  }

  content.appendChild(wrapper);
  return wrapper;
}

function applyZoom() {
  const target = getZoomTarget();
  if (!target) return;

  target.style.transform = `scale(${scale})`;
}

function createZoomControls() {
  const controls = document.createElement("div");
  controls.className = "md-zoom-controls";

  controls.innerHTML = `
    <button id="zoom-in">+</button>
    <button id="zoom-out">−</button>
    <button id="zoom-reset">⟳</button>
  `;

  document.body.appendChild(controls);

  document.getElementById("zoom-in").onclick = () => {
    scale = Math.min(scale + STEP, MAX_SCALE);
    applyZoom();
  };

  document.getElementById("zoom-out").onclick = () => {
    scale = Math.max(scale - STEP, MIN_SCALE);
    applyZoom();
  };

  document.getElementById("zoom-reset").onclick = () => {
    scale = 0.7;
    applyZoom();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  createZoomControls();
  applyZoom();   // 👈 initial zoom applied safely
});
