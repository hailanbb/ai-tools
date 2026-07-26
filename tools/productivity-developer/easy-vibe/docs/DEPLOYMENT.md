# Deployment Notes

## Base Path Auto-Adaptation

This project is a VitePress site that can be deployed to both **Vercel** and **GitHub Pages**. The main difference is the `base` path:

- Vercel: typically `/`
- GitHub Pages: typically `/easy-vibe/`

The VitePress config handles this automatically:

```js
// docs/.vitepress/config.mjs
const isVercel = process.env.VERCEL === '1'
const base = isVercel ? '/' : '/easy-vibe/'
```

## Environment Comparison

| Platform | Base | Example URL |
| --- | --- | --- |
| Vercel | `/` | `https://your-project.vercel.app/en/stage-1/...` |
| GitHub Pages | `/easy-vibe/` | `https://datawhalechina.github.io/easy-vibe/en/stage-1/...` |
| Local dev | `/easy-vibe/` | `http://localhost:5173/easy-vibe/en/stage-1/...` |
| Local preview | `/easy-vibe/` | `http://localhost:4173/easy-vibe/en/stage-1/...` |

## Home Redirect And Dynamic Links

The home page uses VitePress `withBase()` and `useData()` to avoid hardcoding the base path.

Example:

```vue
<script setup>
import { useData } from 'vitepress'

const { site } = useData()
const base = site.value.base
</script>

<template>
  <a :href="base + 'en/stage-1/learning-map/'">Go</a>
</template>
```

## Deploy Steps

### Vercel

1. Push code to GitHub.
2. Import the repo in Vercel (or connect it).
3. Vercel will build automatically (see `vercel.json`).

Vercel usually sets `VERCEL=1` automatically.

### GitHub Pages

1. Configure GitHub Pages for the repo.
2. Build:

```bash
npm run build
```

3. Verify the published site: `https://datawhalechina.github.io/easy-vibe`

## Post-Deploy Checklist

- Home page loads.
- Navbar links navigate correctly.
- Locale switching works.
- Images load correctly.

## Troubleshooting

### Vercel URLs include `/easy-vibe/...` and return 404

Cause: `VERCEL` env var is missing or not equal to `1`.

Fix:

1. Check Vercel project settings -> Environment Variables.
2. Ensure `VERCEL=1`.
3. Redeploy.

### GitHub Pages returns 404 for all routes

Cause: missing `/easy-vibe/` base path in the build.

Fix:

1. Check `docs/.vitepress/config.mjs` base logic.
2. Ensure the GitHub Pages build uses `base = '/easy-vibe/'`.
3. Rebuild and redeploy.

