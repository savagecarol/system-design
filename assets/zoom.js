/* -------- Zoom -------- */
let scale = .6;
const MIN_SCALE = 0.3;
const MAX_SCALE = 1;
const STEP = 0.1;

function getZoomTarget() {
  let wrapper = document.querySelector(".md-content-zoom");
  if (wrapper) return wrapper;
  const content = document.querySelector(".md-content");
  if (!content) return null;
  wrapper = document.createElement("div");
  wrapper.className = "md-content-zoom";
  while (content.firstChild) wrapper.appendChild(content.firstChild);
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
    <button id="zoom-in" title="Zoom in">+</button>
    <button id="zoom-out" title="Zoom out">−</button>
    <button id="zoom-reset" title="Reset zoom">⟳</button>
  `;
  document.body.appendChild(controls);
  document.getElementById("zoom-in").onclick = () => { scale = Math.min(scale + STEP, MAX_SCALE); applyZoom(); };
  document.getElementById("zoom-out").onclick = () => { scale = Math.max(scale - STEP, MIN_SCALE); applyZoom(); };
  document.getElementById("zoom-reset").onclick = () => { scale = 1.0; applyZoom(); };
}

/* -------- Draggable Sidebar -------- */
function createResizeHandle() {
  const handle = document.createElement("div");
  handle.className = "sidebar-resize-handle";
  document.body.appendChild(handle);

  let startX, startWidth;

  function getSidebarWidth() {
    return parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--sidebar-width") || "260"
    );
  }

  function setSidebarWidth(width) {
    const clamped = Math.min(Math.max(width, 160), 280);
    document.documentElement.style.setProperty("--sidebar-width", clamped + "px");
    handle.style.left = clamped + "px";
  }

  handle.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    startWidth = getSidebarWidth();
    handle.classList.add("dragging");
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  });

  function onMouseMove(e) {
    setSidebarWidth(startWidth + (e.clientX - startX));
  }

  function onMouseUp() {
    handle.classList.remove("dragging");
    document.body.style.userSelect = "";
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
}

/* -------- Navbar Social Icons (right side) -------- */
function injectSocialIcons() {
  const header = document.querySelector(".md-header__inner") || document.querySelector(".md-header");
  if (!header) return;

  const social = document.createElement("div");
  social.className = "md-header__social";
  social.innerHTML = `
    <a href="https://www.youtube.com/@savagecarol" target="_blank" title="YouTube">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
      </svg>
    </a>
    <a href="https://github.com/savagecarol/system-design" target="_blank" title="GitHub">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.7 18 5 18 5c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/>
      </svg>
    </a>
    <a href="https://www.linkedin.com/in/savagecarol" target="_blank" title="LinkedIn">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.4 20.4h-3.4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8v5.4H9.8V9h3.3v1.6h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.1 2.3 4.1 5.3v6.3zM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm1.7 13H3.6V9h3.4v11.4zM22.2 0H1.8A1.8 1.8 0 0 0 0 1.8v20.4A1.8 1.8 0 0 0 1.8 24h20.4A1.8 1.8 0 0 0 24 22.2V1.8A1.8 1.8 0 0 0 22.2 0z"/>
      </svg>
    </a>
  `;

  // Append to the END of header so it sits on the right
  header.appendChild(social);
}

/* -------- Footer Copyright -------- */
function injectFooter() {
  const year = new Date().getFullYear();
  const footer = document.createElement("div");
  footer.className = "md-custom-footer";
  footer.innerHTML = `© ${year} savagecarol — All rights reserved`;
  document.body.appendChild(footer);
}

/* -------- Init -------- */
document.addEventListener("DOMContentLoaded", () => {
  createZoomControls();
  createResizeHandle();
  injectSocialIcons();
  injectFooter();
  applyZoom();
});