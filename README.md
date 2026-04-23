<div align="center">
  <h1>Portfolio OS</h1>
  <p><i>An interactive desktop-like portfolio built with React, TypeScript, and Vite</i></p>

  <p>
    <img src="https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.8+-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-black?style=flat-square" alt="License" /></a>
  </p>
</div>

---

## Repositório Central de Conteúdo (SSOT)

O `portfolio-os` consome conteúdo de um repositório SSOT externo:

- `https://github.com/NullCipherr/portfolio-content`

Endpoints utilizados via raw:

- `https://raw.githubusercontent.com/NullCipherr/portfolio-content/main/content/pt/about.md`
- `https://raw.githubusercontent.com/NullCipherr/portfolio-content/main/content/pt/projects.json`
- `https://raw.githubusercontent.com/NullCipherr/portfolio-content/main/meta/projects-meta.json`

Configuração opcional (`.env`):

- `VITE_PORTFOLIO_CONTENT_BASE_URL=https://raw.githubusercontent.com/NullCipherr/portfolio-content/main`

---

## Documentation

Project documentation is modularized for easier onboarding and maintenance.

- [Documentation Index](docs/README.md)
- [Architecture](docs/en/ARCHITECTURE.md)
- [API Contracts](docs/en/API.md)
- [Operations](docs/en/OPERATIONS.md)
- [Observability](docs/en/OBSERVABILITY.md)
- [Testing](docs/en/TESTING.md)
- [Metrics Automation](docs/en/METRICS_AUTOMATION.md)
- [Roadmap](docs/en/ROADMAP.md)

---

## Preview

Portfolio OS simulates a desktop environment where each icon opens an interactive app window.

- Local URL: `http://localhost:3000`
- Entry point: `src/app/main.tsx`
- Main shell: `src/app/App.tsx`

---

## Overview

**Portfolio OS** is a frontend portfolio experience designed as an operating-system-inspired interface.

The project prioritizes:

- Modular UI architecture by domains (`app`, `features`, `shared`);
- Reusable components with stateful window management;
- Responsive behavior for desktop and laptop viewports;
- Strong TypeScript contracts for app/window state;
- Lightweight setup with Vite for fast iteration.

---

## Features

- **Window manager** with open, close, focus, minimize, maximize, and snap support.
- **Desktop interaction layer** with shortcuts, context menu, sorting, and icon size/layout controls.
- **Taskbar workflow** with active window status and quick app navigation.
- **Built-in portfolio apps**: About, Projects, Contact, Curriculum, Browser, Finder, Terminal, Music, Gallery, Task Manager, and Rito editor.
- **Theme and personalization settings** persisted in local storage.
- **Boot animation** and transitions powered by Motion.

---

## Architecture

High-level application flow:

1. `src/app/main.tsx` mounts providers and the root shell.
2. `src/app/App.tsx` defines app metadata and orchestrates desktop state.
3. `useWindowManager` controls runtime window lifecycle.
4. `features/system/components` renders desktop shell primitives (Desktop, Window, Taskbar, ContextMenu).
5. `features/portfolio/components` renders portfolio-facing content (About, Projects, Contact, Curriculum).
6. `features/tools/components` renders utility experiences (Browser, Finder, Terminal, Personalize, Rito, WebIframe).
7. `features/system/contexts` centralizes cross-cutting settings and toast state.

---

## Performance

Current optimizations:

- Vite-based dev/build pipeline with fast HMR;
- State updates scoped by feature hooks and contexts;
- Persistent preferences through local storage to reduce repeat user setup;
- Tree-shakable modern ESM setup.

Formal benchmark and Web Vitals automation are planned and documented in [Metrics Automation](docs/en/METRICS_AUTOMATION.md).

---

## Technical Decisions

- **Feature-first organization** for long-term maintainability.
- **Centralized contracts** in `shared/types` to prevent type drift.
- **Shared utility layer** (`shared/lib`) for class composition helpers.
- **UI-only scope** by default (no exposed backend API in this repository).

---

## Roadmap

- Add unit/integration test suite (Vitest + Testing Library);
- Add E2E coverage for desktop flows (Playwright);
- Add CI pipeline for lint/build/tests;
- Add accessibility and Lighthouse gates in pull requests;
- Expand i18n strategy and content management workflow.

Detailed plan: [docs/en/ROADMAP.md](docs/en/ROADMAP.md)

---

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4
- **Animation**: Motion
- **Icons**: Lucide React

---

## Project Structure

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/
│       ├── cd.yml
│       └── ci.yml
│   └── pull_request_template.md
├── docs/
│   ├── assets/
│   │   └── .gitkeep
│   ├── en/
│   │   ├── API.md
│   │   ├── ARCHITECTURE.md
│   │   ├── METRICS_AUTOMATION.md
│   │   ├── OBSERVABILITY.md
│   │   ├── OPERATIONS.md
│   │   ├── ROADMAP.md
│   │   └── TESTING.md
│   └── README.md
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── features/
│   │   ├── media/
│   │   │   └── components/
│   │   ├── portfolio/
│   │   │   └── components/
│   │   ├── tools/
│   │   │   └── components/
│   │   └── system/
│   │       ├── components/
│   │       ├── config/
│   │       ├── contexts/
│   │       └── hooks/
│   ├── shared/
│       ├── lib/
│       └── types/
│   └── test/
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── HANDOFF.md
├── LICENSE
├── SECURITY.md
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install and run

```bash
npm install
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

---

## Environment Variables

Use `.env.example` as baseline:

- `GEMINI_API_KEY`: Gemini API key for AI Studio integrations.
- `APP_URL`: runtime app URL (for hosted environments).

---

## NPM Scripts

- `npm run dev`: starts local dev server on port `3000`.
- `npm run build`: generates production build in `dist/`.
- `npm run preview`: serves production build locally.
- `npm run lint`: runs TypeScript type-check (`tsc --noEmit`).
- `npm run test`: runs tests in watch mode.
- `npm run test:run`: runs test suite once.
- `npm run test:ci`: runs tests with coverage report.
- `npm run sync:github-projects`: fetches all repositories from `NullCipherr` and regenerates portfolio projects dataset.
- `npm run clean`: removes `dist/`.

---

## CI/CD

GitHub Actions pipelines included:

- `CI` (`.github/workflows/ci.yml`): install, type-check, test coverage, and build on push/PR.
- `CD` (`.github/workflows/cd.yml`): build and deploy to GitHub Pages on `main`.

## Deployment

This project is configured to deploy to GitHub Pages automatically via CD workflow.
You can also deploy `dist/` manually to any static host.

```bash
npm run build
```

Publish the `dist/` folder on your target platform.

---

## License

This project is licensed under the **MIT License**.

See [LICENSE](LICENSE) for details.

---

## Contributing

Contributions are welcome. Please review:

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

<div align="center">
  Built for portfolio storytelling with a product-engineering mindset.
</div>
