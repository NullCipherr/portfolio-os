# Architecture

## Purpose

Portfolio OS is a frontend-only application that emulates an operating system shell for portfolio navigation.

## Architecture Style

- UI architecture: feature-first modular frontend
- State management: React local state + context providers
- Build system: Vite + TypeScript

## Layering

- `src/app`: composition root and app bootstrap.
- `src/features/portfolio`: portfolio-facing modules.
- `src/features/tools`: utility modules and productivity experiences.
- `src/features/media`: media-centric modules.
- `src/features/system`: desktop shell and orchestration modules.
- `src/shared`: shared types and utility functions.
- `src/test`: test setup utilities.

## Runtime Flow

1. `main.tsx` mounts providers (`SettingsProvider`, `ToastProvider`).
2. `App.tsx` defines available app modules and desktop behaviors.
3. `useWindowManager` controls lifecycle for each app window.
4. System components render shell interactions (desktop, taskbar, window frame, context menu).
5. Feature components are split by domain (portfolio, tools, media, system).
6. `appRegistry` centralizes app catalog and rendering dispatch.

## Persistence Strategy

User preferences are persisted in `localStorage` for:

- theme
- wallpaper
- icon layout and size
- sorting and pinned apps
- icon positions

## Current Constraints

- No server-side rendering.
- No backend API layer.
- E2E test coverage is still pending (unit/integration baseline is active).
