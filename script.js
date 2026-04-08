const allWindows = [];

const clickSound = document.getElementById("clickSound");

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch((e) => {});
}

document.querySelectorAll(".clickButton").forEach((button) => {
  button.addEventListener("click", playSound);
});

let highestZIndex = 100;

function updateTaskbarStatus() {
  allWindows.forEach((win) => win.updateStatus());
}

function bringToFront(windowEl) {
  highestZIndex++;
  windowEl.style.zIndex = highestZIndex;
  updateTaskbarStatus();
}

function makeDraggable(windowEl, titleBar) {
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

    // bringToFront(windowEl);
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
    if (top + elHeight > winHeight - taskbarHeight) {
      top = winHeight - taskbarHeight - elHeight;
    }

    windowEl.style.left = left + "px";
    windowEl.style.top = top + "px";
  });
}

function setupWindowControls(windowEl, taskbarBtnId) {
  const minimizeBtn = windowEl.querySelector(
    "button[title='Minimize'], button[title='Свернуть']",
  );
  const closeBtn = windowEl.querySelector(
    "button[title='Close'], button[title='Закрыть']",
  );
  const taskbarBtn = document.getElementById(taskbarBtnId);

  minimizeBtn.addEventListener("click", () => {
    windowEl.style.display = "none";
    updateTaskbarStatus();
  });

  closeBtn.addEventListener("click", () => {
    windowEl.style.display = "none";
    taskbarBtn.style.display = "none";
    updateTaskbarStatus();
  });

  taskbarBtn.addEventListener("click", () => {
    if (windowEl.style.display === "none") {
      windowEl.style.display = "flex";
      bringToFront(windowEl);
    } else {
      if (windowEl.style.zIndex == highestZIndex) {
        windowEl.style.display = "none";
        updateTaskbarStatus();
      } else {
        bringToFront(windowEl);
      }
    }
  });
}

// Меню Пуск
const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");

startButton.addEventListener("click", (e) => {
  e.stopPropagation();
  if (startMenu.style.display === "none" || startMenu.style.display === "") {
    startMenu.style.display = "flex";
    startButton.classList.add("active");
  } else {
    startMenu.style.display = "none";
    startButton.classList.remove("active");
  }
});

document.addEventListener("click", (e) => {
  if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
    startMenu.style.display = "none";
    startButton.classList.remove("active");
  }
});

updateTaskbarStatus();

const audio = document.getElementById("musicPlayer");
const progressContainer = document.querySelector(".progress-container");
const progressBarFill = document.getElementById("progressBarFill");

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBarFill.style.width = percent + "%";
  }
});

progressContainer.addEventListener("click", (e) => {
  if (!audio.duration) return;

  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;

  audio.currentTime = (clickX / width) * audio.duration;
});

document.getElementById("playBtn").addEventListener("click", () => {
  audio.play().catch((e) => console.log("Браузер заблокировал автоплей: " + e));
  document.getElementById("clickSound").play();
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  audio.pause();
  document.getElementById("clickSound").play();
});

const loopBtn = document.getElementById("loopBtn");

loopBtn.addEventListener("click", () => {
  audio.loop = !audio.loop;

  loopBtn.innerText = audio.loop ? "Loop: ON ‎" : "Loop: OFF";

  loopBtn.classList.toggle("active-loop");

  document.getElementById("clickSound").play();
});

function showMainWindow() {
  mainWindow.style.display = "flex";
  document.getElementById("taskbarMain").style.display = "flex";
  bringToFront(mainWindow);
}

document.getElementById("shortcutRainy").addEventListener("click", (e) => {
  e.preventDefault();
  showMainWindow();
  playSound();
});

document.getElementById("shortcutBlog").addEventListener("click", (e) => {
  showMainWindow();
  playSound();
});

class OSWindow {
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
new OSWindow("mainWindow", "titleBarMain", "taskbarMain", "menuItemRainy");
new OSWindow("window2", "titleBarPlayer", "taskbarPlayer", "menuItemPlayer");
new OSWindow("window3", "titleBarLinks", "taskbarLinks", "menuItemLinks");
new OSWindow(
  "windowGuestbook",
  "titleBarGuestbook",
  "taskbarGuestbook",
  "menuItemGuestbook",
);
new OSWindow(
  "windowExample", // window ID
  "titleBarExample", // title bar ID
  "taskbarExample", // taskbar button ID
  "menuItemExample", // start menu item ID
);
