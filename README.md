# Margherita 🍕 Browser

Margherita is a lightweight, pizza-themed private browser built with **Electron**. It features a modern, collapsible sidebar design, native trackpad gestures, and an aggressive ad-blocker for a clean, distraction-free viewing experience.

[Image of a professional web browser interface with a vertical navigation sidebar]

---

## 🚀 Key Features

* **Collapsible Sidebar**: A minimalist 60px sidebar that expands to 240px on hover, allowing for maximum screen real estate while browsing.
* **Pizza-Spin Loading**: The tab favicon automatically transforms into a spinning pizza emoji while a page is loading.
* **Native Trackpad Gestures**: Full support for macOS and Windows high-precision trackpads. Navigate back and forth in your history using standard two-finger horizontal swipes.
* **Recently Viewed Grid**: A dynamic home page that automatically displays a grid of your 6 most recently visited websites for quick access.
* **Advanced Ad-Blocker**: 
    * Automatically hides common ad containers and YouTube overlays.
    * Detects video ads and automatically fast-forwards to the end of the ad segment.
* **Editable Tab Titles**: Double-click any tab title in the sidebar to enter a new URL or search term directly.

---

## 🛠️ Installation Guide

### **Desktop (Windows & macOS)**
1.  Navigate to the **Releases** tab in this repository.
2.  Download the installer for your system:
    * **Windows**: `Margherita-Setup.exe`
    * **macOS**: `Margherita.dmg`
3.  **Run the Installer**:
    * *Windows*: Follow the setup wizard prompts.
    * *macOS*: Open the `.dmg` and drag Margherita to your `Applications` folder.
    * *Note*: As an unsigned app, you may need to click "Open Anyway" in your system's Security settings on the first launch.

---

## 💻 Developer Setup

If you want to contribute to the code or run it locally:

1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/margherita-browser.git](https://github.com/YOUR_USERNAME/margherita-browser.git)
    ```
2.  **Install Node Modules**:
    ```bash
    npm install
    ```
3.  **Launch for Development**:
    ```bash
    npm start
    ```
4.  **Build Binary Installers**:
    ```bash
    npm run build
    ```

---

## 🤖 Tech Stack & Architecture

* **Framework**: [Electron](https://www.electronjs.org/) (Node.js + Chromium).
* **Inter-Process Communication (IPC)**: Used to bridge data between the Sidebar, the Home Page, and the Main process.
* **Preload Scripts**: Injected into webviews to capture native hardware gestures and apply CSS-based ad filtering.
* **CI/CD**: [GitHub Actions](https://github.com/features/actions) for automated multi-OS builds (v4 runners).

---

## 🍕 Why Margherita?

This project was built to rethink the standard browser UI. By moving the tab management to a vertical, collapsible sidebar and focusing on native gesture support, Margherita offers a unique way to consume content.

**Created by [Your Name/Handle]**