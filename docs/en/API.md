# API Contracts

Portfolio OS does not expose a public HTTP API in this repository.

This document describes internal TypeScript contracts used across features.

## App Contracts

Defined in `src/shared/types/index.ts`:

- `AppId`: union of all app identifiers.
- `AppConfig`: metadata contract for desktop/taskbar/window bootstrapping.
- `WindowState`: runtime window state (position, z-index, minimization/maximization, snapping).

## Settings Context Contract

Defined in `src/features/system/contexts/SettingsContext.tsx`.

Main responsibilities:

- expose theme/wallpaper/personalization state;
- persist preferences in local storage;
- provide setters for desktop behavior and visual settings.

## Toast Context Contract

Defined in `src/features/system/contexts/ToastContext.tsx`.

Main responsibilities:

- create transient notifications;
- keep notification queue state;
- auto-dismiss toasts after timeout.

## Window Manager Hook Contract

Defined in `src/features/system/hooks/useWindowManager.ts`.

Main responsibilities:

- open/close/focus windows;
- toggle minimize/maximize;
- update window size and position;
- apply snap operations.
