# Operations

## Local Development

```bash
npm install
npm run dev
```

Default local URL: `http://localhost:3000`

## Production Build

```bash
npm run build
npm run preview
```

## Validation

```bash
npm run lint
npm run test:ci
npm run build
```

## Environment Variables

Copy from `.env.example` and set values per environment.

- `GEMINI_API_KEY`
- `APP_URL`

## Deployment Workflow

1. Run `npm run lint`.
2. Run `npm run test:ci`.
3. Run `npm run build`.
4. Push to `main` for automatic GitHub Pages deployment (CD workflow).
5. Validate critical user journeys in production.

## Recommended Release Checklist

- verify About/Projects/Contact/Curriculum apps load correctly;
- verify taskbar interactions and window controls;
- verify personalization persists after page refresh;
- verify responsive behavior on desktop and mobile widths;
- verify no console errors in production build.
