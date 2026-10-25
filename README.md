# Abhidhab Mellwyn – Portfolio Website

A production-ready personal portfolio website for **Abhidhab Mellwyn** (Full Stack Engineer & AI Agents), built with React 18, Vite, TypeScript, Tailwind CSS, and Framer Motion. Engineered according to the **Autonomous Vanguard** design system.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom CSS tokens for clean dark/light theme switching
- **Animation**: [Motion / Framer Motion](https://motion.dev/) for interactive card transitions and modal entries
- **Icons**: [lucide-react](https://lucide.dev/)
- **Architecture**: Decoupled content layer in `src/data/profile.ts` so all personal data can be edited without touching UI components.

---

## Project Structure

```
├── public/
│   ├── images/
│   │   └── profile.png                     # Circular profile portrait
│   └── resume/
│       └── Abhidhab_Mellwyn_Resume.pdf     # Downloadable resume PDF
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                      # Top bar with links, theme switch & resume button
│   │   ├── Hero.tsx                        # Portrait, availability, code widget & CTAs
│   │   ├── Stats.tsx                       # 4 enterprise metrics cards
│   │   ├── About.tsx                       # Background & Active assignment with 99.98% SLA
│   │   ├── ExperienceTimeline.tsx          # 4-role timeline with animated nodes
│   │   ├── Projects/
│   │   │   ├── FilterBar.tsx               # Category pills with dynamic counters
│   │   │   ├── SearchBox.tsx               # Cmd/Ctrl+K keyboard shortcut & clear button
│   │   │   ├── ProjectCard.tsx             # System architecture cards & badges
│   │   │   ├── DemoModal.tsx               # Simulation runners, Architecture & Tech Specs
│   │   │   └── index.tsx                   # Projects section coordinator
│   │   ├── Skills.tsx                      # Grouped chips & focus allocation chart
│   │   ├── Certifications.tsx              # 8 credentials with Credly verification links
│   │   ├── Education.tsx                   # BITS Pilani M.Tech & St. Joseph's B.E.
│   │   ├── Contact.tsx                     # Form validation & prefilled mailto transmission
│   │   ├── Footer.tsx                      # Copyright & back to top
│   │   ├── ThemeToggle.tsx                 # System preference & localStorage theme switcher
│   │   └── MobileBottomNav.tsx             # Mobile sticky nav & quick actions
│   ├── data/
│   │   └── profile.ts                      # Single source of truth for all portfolio data
│   ├── utils/
│   │   ├── projectFilters.ts               # Filter & search algorithms
│   │   └── validation.ts                   # Contact form validation & mailto generation
│   ├── App.tsx                             # Main page assembly & scroll spy
│   ├── index.css                           # Color tokens & grid background
│   └── main.tsx                            # React entry point
└── package.json
```

---

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Run unit tests**:
   ```bash
   npx --yes tsx --test src/utils/projectFilters.test.ts src/utils/validation.test.ts
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```
   Production assets will be emitted to `dist/`.

---

## Deployment Guide

### Deploying to Vercel

1. Push your repository to GitHub or GitLab.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your repository. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

### Deploying to GitHub Pages

1. In `vite.config.ts`, configure the `base` path with your repository name:
   ```typescript
   export default defineConfig({
     base: '/<your-repo-name>/', // e.g., '/portfolio/'
     // ... rest of config
   });
   ```
2. In your `package.json`, add deploy scripts if using `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run:
   ```bash
   npm run deploy
   ```
4. In your GitHub repository settings under **Pages**, set the source branch to `gh-pages`.

---

## Customizing Portfolio Content

All personal information, roles, stats, projects, skills, and certifications are stored strictly in `src/data/profile.ts`. Update values in that file without altering UI markup.
