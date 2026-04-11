import { allWindows, playSound } from "./globals.js";
import { OSWindow } from "./osWindow.js";
import { initStartMenu } from "./startMenu.js";
import { initMusicPlayer } from "./musicPlayer.js";

initStartMenu();
initMusicPlayer();

const mainWindow = new OSWindow(
  "mainWindow",
  "titleBarMain",
  "taskbarMain",
  "menuItemRainy",
);
const playerWindow = new OSWindow(
  "window2",
  "titleBarPlayer",
  "taskbarPlayer",
  "menuItemPlayer",
);
new OSWindow("window3", "titleBarLinks", "taskbarLinks", "menuItemLinks");
new OSWindow(
  "windowGuestbook",
  "titleBarGuestbook",
  "taskbarGuestbook",
  "menuItemGuestbook",
);
new OSWindow(
  "windowExample",
  "titleBarExample",
  "taskbarExample",
  "menuItemExample",
);
window.webringApp = new OSWindow(
  "windowWebring",
  "titleBarWebring",
  "taskbarWebring",
  "menuItemWebring",
);
new OSWindow("windowStats", "titleBarStats", "taskbarStats", "menuItemStats");

// document.getElementById("shortcutRainy").addEventListener("click", (e) => {
//   e.preventDefault();
//   mainWindow.open();
//   playSound();
// });
document.getElementById("shortcutBlog").addEventListener("click", (e) => {
  mainWindow.open();
  playSound();
});

playerWindow.open();
mainWindow.open();

function handleRouting() {
  const hash = window.location.hash;
  if (hash === "#rainylink") {
    if (window.webringApp) window.webringApp.open();
    const rainyTabBtn = document.querySelector(
      '.tab-btn[data-tab="tab-rainylink"]',
    );
    if (rainyTabBtn) rainyTabBtn.click();
  }
}
window.addEventListener("load", handleRouting);
window.addEventListener("hashchange", handleRouting);

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const textarea = document.getElementById(targetId);
    if (!textarea) return;
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value);
    const original = button.innerText;
    button.innerText = "Copied! xp";
    textarea.setSelectionRange(0, 0);
    setTimeout(() => (button.innerText = original), 2000);
    playSound();
  });
});

setTimeout(() => {
  allWindows.forEach((win) => win.updateStatus());
}, 100);

document.querySelector(".tabs").addEventListener("click", (e) => {
  const tabBtn = e.target.closest(".tab-btn");
  if (!tabBtn) return;
  const tabName = tabBtn.dataset.tab;
  if (!tabName) return;
  document
    .querySelectorAll(".tab-content")
    .forEach((t) => (t.style.display = "none"));
  document.getElementById(tabName).style.display = "block";
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  tabBtn.classList.add("active");
  // playSound();
});

document.addEventListener("mousedown", (e) => {
  const isClickable =
    e.target.closest(".clickButton") ||
    e.target.closest(".tab-btn") ||
    e.target.closest("window-controls button");

  if (isClickable) {
    playSound();
  }
});
