// import { playSound } from "./globals.js";

export function initStartMenu() {
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
}
