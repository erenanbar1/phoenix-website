# Phoenix Entertainment Studios

Marketing site for Phoenix Entertainment Studios, a mobile game development studio. Static HTML/CSS/JS — no build step.

## Local preview

Open `index.html` directly in a browser, or serve it locally:

```
npx serve .
```

## Deploy (GitHub Pages)

This repo deploys automatically via GitHub Actions on every push to `main` (see `.github/workflows/deploy.yml`).

One-time setup:

1. Go to the repo on GitHub → **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` — the site will build and publish automatically.

The site will be available at `https://<username>.github.io/phoenix-website/`.
