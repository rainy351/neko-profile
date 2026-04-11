import { bringToFront, setHighestZIndex } from "./globals.js";

export function makeDraggable(windowEl, titleBar) {
  let offsetX = 0,
    offsetY = 0,
    isDragging = false;

  titleBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = windowEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    windowEl.style.transform = "none";
    windowEl.style.position = "absolute";
    windowEl.style.left = rect.left + "px";
    windowEl.style.top = rect.top + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const taskbarHeight = 41;
    const elWidth = windowEl.offsetWidth;
    const elHeight = windowEl.offsetHeight;

    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left + elWidth > winWidth) left = winWidth - elWidth;
    if (top + elHeight > winHeight - taskbarHeight)
      top = winHeight - taskbarHeight - elHeight;

    windowEl.style.left = left + "px";
    windowEl.style.top = top + "px";
  });
}
