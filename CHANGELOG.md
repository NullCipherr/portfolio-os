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

### Changed

- Reorganized `src` into `app`, `features`, and `shared` domains.
- Updated import aliases and entrypoint path.
- Split feature components into `portfolio` and `tools` domains.
- Centralized app catalog and rendering in `appRegistry`.
