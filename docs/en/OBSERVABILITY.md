# Observability

## Current State

The project currently relies on browser devtools and manual QA for runtime verification.

## Recommended Baseline

- capture runtime errors in a monitoring platform (Sentry or equivalent);
- instrument key UX events (open app, close app, personalization actions);
- log build metadata (version/commit) in release artifacts.

## Frontend Health Signals

- JavaScript runtime errors;
- hydration/render failures;
- performance metrics (LCP, INP, CLS);
- route/app open latency.

## Immediate Next Steps

1. Add Web Vitals collection.
2. Add error boundary + centralized error reporting.
3. Track core interaction events for portfolio analytics.
