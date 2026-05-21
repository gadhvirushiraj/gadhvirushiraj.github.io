# Portfolio Site — Architecture Guide

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · CSS Modules for components

## CSS Architecture

**Single source of truth. No inline `<style>` blocks anywhere.**

```
app/globals.css       ← Global: variables, reset, layout, sidebar, theme toggle
app/about.css         ← About-page: animations, image grid, typewriter
components/*.module.css  ← Component-scoped styles (CSS Modules)
```

### Global CSS Variables (`app/globals.css` `:root`)

| Variable | Purpose |
|---|---|
| `--bg` | Page background |
| `--card` | Card/box background |
| `--font-col` | Body text color |
| `--accent` | Hover highlights (`#d4821f`) |
| `--heading` | Heading font (Halant) |
| `--normal-text` | Body font (Figtree) |
| `--sub-heading` | Subheading font (Figtree medium) |
| `--mono` | Monospace font (Courier New) |
| `--cursor-col` | Typewriter cursor |
| `--para-gap` | Paragraph spacing (0.8rem) |
| `--radius` | Border-radius for all cards, tiles, and buttons (1rem) |

### Theme Values

| Variable | Dark (default) | Light (`[data-theme="light"]`) |
|---|---|---|
| `--bg` | `#282a36` | `#F0EEE6` |
| `--card` | `#44475a` | `#E3DACB` |
| `--font-col` | `#F0EEE6` | `#282a36` |
| `--accent` | `#d4821f` | `#d4821f` |
| `--cursor-col` | `#eaeaea` | `#1a1a1a` |

## Styling Rules

- **Tailwind** for layout and spacing (flex, gap, padding)
- **`var(--radius)`** for ALL border-radius — never hardcode px values for corners
- **CSS Modules** for component-scoped styles (e.g. `Button.module.css`)
- **Page CSS file** for anything Tailwind can't do: animations, 3D transforms, `::before`/`::after`
- **Always use CSS vars** for colors, fonts, spacing — never hardcode values

## Components

- `AuthorProfile` — sidebar avatar, name, bio, social links
- `ThemeToggle` — sun/moon SVG toggle, persists to localStorage
- `Typewriter` — looping typewriter animation
- `ImageGrid` — 3D flip image grid with hover zoom
- `Button` — arrow button (uiverse.io/Creatlydev/silly-cat-86 style); default bg = `--font-col`, hover = `--accent`

## Theme Toggle

- Dark is the **default** (no `data-theme` attribute on `<html>`)
- Light mode: `document.documentElement.setAttribute('data-theme', 'light')`
- Persisted to `localStorage` key `'theme'`
- Anti-flash script in `<head>` reads localStorage before first paint

## File Locations

- `app/layout.tsx` — root layout: sidebar + main content shell
- `app/page.tsx` — About page
- `app/publications/page.tsx` — Publications, reads from `content/publications/*.md`
- `app/globals.css` — global styles
- `app/about.css` — about-page animations
- `components/` — all reusable components
- `public/images/` — all images
- `public/files/` — CV PDF
- `public/project-page/` — static project HTML pages (e.g. khalasi.html)
- `public/project-static/` — CSS/JS for static project pages

## What NOT to do

- No hardcoded border-radius px values — use `var(--radius)` everywhere
- No hardcoded colour hex values outside `globals.css` variables
- No `<style>` blocks inside `.tsx` or layout files
- No duplicate CSS between `globals.css` and component/page CSS files
