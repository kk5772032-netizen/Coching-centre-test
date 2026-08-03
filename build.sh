#!/usr/bin/env bash
# =============================================================================
#  Build script used by Vercel (and usable locally)
# =============================================================================
#  Which version gets published is controlled by one environment variable:
#
#      SITE=single   (default) -> the single-file index.html
#      SITE=astro              -> the multi-page Astro site
#
#  On Vercel: Project > Settings > Environment Variables > add SITE=astro
#  to switch. No file edits, no redeploy config needed.
#
#  Locally:   ./build.sh          or   SITE=astro ./build.sh
#             then open _site/index.html
#
#  Everything is written to _site/, and only _site/ is published — so the
#  README, the Apps Script source and the design preview stay out of the
#  public deploy.
# =============================================================================
set -euo pipefail

SITE="${SITE:-single}"
OUT="_site"

rm -rf "$OUT"
mkdir -p "$OUT"

case "$SITE" in
  single)
    echo "Building the single-file site..."
    cp index.html "$OUT/"
    # These are optional — copied only if present, so the build never breaks
    # just because one has not been created yet.
    for f in og.png robots.txt sitemap.xml; do
      [ -f "$f" ] && cp "$f" "$OUT/"
    done
    # Ship the photos folder if real photographs have been added.
    if [ -d photos ] && [ -n "$(find photos -type f ! -name 'README.md' -print -quit)" ]; then
      mkdir -p "$OUT/photos"
      find photos -type f ! -name 'README.md' -exec cp {} "$OUT/photos/" \;
    fi
    ;;

  astro)
    echo "Building the Astro site..."
    cd astro-site
    npm ci --no-audit --no-fund
    npm run build
    cd ..
    cp -r astro-site/dist/. "$OUT/"
    ;;

  *)
    echo "ERROR: SITE must be 'single' or 'astro' (got '$SITE')" >&2
    exit 1
    ;;
esac

echo "Done. $(find "$OUT" -type f | wc -l) file(s) in $OUT/"
