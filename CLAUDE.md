# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio page for Fabio Carlesso, deployed to a shared hosting server via FTP. There is no build step, no framework, and no package manager — the site is plain HTML and CSS served directly.

## Development

Open `index.html` directly in a browser to preview. There is no local dev server or build process.

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/main.yml`): every push to `main` triggers an FTP sync of all files to `public_html/` on the hosting server. The FTP credentials are stored as GitHub secrets (`ftp_host_personal_page`, `ftp_user_personal_page`, `ftp_password_personal_page`).

## Architecture

- `index.html` — single-page layout: profile photo, LinkedIn username, social icon links (GitHub, Instagram, LinkedIn), and a bio card that links to GitHub.
- `style.css` — all styles. Uses Google Fonts (Quicksand) and Font Awesome (via CDN kit). Responsive via two breakpoints: tablet (`≥600px`) and laptop (`≥1100px`). Accent color on hover is magenta.
- `images/` — profile photo and favicon files referenced directly from HTML.

Font Awesome icons are loaded from an external kit (`kit.fontawesome.com`); the kit ID is `52431911f6`.
