# Metrics Automation

## Goal

Introduce repeatable performance and quality checks to prevent regressions.

## Suggested CI Metrics Pipeline

1. Run `npm run lint`.
2. Run `npm run build`.
3. Run Lighthouse CI against production preview.
4. Compare Web Vitals trend against baseline.

## Metrics to Track

- LCP (Largest Contentful Paint)
- INP (Interaction to Next Paint)
- CLS (Cumulative Layout Shift)
- JS bundle size by chunk
- build time

## Tooling Suggestions

- Lighthouse CI
- `vite-bundle-visualizer` or equivalent
- GitHub Actions workflow with artifact upload
