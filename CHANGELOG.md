# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Professional documentation suite under `docs/`.
- Governance files: `LICENSE`, `CONTRIBUTING`, `CODE_OF_CONDUCT`, `SECURITY`.
- Handoff guide for project continuity.
- Automated test stack with Vitest + Testing Library.
- CI pipeline (`.github/workflows/ci.yml`) for lint, tests, and build.
- CD pipeline (`.github/workflows/cd.yml`) for GitHub Pages deployment.
- External terminal integration via `VITE_PORTFOLIO_TERMINAL_URL` (documented in `.env.example`).

### Changed

- Reorganized `src` into `app`, `features`, and `shared` domains.
- Updated import aliases and entrypoint path.
- Split feature components into `portfolio` and `tools` domains.
- Centralized app catalog and rendering in `appRegistry`.
- Terminal app now renders deployed `portfolio-terminal` through `WebIframe` instead of the internal terminal component.
- Terminal iframe URL handling now appends `embed=1` for chrome-less rendering inside OS window.

### Fixed

- Restored Enter-based command execution in embedded terminal by expanding iframe sandbox permissions (`allow-forms` and `allow-popups`).
