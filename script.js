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
  const mainTaskbarBtn = document.getElementById("taskbarMain");
  const playerTaskbarBtn = document.getElementById("taskbarPlayer");
  const linksTaskbarBtn = document.getElementById("taskbarLinks");
  const guestbookTaskbarBtn = document.getElementById("taskbarGuestbook");

  if (mainWindow.style.display !== "none") {
    mainTaskbarBtn.classList.add("active");
  } else {
    mainTaskbarBtn.classList.remove("active");
  }

  if (playerWindow.style.display !== "none") {
    playerTaskbarBtn.classList.add("active");
  } else {
    playerTaskbarBtn.classList.remove("active");
  }

  if (linksWindow.style.display !== "none") {
    linksTaskbarBtn.classList.add("active");
  } else {
    linksTaskbarBtn.classList.remove("active");
  }

  if (guestbookWindow && guestbookTaskbarBtn) {
    if (guestbookWindow.style.display !== "none") {
      guestbookTaskbarBtn.classList.add("active");
    } else {
      guestbookTaskbarBtn.classList.remove("active");
    }
  }
}

function bringToFront(windowEl) {
  highestZIndex++;
  windowEl.style.zIndex = highestZIndex;
  updateTaskbarStatus();
}

const mainWindow = document.getElementById("mainWindow");
const playerWindow = document.getElementById("window2");
const linksWindow = document.getElementById("window3");
const guestbookWindow = document.getElementById("windowGuestbook");
const taskbarGuestbookBtn = document.getElementById("taskbarGuestbook");

makeDraggable(linksWindow, document.getElementById("titleBarLinks"));
setupWindowControls(linksWindow, "taskbarLinks");

makeDraggable(guestbookWindow, document.getElementById("titleBarGuestbook"));
setupWindowControls(guestbookWindow, "taskbarGuestbook");

mainWindow.addEventListener("mousedown", () => bringToFront(mainWindow));
playerWindow.addEventListener("mousedown", () => bringToFront(playerWindow));
linksWindow.addEventListener("mousedown", () => bringToFront(linksWindow));
guestbookWindow.addEventListener("mousedown", () =>
  bringToFront(guestbookWindow),
);

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

makeDraggable(mainWindow, document.getElementById("titleBarMain"));
makeDraggable(playerWindow, document.getElementById("titleBarPlayer"));

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

setupWindowControls(mainWindow, "taskbarMain");
setupWindowControls(playerWindow, "taskbarPlayer");

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

document.getElementById("menuItemRainy").addEventListener("click", () => {
  mainWindow.style.display = "flex";
  document.getElementById("taskbarMain").style.display = "flex";
  bringToFront(mainWindow);
  startMenu.style.display = "none";
  startButton.classList.remove("active");
});

document.getElementById("menuItemPlayer").addEventListener("click", () => {
  playerWindow.style.display = "flex";
  document.getElementById("taskbarPlayer").style.display = "flex";
  bringToFront(playerWindow);
  startMenu.style.display = "none";
  startButton.classList.remove("active");
});

document.getElementById("menuItemLinks").addEventListener("click", () => {
  linksWindow.style.display = "flex";
  document.getElementById("taskbarLinks").style.display = "flex";
  bringToFront(linksWindow);
  startMenu.style.display = "none";
  startButton.classList.remove("active");
});

document.getElementById("menuItemGuestbook").addEventListener("click", () => {
  guestbookWindow.style.display = "flex";
  taskbarGuestbookBtn.style.display = "flex";
  bringToFront(guestbookWindow);

  // Прячем пуск после клика
  const startMenu = document.getElementById("startMenu");
  const startButton = document.getElementById("startButton");
  startMenu.style.display = "none";
  startButton.classList.remove("active");
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
