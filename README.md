# Portfolio Website

A modern, responsive personal portfolio website with dual application architecture. The project features a Next.js-based main site (Home, About, Contact, Portfolio pages) paired with a Vue/Vite interactive experience (`portfolio/` subdirectory) that showcases advanced animations, 3D visuals using Three.js, and rich interactivity.

## Overview

This is a full-stack portfolio solution designed for developers who want a polished, animated landing page combined with an interactive project showcase. The site is responsive across desktop, tablet, and mobile devices, with careful attention to performance and user experience.

### Key Features

- **Responsive Design**: Fully optimized for mobile (320px+), tablet, and desktop viewports with tailored layouts for each breakpoint
- **Smooth Transitions**: Page transitions with Framer Motion animations
- **Background Music**: Optional background audio that users can toggle on/off
- **Interactive Portfolio**: Horizontal scroll carousel on desktop, vertical card stacks on mobile/tablet
- **3D/Animation Experience**: Separate interactive experience with Three.js, GSAP, and Vue (in the `portfolio/` subdirectory)
- **Contact Form**: EmailJS integration for form submissions
- **Dark Mode Ready**: Styled with Tailwind CSS for easy theming

## Technology Stack

### Root Application (Next.js)
- **Framework**: Next.js 14 with App Router
- **Frontend**: React 18, TypeScript, JavaScript
- **Styling**: Tailwind CSS 3.3
- **Animations**: Framer Motion
- **Email**: EmailJS for contact form handling
- **Development**: ESLint for code quality

### Portfolio Subdirectory (Vue/Vite)
- **Framework**: Vue 3
- **Build Tool**: Vite 7
- **3D Graphics**: Three.js, WebGL shaders
- **Animations**: GSAP (GreenSock Animation Platform), Lenis for smooth scrolling
- **Audio**: Howler.js for sound effects
- **Styling**: SCSS/Sass
- **Build**: Vue TypeScript Compiler (vue-tsc)

## Directory Structure

```
.
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout with navigation and transitions
│   │   ├── globals.css            # Global responsive styles
│   │   ├── page.jsx               # Home/Hero page
│   │   ├── about/page.jsx         # About page with skills
│   │   ├── contact/page.jsx       # Contact form
│   │   └── portfolio/page.jsx     # Portfolio showcase (desktop: horizontal scroll, mobile: cards)
│   ├── components/
│   │   ├── navbar.jsx             # Navigation with mobile menu
│   │   ├── transitionProvider.jsx # Page transition effects wrapper
│   │   ├── BackgroundMusic.jsx    # Background music player with mute toggle
│   │   └── navLink.jsx            # Reusable navigation link component
│   └── assets/
│       ├── images/
│       ├── styles/
│       └── ...
├── portfolio/
│   ├── src/
│   │   ├── App.vue                # Root Vue component
│   │   ├── main.ts                # Vue entry point
│   │   ├── components/            # Vue components (Header, Cursor, etc.)
│   │   ├── animations/            # Animation utilities and definitions
│   │   ├── three/                 # Three.js scene, objects, shaders
│   │   ├── features/              # Feature modules (home, projects, sounds)
│   │   ├── i18n/                  # Internationalization support
│   │   └── content/               # Content definitions, projects data
│   ├── public/                    # Static assets (legal pages, fonts, etc.)
│   ├── sounds/                    # Audio files for animations
│   └── package.json               # Portfolio app dependencies (Vue, Three.js, etc.)
├── public/
│   ├── user_hero.png              # Hero image
│   ├── background-music.mp4       # (Add your background music here)
│   └── [social media icons]
├── package.json                   # Root Next.js dependencies and scripts
├── tailwind.config.js             # Tailwind CSS configuration
├── scripts/
│   └── dev.mjs                    # Smart dev launcher that runs both apps
└── README.md                      # This file
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser with ES6 support

### Running Both Applications

The root project uses a unified launcher (`scripts/dev.mjs`) that automatically starts both the Next.js site and the interactive portfolio experience:

From the root directory, the development servers will start on automatically assigned ports (typically 3000+ for Next.js, 3001+ for Vite). Both servers will display their URLs in the terminal.

### Development Workflow

**For Next.js Main Site Development:**
- Edit files in `src/app/` or `src/components/`
- Changes auto-reload immediately
- Styling via Tailwind classes (configured in `tailwind.config.js`)
- Add new pages by creating files under `src/app/[route]/page.jsx`

**For Portfolio/Interactive Experience Development:**
- Edit files in `portfolio/src/`
- Changes auto-reload via Vite's HMR
- Use Vue Single File Components (`.vue` files)
- Three.js scenes and shaders are in `portfolio/src/three/`

## Adding Background Music

To add background music to your site:

1. **Prepare the Audio File**:
   - Use an MP4, MP3, or WebM format file
   - Recommended bitrate: 128-192 kbps for balance between quality and file size
   - Keep file size under 5MB for optimal loading

2. **Place in Public Directory**:
   - Save your audio file to `public/background-music.mp4` (or adjust the filename in `BackgroundMusic.jsx`)

3. **Customize the Player**:
   - Edit `src/components/BackgroundMusic.jsx` to adjust:
     - Volume level (default 0.3 = 30%)
     - Auto-mute on load (change `muted={true}` to `false` for auto-play)
     - Button styling and position
     - File path reference

## Responsive Breakpoints

The site adapts to all screen sizes with specific breakpoints:

- **Mobile (default)**: Base styles for 320px and up
- **Small Mobile (sm)**: 640px and up (landscape phones)
- **Tablet (md)**: 768px and up (portrait tablets)
- **Large Tablet (lg)**: 1024px and up (landscape tablets)
- **Desktop (xl)**: 1280px and up
- **Large Desktop (2xl)**: 1536px and up

Each section (Home, About, Contact, Portfolio) includes specific mobile optimizations:
- Stacked layouts instead of side-by-side on small screens
- Reduced font sizes and spacing for better readability
- Touch-friendly button sizes
- Portfolio carousel becomes a vertical card stack on mobile/tablet

## Customization

### Homepage (`src/app/page.jsx`)
- Update hero text, title, and description
- Replace `user_hero.png` with your own image
- Modify button labels and link destinations

### About Page (`src/app/about/page.jsx`)
- Add/remove skills from the skill tags list
- Update biography and experience sections
- Add images and content

### Contact Form (`src/app/contact/page.jsx`)
- Requires EmailJS setup (see below for configuration)
- Customize form fields and styling

### Email Configuration
To enable the contact form:

1. Create an account on [EmailJS](https://www.emailjs.com/)
2. Set up an email service and template
3. Add environment variables to `.env.local`:
   ```
   NEXT_PUBLIC_SERVICE_ID=your_service_id
   NEXT_PUBLIC_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_PUBLIC_KEY=your_public_key
   ```

### Portfolio Projects (`src/app/portfolio/page.jsx`)
- Edit the `items` array to add/remove projects
- Update project titles, descriptions, images, and links
- Customize gradient colors for each project card

## Performance Considerations

- Images use Next.js `Image` component for optimization
- Lazy loading on portfolio items
- Smooth scroll animations throttled for performance
- Background music muted on load to avoid autoplay blocking
- Responsive images prevent unnecessary downloads on mobile

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers on iOS 14+ and Android 10+

## Deployment

The site can be deployed to any modern hosting platform:

- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: Supports both Next.js and static exports
- **Self-hosted**: Use `npm run build` to generate optimized production files

For self-hosting, ensure Node.js 16+ is available and configure environment variables for email service if using the contact form.
- Connect the repository.
- Use the default Next.js build command (`npm run build`).
- Use `npm start` as the start command.

## Git Notes

When publishing to GitHub, ensure you have:
- Configured Git identity (name/email)
- Authenticated to GitHub (HTTPS credentials or SSH keys)
- Pushed the `main` branch

Commands typically used:

```bash
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Dpehect/Portfolio-Website.git
git push -u origin main
```
