# Trần Hữu Đạt — Senior Backend Developer Portfolio

Interactive portfolio built with React 19, TypeScript, Vite and Tailwind CSS v4.

Live site: https://exia-thd.github.io/Profile/

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev     # http://localhost:3000
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type-check with `tsc --noEmit` |

## Deployment

Pushes to `main` are built and published to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The Vite `base`
is set to `/Profile/` to match the project-site URL.
