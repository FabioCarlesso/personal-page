# Fabio Carlesso — Personal Page

Static personal portfolio, live at **[fabiocarlesso.com](https://fabiocarlesso.com)**.
Built on the **`(fc)` design system** — a dark-first, terminal-flavoured technical brand.

## Stack

Plain HTML, CSS and a single vanilla-JS file — no framework, no build step, no package manager.

| Path | Purpose |
|---|---|
| `index.html` | Home — hero with animated terminal, tech marquee, featured work, about preview, hire-me CTA |
| `work.html` | Project gallery with client-side filter + Cartola Odds case study |
| `about.html` | Long-form bio, career timeline, certifications grid |
| `writing.html` | Blog index (sample posts) + subscribe block — **currently hidden** (no nav/footer/home links, `noindex`) until the first real post |
| `contact.html` | Contact methods + terminal-styled form |
| `css/tokens.css` | Design tokens (colors, type, spacing, radii) — the contract. Every value elsewhere is `var(--fc-*)` |
| `css/style.css` | All component + page styles, responsive layer |
| `js/site.js` | Terminal typing animation, `/work` filter, mobile nav, client-side form handling |
| `assets/` | Brand assets — logos, favicons, OG image |
| `images/` | Original profile photo (retained) |

External dependencies loaded via CDN:
- **Google Fonts** — JetBrains Mono (display/mono), IBM Plex Sans (body), IBM Plex Serif (italic accents)

## Conventions

- **Tokens are the contract.** Use `var(--fc-...)` for color/type/spacing — never hardcode hex/px outside `tokens.css`.
- **Multi-page, no router.** Each page is a standalone `.html` so deep links and SEO work on plain FTP hosting.
- The TopBar/Footer shell and `<head>` (fonts, favicons, OG) are repeated per page; keep them in sync when editing.
- `js/site.js` guards every behaviour by element presence, so one file serves all pages.

## Local preview

Open any `.html` file directly in a browser. No server needed.

## Deployment

Every push to `main` triggers a GitHub Actions workflow (`.github/workflows/main.yml`) that FTP-syncs all files to `public_html/` on the hosting server. There is no build — what's in the repo is what ships. (`handoff/` is git-ignored and never deployed.)

Secrets required in the repository settings:

| Secret | Description |
|---|---|
| `ftp_host_personal_page` | FTP server hostname |
| `ftp_user_personal_page` | FTP username |
| `ftp_password_personal_page` | FTP password |

## TODO before / after launch

- **Contact form** is a client-side stub. Wire `#contact-form` in `js/site.js` to a real endpoint (e.g. Formspree) — see the `TODO(deploy)` marker.
- **Subscribe form** likewise needs a newsletter provider.
- Sample blog posts and project copy are placeholders — replace with real content.
- **Writing is hidden** until the first real post. The page file is kept; its nav link, footer link and the home "recent writing" section are commented out and `writing.html` is `noindex`. To re-enable, search `writing: hidden until first post` across the HTML and uncomment those blocks.
