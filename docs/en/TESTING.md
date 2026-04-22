# Testing

## Current Status

Automated tests are configured with Vitest + Testing Library.

Current validation command:

```bash
npm run test:ci
```

Additional quality gates:

```bash
npm run lint
npm run build
```

## Manual Regression Checklist

- boot screen completes and desktop becomes interactive;
- app icons open expected windows;
- taskbar reflects active/minimized state;
- context menu actions respond correctly;
- settings and personalization persist after refresh;
- browser iframe apps load and show loading state.

## Current Automated Coverage

- shared utility validation (`cn`) in `src/shared/lib/__tests__/utils.test.ts`;
- window manager lifecycle tests in `src/features/system/hooks/__tests__/useWindowManager.test.tsx`;
- settings persistence tests in `src/features/system/contexts/__tests__/SettingsContext.test.tsx`.

## Recommended Next Test Layers

- E2E tests: Playwright for end-to-end desktop workflows.
- visual regression tests for key desktop states.
- accessibility regression checks with axe in CI.

## Candidate Priority Tests

- `useWindowManager` behavior transitions;
- taskbar-to-window synchronization;
- settings persistence in local storage;
- focus/z-index ordering when multiple windows are open.
