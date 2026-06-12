# Yunus Emre Gürlek - 3D Interactive Web Portfolio

Live Preview: [https://portfolio-2026-plum-pi.vercel.app/](https://portfolio-2026-plum-pi.vercel.app/)

## Overview

This repository contains the source code for the personal 3D interactive portfolio of Yunus Emre Gürlek. The project provides a highly immersive WebGL experience designed to showcase projects, skills, and professional background. It leverages modern web technologies to deliver a high-performance, real-time 3D environment directly in the browser without relying on external plugins.

## Technical Architecture

The application is built on a modern, reactive frontend stack utilizing Vue 3's Composition API for UI state management, seamlessly integrated with Three.js for 3D rendering.

### Core Technologies

*   **Framework**: Vue 3 (Composition API, `<script setup>`)
*   **Build Tool**: Vite (Optimized production builds and rapid HMR)
*   **Language**: TypeScript (Strict typing for robust state management and Three.js interactions)
*   **3D Graphics**: Three.js (WebGL rendering, custom shaders, and 3D object management)
*   **Animations**: GSAP (GreenSock Animation Platform for complex timeline sequencing, camera pathing, and UI transitions)
*   **Scrolling**: Lenis (Smooth scrolling implementation mapped to WebGL camera waypoints)
*   **Audio**: Howler.js (Spatial and interactive UI sound effects)
*   **Styling**: SCSS (Component-scoped styles, CSS variables, and responsive mixins)
*   **Shaders**: GLSL (Compiled via `vite-plugin-glsl` for custom material effects)

### Performance Optimization

Several techniques are employed to ensure a smooth 60fps experience across devices:

*   **Geometry and Material Management**: Reducing draw calls in the Three.js scene by reusing Matcap materials and optimizing geometry complexity.
*   **Texture Optimization**: Utilizing WebP formats and optimized textures to minimize VRAM usage and initial load times.
*   **Viewport Scaling**: Dynamic `devicePixelRatio` capping and `ResizeObserver` implementations to maintain rendering performance on high-density mobile displays.
*   **Asynchronous Loading**: Heavy 3D assets and textures are loaded asynchronously. The application utilizes a custom preloader to mask the initial asset parsing phase.
*   **Lifecycle Management**: Strict setup and teardown phases for event listeners, GSAP tickers, and IntersectionObservers to prevent memory leaks during component unmounting.

### Project Structure

*   `src/three/`: Contains the core WebGL engine logic.
    *   `core/`: Camera setup, scene initialization, and WebGLRenderer configuration.
    *   `objects/`: Individual 3D meshes, groups, and interaction logic (e.g., room, character, interactive screens).
    *   `shaders/`: Custom vertex and fragment shaders written in GLSL.
*   `src/animations/`: GSAP timeline configurations and camera waypoint data mapped to scroll positions.
*   `src/components/`: Reusable Vue 3 UI components (Header, Buttons, Overlays).
*   `src/features/`: Domain-specific components (Home sections, Project modals).
*   `src/i18n/`: Internationalization setup with dynamic locale switching.
*   `src/utils/`: Global event emitters, raycasting logic, and responsive size observers.

## Local Development

To run this project locally, ensure you have Node.js installed.

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the Vite development server:
    ```bash
    npm run dev
    ```
3.  Build for production:
    ```bash
    npm run build
    ```

## Copyright and License

This project, its design, source code, and all associated 3D/2D assets are the sole property of Yunus Emre Gürlek. All rights reserved.

Unauthorized copying, modification, distribution, reproduction, or commercial use of this repository or any of its contents is strictly prohibited. The intellectual property rights belong entirely to Yunus Emre Gürlek.
