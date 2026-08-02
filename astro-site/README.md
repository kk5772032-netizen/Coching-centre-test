# Astro version — phase two scaffold

The same site, restructured so it can grow past one page. Builds to plain
static HTML, so hosting stays free and the page stays fast on 4G.

**Status: working and verified.** `npm run build` produces 10 pages. Every
route was checked at 360px and 1440px, with JavaScript disabled, and against
the same tap-target and overflow rules as the single-file version.

The original `../index.html` still works and is untouched. Use whichever suits
the client — see "Should you actually switch?" at the bottom.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve dist/ locally
```

Requires Node 18+. Nothing else.

---

## What this fixes

The single-file version had one structural flaw: because the page must work
with JavaScript disabled, every value existed **twice** — once in the `CONFIG`
object and once hardcoded in the HTML. Change the phone number in one place and
forget the other, and the site quietly shows a wrong number.

Here, `src/site.config.ts` is the only place any of it lives. It is read at
build time and rendered into static HTML, so there is nothing to keep in sync
and no JavaScript needed at runtime.

---

## Where to change things

| To change | Edit |
|---|---|
| Phone, WhatsApp, email, address, timings | `src/site.config.ts` |
| **Batch start date, seats left** | `src/site.config.ts` → `admission` |
| Headline numbers (selections, rating) | `src/site.config.ts` → `stats` |
| FAQ, testimonials, "why choose us" | `src/site.config.ts` |
| Navigation links | `src/site.config.ts` → `nav` |
| A course, its fee, its landing page | `src/content/courses/*.md` |
| A faculty member | `src/content/faculty/*.md` |
| A topper | `src/content/toppers/*.md` |
| A blog post | `src/content/posts/*.md` |
| Colours, type, spacing | `src/styles/global.css` (top of file) |
| Domain | `astro.config.mjs` → `site` |

### Adding a course

Create `src/content/courses/new-batch.md`:

```markdown
---
title: New Batch Name
exam: SSC CGL · Tier 1
targetExam: SSC CGL
duration: 8 months
timing: 4:00 PM – 6:30 PM
mode: Offline
fee: 28000
instalments: or 2 instalments of ₹14,500
order: 7
inclusions:
  - First thing included
  - Second thing included
seoTitle: The <title> for this course's own page
seoDescription: The meta description for this course's own page.
intro: One or two sentences shown under the heading.
---

Long-form content goes here as normal Markdown.
```

That single file produces the card on the homepage **and** its own landing page
at `/courses/new-batch/`, with its own title, meta description and `Course`
schema. Nothing else needs touching.

---

## Why the schemas matter

`src/content.config.ts` defines what fields each content type must have. If
someone deletes a fee or misspells a field, `npm run build` **fails with a clear
message** naming the file — instead of publishing a broken page.

This is not theoretical. While building this, an empty `post:` line in
`toppers/ritu-chauhan.md` failed the build with:

```
[InvalidContentEntryDataError] toppers → ritu-chauhan data does not match
collection schema. post: Expected type "string", received "object"
```

That is the safety net that makes it reasonable to let a non-developer edit
content.

---

## What was added beyond the single-file version

- **Six course landing pages** — `/courses/<slug>/`, each with its own SEO title,
  meta description and `Course` JSON-LD. This is the SEO payoff: one page per
  exam term instead of one page trying to rank for all of them.
- **A blog** — `/blog/` plus a page per post, with `BlogPosting` schema. Two
  sample posts included, written as real examples rather than lorem filler.
- **`sitemap-index.xml`**, generated automatically at build.
- **`robots.txt`** in `public/`.
- **`og:image`** meta tag — missing from the single-file version, which meant
  links shared on WhatsApp rendered as a bare grey box. **You still need to add
  the actual image**: put a 1200×630 PNG at `public/og.png`.
- **Stretched-link cards** — the whole course card and blog card is the tap
  target, not just the title text.

---

## Deploy

Cloudflare Pages or Netlify, free tier:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18 or higher

Same ₹0 hosting as the single file. Set the real domain in `astro.config.mjs`
so the canonical tags and sitemap are correct.

---

## Next step: give the client a login

The structure is CMS-ready but **no CMS is wired up yet** — that is deliberate,
because it needs OAuth credentials that depend on where you host.

Decap CMS or Sveltia CMS (both free) read the same folder structure and can
generate edit forms from the collection schemas. The client logs in, edits the
batch date or adds a topper through a web form, and the site rebuilds itself.
Budget half a day including the OAuth setup.

---

## Still outstanding

Carried over from the single-file version and **not** fixed here:

- **Leads still only go to WhatsApp.** If the student closes the tab without
  pressing send, the enquiry is lost. This remains the highest-value fix.
- **No analytics.** No way to prove the site produces enquiries.
- **Map is still a full iframe**, not a click-to-load facade — it is the
  heaviest thing on the page.
- **`public/og.png` does not exist yet.** The meta tag points at it.
- **All content is still invented** — see `../README.md` for the full list of
  placeholders and the note on publishing result claims.

---

## Should you actually switch?

Not yet, if the client only ever wants one page. The single file is faster to
deploy, has no build step, and cannot break.

Switch when you commit to the per-exam pages and the blog — which is the work
that actually earns organic traffic in this market. At that point the shared
header, footer and config stop being a convenience and start being the thing
that prevents mistakes.
