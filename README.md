# Fabio Carlesso — Personal Page

Static personal portfolio page, live at **[fabiocarlesso.com](https://fabiocarlesso.com)**.

## Stack

Plain HTML and CSS — no framework, no build step, no package manager.

| File | Purpose |
|---|---|
| `index.html` | Single-page layout: profile photo, social links, bio card |
| `style.css` | All styles — responsive (600px / 1100px breakpoints), magenta accent on hover |
| `images/` | Profile photo and favicon |

External dependencies loaded via CDN:
- **Google Fonts** — Quicksand
- **Font Awesome** — icon kit `52431911f6`

## Local preview

Open `index.html` directly in a browser. No server needed.

## Deployment

Every push to `main` triggers a GitHub Actions workflow (`.github/workflows/main.yml`) that FTP-syncs all files to `public_html/` on the hosting server.

Secrets required in the repository settings:

| Secret | Description |
|---|---|
| `ftp_host_personal_page` | FTP server hostname |
| `ftp_user_personal_page` | FTP username |
| `ftp_password_personal_page` | FTP password |
