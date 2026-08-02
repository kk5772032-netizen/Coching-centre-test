# photos/

Drop the institute's real photographs here, then replace the matching
`<svg>…</svg>` placeholder in `index.html` with an `<img>` tag. Search
`index.html` for `HOW TO PUT` — there are three blocks of instructions,
one for each group below.

## Files to supply

### Inside the centre — 4:3 landscape, 1200×900, JPG under 120 KB

| Filename | What to shoot |
|---|---|
| `building.jpg` | The building from the street, signboard visible |
| `classroom.jpg` | A classroom with the batch in session, shot from the back |
| `reading-room.jpg` | The reading room / library with students working |
| `test-hall.jpg` | The test hall set up for a mock test |
| `reception.jpg` | The admission desk / reception counter |

### Faculty — square, 1:1, 400×400, JPG under 60 KB

| Filename | Who |
|---|---|
| `faculty/rajeev.jpg` | Quantitative Aptitude teacher |
| `faculty/sunita.jpg` | English teacher |
| `faculty/amit.jpg` | Reasoning teacher |
| `faculty/praveen.jpg` | General Studies teacher |

Crop tight to the head and shoulders, centred — the site applies a circular
mask, so anything in the corners is cut off.

### Toppers — landscape, roughly 230×180 (or 690×540 for retina), under 60 KB

| Filename | Who |
|---|---|
| `toppers/deepak.jpg` … one per card | Each selected student shown in the Results row |

## Rules that matter

1. **Toppers and testimonials: real students only, with written consent.**
   Get a signed one-line permission to use their name, photo, rank and year on
   the website. Keep the score card on file — if a claim is ever challenged,
   that is what defends it. Publishing invented or stock-photo "toppers" is a
   misleading advertisement under the Consumer Protection Act 2019 and ASCI's
   education guidelines.
2. **Faculty: the teacher's own photo, with their permission.** Not a stock
   portrait — students recognise their teachers, and a fake one is noticed fast.
3. **No stock photos of strangers presented as the institute's own classroom or
   students.** A photo of the actual (even modest) centre converts better than a
   glossy stock library, because parents are checking whether the place is real.
4. **Compress before uploading.** Most visitors are on mid-range Android phones
   on 4G. Run every file through squoosh.app or tinypng.com and keep the whole
   page under 500 KB. WebP is better than JPG if the client's tooling supports it.
5. **Always keep the `width` and `height` attributes** on the `<img>` tag. They
   reserve the space so the page does not jump around while photos load.
6. **Write a real `alt` description** for each photo — it is what a screen reader
   announces and what Google reads.

Until real photos arrive, the illustrated SVG placeholders in `index.html` are
safe to leave in place: they are clearly drawings, so they claim nothing false.
