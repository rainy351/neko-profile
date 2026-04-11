import { playSound } from "./globals.js";

export function initMusicPlayer() {
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
    audio
      .play()
      .catch((e) => console.log("Браузер заблокировал автоплей: " + e));
    playSound();
  });

  document.getElementById("pauseBtn").addEventListener("click", () => {
    audio.pause();
    playSound();
  });

  const loopBtn = document.getElementById("loopBtn");
  loopBtn.addEventListener("click", () => {
    audio.loop = !audio.loop;
    loopBtn.innerText = audio.loop ? "Loop: ON ‎" : "Loop: OFF";
    loopBtn.classList.toggle("active-loop");
    playSound();
  });
}
