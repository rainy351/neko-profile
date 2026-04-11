import {
  allWindows,
  bringToFront,
  updateTaskbarStatus,
  playSound,
  highestZIndex,
} from "./globals.js";
import { makeDraggable } from "./draggable.js";

export class OSWindow {
  constructor(id, titleBarId, taskbarBtnId, menuItemId) {
    this.el = document.getElementById(id);
    this.titleBar = document.getElementById(titleBarId);
    this.taskbarBtn = document.getElementById(taskbarBtnId);
    this.menuItem = document.getElementById(menuItemId);
    allWindows.push(this);
    this.init();
  }

  init() {
    makeDraggable(this.el, this.titleBar);
    this.el.addEventListener("mousedown", () => bringToFront(this.el));
    this.el
      .querySelector("button[title='Minimize']")
      ?.addEventListener("click", () => this.hide());
    this.el
      .querySelector("button[title='Close']")
      ?.addEventListener("click", () => this.close());
    this.taskbarBtn.addEventListener("click", () => this.toggle());
    this.menuItem?.addEventListener("click", () => {
      this.open();
      document.getElementById("startMenu").style.display = "none";
      document.getElementById("startButton").classList.remove("active");
    });
  }

  open() {
    this.el.style.display = "flex";
    this.taskbarBtn.style.display = "flex";
    bringToFront(this.el);
  }

  hide() {
    this.el.style.display = "none";
    updateTaskbarStatus();
  }

  close() {
    this.el.style.display = "none";
    this.taskbarBtn.style.display = "none";
    updateTaskbarStatus();
  }

  toggle() {
    if (this.el.style.display === "none") {
      this.open();
    } else if (this.el.style.zIndex == highestZIndex) {
      this.hide();
    } else {
      bringToFront(this.el);
    }
  }

  updateStatus() {
    if (this.el.style.display !== "none") {
      this.taskbarBtn.classList.add("active");
    } else {
      this.taskbarBtn.classList.remove("active");
    }
  }
}
