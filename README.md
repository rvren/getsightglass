# getsightglass.ai

The **Sightglass** product site — *see where your attention goes.* A local-first
macOS app that puts your focus, browsing, apps and calendar in one place, with
everything computed on your machine.

Built with React + Vite + TypeScript, Tailwind, and framer-motion. Served at the
apex domain **https://getsightglass.ai** via GitHub Pages (custom domain in
`public/CNAME`).

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check, build to dist/, emit dist/404.html
npm run preview  # preview the production build
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes `dist/` to GitHub Pages. `public/CNAME` sets the custom
domain (`getsightglass.ai`).

The page content is extracted from the `/sightglass` route of the personal site
(`rvren/rvren.github.io`); the product copy lives in `src/data/sightglass.ts`.
