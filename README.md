# rainy351.exe (Nekoweb Profile)

Welcome to the source code for my personal space on the web! This project is a tribute to the "retro web" revival, built to look and behave like a classic Windows 9x desktop.

## Project Structure

*   `index.html`: The main structural layout, containing the virtual desktop, taskbar, start menu, and all application windows.
*   `style.css`: The "Windows 95/98" styling. Handles the window border effects, scrollbars, and the "WinOS" aesthetic.
*   `script.js`: The engine behind the site. Manages window dragging, z-index layering, taskbar status, and the startup/close logic for the applications.
*   `assets/`: Contains all the necessary images (icons, profile photos, gifs) and sound files used by the site.

## Features

*   **Draggable Windows**: A custom implementation allowing you to move around the `rainy351.exe`, `player.exe`, and `links.exe` windows.
*   **Window Management**:
    *   Minimize, maximize (visual), and close functionality.
    *   Dynamic Z-index shifting to bring windows to the front when clicked.
    *   A functional Taskbar that tracks open applications.
*   **Start Menu**: A functional "WinOS" start menu to launch or re-open closed windows.
*   **Retro UI**: Custom CSS-based borders, scrollbars, and button states designed to replicate the classic GUI feel.
*   **Audio**: Includes an event-triggered sound system for button interactions and an embedded audio player for that "retro internet" vibe.

## How to Run

This is a static website. You can run it locally by:
1.  Cloning this repository.
2.  Opening `index.html` in any modern web browser.
3.  *Note:* Because of browser security policies, some local audio files might require a local server environment (like `live-server` for VS Code or `python -m http.server`) to play correctly.

## Design Philosophy
*   Everything is built from scratch using CSS (no heavy UI frameworks).
*   Inspired by the Web Revival community and the chaotic, creative energy of 90s personal homepages.

## Credits
*   Powered by [Nekoweb](https://nekoweb.org/).
