# Project Handoff

## Project Summary

Portfolio OS is an interactive personal portfolio that mimics a desktop operating system, built as a frontend SPA with React + TypeScript + Vite.

## Current Delivery Scope

- Desktop shell with window lifecycle interactions.
- Portfolio content apps and utility apps.
- Local persistence for user personalization.
- Modular documentation and governance baseline.

## Technical Ownership Areas

- `src/app`: shell composition and app orchestration.
- `src/features/system`: desktop, taskbar, windows, contexts, and shell behavior.
- `src/features/apps`: business/content apps.
- `src/features/media`: media-related experiences.
- `src/shared`: shared contracts and utilities.

## Runbook

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Client-Facing Checklist

- [ ] Domain and hosting configured.
- [ ] Final content and links validated.
- [ ] SEO metadata reviewed.
- [ ] Accessibility pass completed.
- [ ] Analytics/monitoring configured.

## Recommended Next Actions

1. Add automated tests and CI.
2. Add Lighthouse and accessibility gates.
3. Define content update workflow (who updates projects/resume and how often).
