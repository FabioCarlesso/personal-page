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
  - **`writing.html` is currently hidden** (no real posts yet): its nav link, footer link and the home "recent writing" section are commented out with a `writing: hidden until first post` marker, and the page is `noindex`. The file is kept intact — search that marker and uncomment to re-enable.
- Each page repeats the same `<head>` (fonts, favicons, Open Graph), sticky `.topbar`, and `.footer` shell — **keep these in sync when editing**.
- **`in production` block** — a three-card section listing the projects that have a public URL
  (`FightOssStreak` → `fos.fabiocarlesso.com`, `Carlesso Pilates` → `app.carlessopilates.com.br`,
  `Cartola Odds` → `cartola.fabiocarlesso.com`).
  It is duplicated in `index.html` (as `<section class="prod-section">`) and `work.html` (as
  `<div class="prod-inline">`, since that page already sits inside a `.container`) — **keep the two
  copies in sync**. The cards are `<article>`, not `<a>`, because each carries several links.
  Project status vocabulary: **`production` only when there is a public URL**, then `source`
  (code only), `study`, `archived`. The section subtitle deliberately carries **no product count**
  (it drifted twice), so adding a product means adding the card in both pages — nothing else in
  that block. `/work`'s `.filter-count` numbers, however, are hardcoded — update them when adding
  or removing a card.
- `css/tokens.css` — design tokens (color/type/spacing/radii). The contract: every value elsewhere must be `var(--fc-*)`, never a raw hex/px.
- `css/style.css` — all component and page styles + the responsive layer (breakpoints at `1024px` and `720px`).
- `js/site.js` — terminal typing animation, `/work` filter, mobile nav toggle, and client-side form handling. Every behaviour is guarded by element presence so the one file serves all pages. Honors `prefers-reduced-motion`.
- `assets/` — brand assets (logos, favicons, OG image). `images/` retains the original profile photo.

## i18n contract & check

Every translatable string lives in **two places**: the element's inline HTML in the page, and both dictionaries in `js/site.js`. Two consequences that have each already caused a bug:

- `applyLang()` assigns `el.innerHTML`, so `data-i18n` belongs **only on leaf text nodes** — on a container it wipes the child markup on every language switch.
- `js/site.js` is `defer`red, so the **inline HTML is what paints first**, and it is the only text a reader without JS ever sees. Changing a string means changing it in the HTML *and* in `en` *and* in `pt`.

Run this from the repo root before committing any copy change. It exits 1 on a key present in only one dictionary, a `data-i18n` with no translation, and inline HTML that drifted from the `en` value (keys defined but unused are printed as a note and do not fail — `proj.status.source` is deliberately kept for the status vocabulary):

```bash
python3 - <<'EOF'
import re, glob
js = open("js/site.js", encoding="utf-8").read()
en = js[js.index("    en: {"):js.index("    pt: {")]
pt = js[js.index("    pt: {"):]
entry = re.compile(r'^      "([^"]+)": (".*"|\'.*\'),?$', re.M)
unquote = lambda v: v[1:-1].replace('\\"', '"').replace("\\'", "'")
EN = {k: unquote(v) for k, v in entry.findall(en)}
PT = {k: unquote(v) for k, v in entry.findall(pt)}
norm = lambda s: re.sub(r"\s+", " ", s).strip()
errors, used = [], set()
for k in sorted(set(EN) ^ set(PT)):
    errors.append(f"key in only one dictionary: {k}")
for f in sorted(glob.glob("*.html")):
    src = open(f, encoding="utf-8").read()
    for m in re.finditer(r'<(\w+)[^>]*data-i18n="([^"]+)"[^>]*>(.*?)</\1>', src, re.S):
        key, inner, line = m.group(2), m.group(3), src[:m.start()].count("\n") + 1
        used.add(key)
        if key not in EN:
            errors.append(f"{f}:{line} key missing from dictionaries: {key}")
        elif norm(inner) != norm(EN[key]):
            errors.append(f"{f}:{line} [{key}] fallback out of sync"
                          f"\n    html: {norm(inner)[:90]}\n    dict: {norm(EN[key])[:90]}")
for k in sorted(set(EN) - used):
    print(f"note: key defined but unused: {k}")
print("\n".join(errors) if errors else f"i18n ok — {len(used)} keys, en/pt in parity, fallbacks in sync")
raise SystemExit(1 if errors else 0)
EOF
```

## Fonts & icons

- Google Fonts: **JetBrains Mono** (display/mono/headings), **IBM Plex Sans** (body), **IBM Plex Serif** (italic accents).
- Icons are inline SVGs (24×24 viewBox, 1.6 stroke, rounded caps) — no icon-font dependency.

## Conventions & easter eggs

- The `(fc)` brand mark always renders its parens in `--fc-green`.
- Intentional easter eggs (not typos): `42` / `[42]` (amber), the "Run, Fabio! Run!" footer glyph, terminal cursors, and `echo $ANSWER → 42`.
- The subscribe form (writing) is a client-side stub — search `TODO(deploy)` in `js/site.js` for where to wire a real endpoint.
- **The contact form is currently disabled**: it never sent email (client-side stub) and was misleading, so the terminal form on `contact.html` is commented out behind a `contact form: disabled until backend wired` marker and the grid uses the `contact-grid--solo` single-column variant. `contact.html` now offers email, GitHub and LinkedIn only. The `#contact-form` markup and its guarded `initContactForm` handler are kept intact — uncomment the block and drop `contact-grid--solo` after wiring a real endpoint.
