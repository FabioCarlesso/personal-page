# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio for Fabio Carlesso, deployed to a shared hosting server via FTP. There is no build step, no framework, and no package manager — the site is plain HTML/CSS plus one vanilla-JS file, served directly. It implements the **`(fc)` design system**: a dark-first, terminal-flavoured technical brand.

## Development

Open any `.html` file directly in a browser to preview. There is no local dev server or build process.

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/main.yml`): every push to `main` triggers an FTP sync of all files to `public_html/` on the hosting server. There is no build — what's committed is what ships. The FTP credentials are stored as GitHub secrets (`ftp_host_personal_page`, `ftp_user_personal_page`, `ftp_password_personal_page`). The `handoff/` design bundle is git-ignored and never deployed.

## Architecture

Multi-page static site — one `.html` per route (no client-side router, so deep links and SEO work on plain FTP hosting):

- `index.html` (home), `work.html`, `about.html`, `writing.html`, `contact.html`.
- Each page repeats the same `<head>` (fonts, favicons, Open Graph), sticky `.topbar`, and `.footer` shell — **keep these in sync when editing**.
- `css/tokens.css` — design tokens (color/type/spacing/radii). The contract: every value elsewhere must be `var(--fc-*)`, never a raw hex/px.
- `css/style.css` — all component and page styles + the responsive layer (breakpoints at `1024px` and `720px`).
- `js/site.js` — terminal typing animation, `/work` filter, mobile nav toggle, and client-side form handling. Every behaviour is guarded by element presence so the one file serves all pages. Honors `prefers-reduced-motion`.
- `assets/` — brand assets (logos, favicons, OG image). `images/` retains the original profile photo.

## Fonts & icons

- Google Fonts: **JetBrains Mono** (display/mono/headings), **IBM Plex Sans** (body), **IBM Plex Serif** (italic accents).
- Icons are inline SVGs (24×24 viewBox, 1.6 stroke, rounded caps) — no icon-font dependency.

## Conventions & easter eggs

- The `(fc)` brand mark always renders its parens in `--fc-green`.
- Intentional easter eggs (not typos): `42` / `[42]` (amber), the "Run, Fabio! Run!" footer glyph, terminal cursors, and `echo $ANSWER → 42`.
- Both forms (contact, subscribe) are client-side stubs — search `TODO(deploy)` in `js/site.js` for where to wire real endpoints.
