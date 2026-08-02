# Shikhar Academy — coaching institute website

A single self-contained `index.html`. No build step, no npm, no framework.
Double-click the file and it opens. Everything is inline except Google Fonts
and the Google Maps embed.

> **There are two versions in this repo.** This README covers the shipped
> single-file site. `astro-site/` holds a working multi-page rewrite for when
> the client commits to per-exam landing pages and a blog — see
> [`astro-site/README.md`](astro-site/README.md). Both build from the same
> design; use whichever suits the client's scope.

- **Page weight:** ~87 KB raw, ~22 KB gzipped (plus ~50 KB of fonts on first load)
- **Tested at:** 360px, 768px, 1024px, 1440px — no horizontal overflow at any width
- **Works with JavaScript disabled** for all content; JS only enhances (menu, form, reveals)

---

## 1. Placeholders you must replace with real client data

Every value below is invented. Nothing here is real — replace all of it before
the site goes live, especially the result claims.

### Critical — legal / trust risk if left as is

| What | Current placeholder | Where |
|---|---|---|
| Institute name | Shikhar Academy | `CONFIG.name`, `<title>`, JSON-LD, header, footer |
| Phone / WhatsApp | +91 98712 34567 | `CONFIG.phone`, `CONFIG.whatsapp`, JSON-LD, footer |
| Email | admissions@shikharacademy.in | `CONFIG.email`, JSON-LD, footer |
| Full address | 2nd Floor, Batra Complex, 1573 Outram Lines, Dr Mukherjee Nagar, Delhi – 110009 | `CONFIG.addressLine1/2`, JSON-LD, Location section, footer |
| Geo coordinates | 28.7062, 77.2103 | JSON-LD `geo` |
| **All result claims** | 47 selections, AIR 61, 28% selection rate, 310+ total, 4,200+ students | Hero proof panel, Results section stats |
| **All topper names + ranks** | Deepak Kumar AIR 61, Priya Nautiyal AIR 143, Mohd Arif AIR 208, Ritu Chauhan, Sandeep Rathi AIR 402, Neha Bisht | Results section (6 cards) |
| Facility claims | Five classrooms, reading room open till 9 PM, separate test hall | "Inside the centre" section |
| **All faculty** | Rajeev Ranjan, Sunita Rawat, Amit Kumar Yadav, Praveen Sharma — names, credentials, quotes | Faculty section (4 cards) |
| **All testimonials** | 4 quotes | Testimonials section |
| Google rating | 4.7★ / 312 reviews | Hero trust strip, JSON-LD `aggregateRating` |

> Publishing invented selection figures, ranks, student names or a fake Google
> rating is a real legal exposure (ASCI / Consumer Protection Act 2019 rules on
> misleading educational advertising). Only publish numbers the institute can
> evidence with score cards.

### Also replace

- **All photographs** — every image on the page is an illustrated SVG placeholder.
  See `photos/README.md` for the exact list of files to supply, the sizes, and
  the swap instructions. In short: faculty portraits 1:1, topper cards ~230×180,
  centre gallery 4:3. Search `index.html` for `HOW TO PUT` to find the three
  instruction blocks.
- **Google Map** — the iframe currently points at the Mukherjee Nagar area, not a
  specific building. Get the real one from Google Maps → Share → *Embed a map* →
  copy the `src`. Update the "Get Directions" link too.
- **Social links** — YouTube / Instagram / Facebook URLs in the footer and in JSON-LD `sameAs`.
- **Canonical + Open Graph URLs** — `https://www.shikharacademy.in/` in five places.
- **Fee amounts, batch timings, course inclusions** — all six course cards.
- **Refund policy, PG list, discount percentages** — the FAQ answers state specific
  terms (₹1,000 admin charge, 7/21-day windows, 10% sibling discount). Confirm these
  match what the institute actually offers, or the FAQ becomes a promise it can't keep.
- **Domain in the footer copyright line.**

---

## 2. How to change the batch-start date and the fees

Open `index.html`, scroll to the `<script>` block near the bottom and find the
block marked `★★★ CONFIG — EDIT EVERYTHING HERE ★★★`.

### Batch start date (do this every admission cycle)

```js
batchName:      "SSC CGL 2026 Foundation",
batchStartDate: "12 August 2026",
seatsLeft:      14,
```

`batchStartDate` is applied to the orange banner under the hero automatically.
`batchName` and `seatsLeft` are also written in the banner markup — search the
file for `New <b>SSC CGL 2026 Foundation</b>` and edit the text there so the
banner still reads correctly when JavaScript is off.

### Fees

```js
fees: {
  cgl:     "₹45,000",
  chsl:    "₹26,000",
  police:  "₹22,000",
  booster: "₹18,000",
  online:  "₹19,500",
  weekend: "₹24,000"
}
```

These overwrite the big fee figure on each course card. The instalment line next
to it ("or 3 instalments of ₹15,500") is plain text in the card — search for
`class="note"` and update it to match. The summary line under the grid
("Fee range: ₹18,000 – ₹45,000") is also plain text.

### Anything else

`CONFIG` also drives the phone number, WhatsApp number and email everywhere on
the page — every `tel:`, `mailto:` and `wa.me` link is rebuilt on load. Because
the page must work without JavaScript, those values are *also* hardcoded in the
HTML as defaults. If you change one in `CONFIG`, search the file for the old
value and update the visible text too.

---

## 3. Hosting and rough annual cost

**Recommended: Cloudflare Pages or Netlify — free tier.**
It's one static file. Drag the folder into the dashboard, connect the domain,
done. Free SSL, global CDN (important — most visitors are on patchy 4G), and no
server to keep patched.

| Item | Provider | Cost per year (INR) |
|---|---|---|
| Hosting | Cloudflare Pages / Netlify / GitHub Pages free tier | ₹0 |
| Domain `.in` | BigRock / GoDaddy / Cloudflare Registrar | ₹700 – ₹1,200 |
| Domain `.com` | same | ₹1,000 – ₹1,500 |
| Business email (optional) | Zoho Mail free (5 users) | ₹0 |
| Business email (paid) | Google Workspace, 1 user | ₹1,800 – ₹2,400 |
| **Realistic total** | | **₹700 – ₹1,200/yr**, or ~₹3,000/yr with Google Workspace |

**Also worth doing, all free:**
- Google Business Profile — for a Mukherjee Nagar institute this drives more
  walk-ins than the website itself. The JSON-LD on this page is written to match it.
- Google Search Console — submit the domain so the site gets indexed.
- Compress faculty/topper photos to WebP under 60 KB each before uploading.

**Skip shared cPanel hosting** (Hostinger/GoDaddy at ₹1,500–₹3,000/yr). It is
slower than a CDN, needs renewal management, and buys nothing for a static page.

---

## Notes on three deliberate choices

- **Every image is an illustrated SVG, not a photograph.** No real photos were
  available, and putting stock photos of strangers under named toppers would
  fabricate exactly the records that the Consumer Protection Act 2019 and ASCI's
  education guidelines prohibit. The illustrations are unmistakably drawings, so
  they make no false claim while the client gathers real photos — and every slot
  is sized and commented to take an `<img>` drop-in. See `photos/README.md`.

- **Icons are inline SVG, not a CDN icon font.** The brief allowed one icon CDN,
  but an icon font is an extra blocking request and 40–70 KB for the handful of
  icons used here. Inline SVG keeps the page working offline and on a stalled
  connection.
- **The FAQ uses native `<details>`/`<summary>`** rather than custom JS, so it is
  keyboard-operable and fully functional with JavaScript disabled.
