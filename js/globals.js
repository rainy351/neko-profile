export const allWindows = [];

export let highestZIndex = 100;

export const clickSound = document.getElementById("clickSound");

export function playSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch((e) => {});
}

export function updateTaskbarStatus() {
  allWindows.forEach((win) => win.updateStatus());
}

export function bringToFront(windowEl) {
  highestZIndex++;
  windowEl.style.zIndex = highestZIndex;
  updateTaskbarStatus();
}

export function setHighestZIndex(value) {
  highestZIndex = value;
}
