# Phoenix Entertainment Studios

Marketing site for Phoenix Entertainment Studios, an independent mobile game studio and the maker of **Tilt Ball**. Static HTML/CSS/JS — no build step.

Game assets (icon and screenshots) live in `assets/tiltball/`.

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

The site will be available at `https://erenanbar1.github.io/phoenix-website/`.
