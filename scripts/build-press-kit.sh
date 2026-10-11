#!/usr/bin/env bash
# Rebuild the press-kit downloads linked from press.html:
#   press/fabio-carlesso-press-kit-en.pdf   press-kit PDF, printed from press.html?lang=en
#   press/fabio-carlesso-press-kit-pt.pdf   press-kit PDF, printed from press.html?lang=pt
#   press/fabio-carlesso-press-kit.zip      PDFs + logos (svg, png @4x) + headshot + bios + README
#
# Run from the repo root after changing press.html, the bios in js/site.js or
# any logo in assets/. Needs google-chrome (or $CHROME), python3 and zip, and
# network access for Google Fonts. Commit the regenerated files in press/.
set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$PWD"
CHROME="${CHROME:-google-chrome}"
NAME="fabio-carlesso-press-kit"
OUT="$ROOT/press"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
KIT="$WORK/$NAME"
mkdir -p "$OUT" "$KIT/logos/svg" "$KIT/logos/png" "$KIT/photo" "$KIT/bio"

chrome() { "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-pdf-header-footer "$@" 2>/dev/null; }

echo "› pdfs"
for lang in en pt; do
  chrome --virtual-time-budget=8000 --print-to-pdf="$OUT/$NAME-$lang.pdf" "file://$ROOT/press.html?lang=$lang"
  cp "$OUT/$NAME-$lang.pdf" "$KIT/"
done

echo "› logos"
for svg in "$ROOT"/assets/logo-*.svg; do
  base="$(basename "$svg" .svg)"
  cp "$svg" "$KIT/logos/svg/"
  w=$(grep -o ' width="[0-9.]*"' "$svg" | head -1 | grep -o '[0-9.]*')
  h=$(grep -o ' height="[0-9.]*"' "$svg" | head -1 | grep -o '[0-9.]*')
  W=$(( ${w%.*} * 4 )); H=$(( ${h%.*} * 4 ))
  printf '<html><body style="margin:0"><img src="%s" style="display:block;width:%dpx;height:%dpx"></body></html>' \
    "file://$svg" "$W" "$H" > "$WORK/$base.html"
  chrome --default-background-color=00000000 --window-size="$W,$H" \
    --screenshot="$KIT/logos/png/$base@4x.png" "file://$WORK/$base.html"
done

echo "› headshot + bios"
cp "$ROOT/images/fabio-carlesso-photo.jpeg" "$KIT/photo/fabio-carlesso.jpg"
python3 - "$ROOT/js/site.js" "$KIT/bio" <<'PY'
import html, re, sys
js, out = open(sys.argv[1], encoding="utf-8").read(), sys.argv[2]
entry = re.compile(r'^      "(press\.bio\.(?:one|short|long\.p\d))": "(.*)",?$', re.M)
for lang, start, end in (("en", "    en: {", "    pt: {"), ("pt", "    pt: {", None)):
    block = js[js.index(start):js.index(end) if end else None]
    b = {k: html.unescape(v.replace('\\"', '"')) for k, v in entry.findall(block)}
    long_ = "\n\n".join(b[k] for k in sorted(b) if k.startswith("press.bio.long"))
    with open(f"{out}/bio-{lang}.md", "w", encoding="utf-8") as f:
        f.write(f"# Fabio Carlesso — bio ({lang})\n\n## one-liner\n\n{b['press.bio.one']}\n\n"
                f"## short\n\n{b['press.bio.short']}\n\n## long\n\n{long_}\n")
PY

cat > "$KIT/README.md" <<'MD'
# Fabio Carlesso — press kit

Free to use as is, for recruiters, event organisers and podcast hosts.
Latest version: https://fabiocarlesso.com/press.html

| folder | contents |
| --- | --- |
| `*.pdf` | the press kit as PDF, English and Portuguese |
| `bio/` | bios in three lengths (one-liner, short, long), `en` and `pt` |
| `photo/` | headshot — crop freely; don't filter, recolour or distort |
| `logos/svg/` | vector logos, text outlined to paths (no fonts needed) |
| `logos/png/` | the same logos at 4×, transparent background |

## Which logo

- `logo-fc` — primary, on dark surfaces · `logo-fc-light` — primary, on light surfaces
- `logo-fc-on-accent` — on the blue accent · `logo-stacked` — square spaces · `logo-wordmark` — banners, slides
- `logo-fc-mono-white` / `logo-fc-mono-ink` — one-colour use (dark / light)
- `logo-42` — the easter egg; never the primary mark

## Rules

- Do keep the parens of (fc) in signal blue `#58A6FF` on every colour variant.
- Do leave clear space around the mark of at least one paren's width.
- Don't recolour, stretch, rotate or add effects; don't retype (fc) in another typeface.

## Palette

| name | hex | use |
| --- | --- | --- |
| ink | `#0A0D10` | background |
| ink-2 | `#11161B` | cards, panels |
| blue | `#58A6FF` | accent · the parens |
| amber | `#E3B341` | 42 · highlights |
| rust | `#C8602A` | rare warm accent |
| paper | `#F5F1EA` | light surfaces |
| bone | `#FAFAF7` | text on dark |

Type: JetBrains Mono (display, headings, code) · IBM Plex Sans (body) · IBM Plex Serif italic (accents).
All three are free on Google Fonts.

## Contact

fabio.carlesso@gmail.com · linkedin.com/in/fabio-carlesso · github.com/FabioCarlesso
MD

echo "› zip"
rm -f "$OUT/$NAME.zip"
(cd "$WORK" && zip -qr -X "$OUT/$NAME.zip" "$NAME")
ls -la "$OUT"
