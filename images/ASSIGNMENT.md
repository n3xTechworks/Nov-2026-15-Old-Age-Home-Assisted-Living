# Image assignment: Thymewood Garden Residence

Page builders must follow this file exactly. **Every photo appears once in this file, and the site may use each
photo only once** (the QA script treats `-160`, `-800` and `-1600` variants of a photo as the same photo).
If you need a photo that is not listed for your page, take it from "Unassigned spares" at the bottom, move the
line to your page here, and never reuse a photo listed for another page.

File naming: scenes have `images/<name>-800.webp` and `images/<name>-1600.webp`; portraits have
`images/<name>-160.webp` (square, for round avatars up to 80px) and `images/<name>-800.webp` (full photo, for tall
frames). Use `-1600` only for full-width heroes (with `srcset` 800w/1600w). Card images use `-800`.
Always put `width`/`height` (the real pixel size of the file you reference), `alt`, and `loading="lazy"` below the fold.
Exact alt texts and pixel sizes are in `/images/CREDITS.md` and the library manifest; sizes of every `-800` file
are listed at the end of this file.

Library notes to respect:
- **care-home-shoot** photos (same care home, some residents and staff recur): marked `[CH]`. Never place two `[CH]`
  photos side by side or in the same card row / gallery row.
- **living-room-shoot** (same three friends): marked `[LR]`. The two `[LR]` photos are on different pages.
- **Portrait-shaped** photos (taller than wide) are marked `[tall]`: only use them in tall frames (e.g. 3/4 or 4/5
  aspect, split-layout side images with a tall frame, avatar crops via `-160`). Never in a 3/2 card frame.

---

## 1. Page heroes (7)

Inner-page heroes (About, Facilities, Care Services, Blog, Contact) share one system in `css/site.css` ("Client revision 4"):
same height per breakpoint, photo edge to edge, one even dark tint, white text. Privacy and Terms use the same hero box in a
plain brand-green variant (no photo). Every hero photo has `-800`, `-1600` and `-2000` files.

| Page | Hero photo | Notes |
|---|---|---|
| `index.html` (Home 1) | `courtyard-garden-with-residents` | Home hero variant. object-position center 60% |
| `home-2.html` (Home 2) | `family-visit-around-dining-table` | Home hero variant (different copy/layout) |
| `about.html` | `residence-exterior-lawn-and-pathway` | inner-page hero |
| `facilities.html` | `sunlit-lounge-with-fireplace` | inner-page hero |
| `care-services.html` | `blood-pressure-check` | inner-page hero (revision 4: no faces behind the centred text; object-position center 45%) |
| `blog.html` | `tea-tray-with-journal-and-teapot` | inner-page hero (revision 4: sharp replacement for the soft lane photo) |
| `contact.html` | `rose-pergola-garden-walk` | inner-page hero (revision 4: faces no longer sit behind the heading) |

## 2. Home 1 (`index.html`): built by the foundation

| Section / slot | Photo |
|---|---|
| Welcome split image | `residents-admire-peonies-in-garden` |
| Facilities card 1: Suites (`facilities.html#suites`) | `bright-suite-with-writing-desk` (a room, no person) |
| Facilities card 2: Dining (`#dining`) | `dining-room-with-garden-view` |
| Facilities card 3: Gardens (`#gardens`) | `rose-garden-winding-path` |
| Facilities card 4: Activities (`#activities`) | `residents-choir-singing` |
| Care card 1: Nursing (`care-services.html#nursing`) | `nurse-shares-smile-with-resident` [CH] |
| Care card 2: Memory care (`#memory-care`) | `residents-share-photo-album` [LR] |
| Care card 3: Daily living (`#daily-living`) | `preparing-a-meal-together-kitchen` |
| Care card 4: Therapy (`#therapy`) | `physiotherapy-session-senior-gym` |
| Testimonial 1 (resident) Margaret Ellison | `portrait-older-woman-white-hair-scarf` (-160) |
| Testimonial 2 (resident) Frank Doherty | `portrait-older-man-cap-smiling` (-160) |
| Testimonial 3 (family) Linda Okafor | `portrait-older-woman-grey-curls` (-160) |
| Journal teaser → `blog.html#post-1` cover | `grandmother-and-granddaughter-hug` |
| Journal teaser → `blog.html#post-2` cover | `seated-dance-exercise-class` |
| Journal teaser → `blog.html#post-3` cover | `friends-gardening-together` |

Journal teasers on Home 1 show the **same author names/roles** as blog posts 1–3, but with an initials monogram
(`.author-initials`), not the photo, so that no author photo appears twice on the site. The author photos live on
`blog.html` only.

## 3. Home 2 (`home-2.html`): reserved

| Slot | Photo |
|---|---|
| Hero | `family-visit-around-dining-table` (see section 1) |
| Feature / "a day at Thymewood" image A | `social-afternoon-in-lounge` [CH] |
| Feature image B | `art-class-conversation` |
| Feature image C | `knitting-circle-with-caregiver` [CH] (not next to image A) |
| Seasonal feature (tall frame) | `grandfather-opens-christmas-gift` [tall] |
| Testimonial 1 (resident) Joan Whitfield | `portrait-older-woman-purple-gilet` (-160) |
| Testimonial 2 (family) Peter Lindqvist, Son of resident | `portrait-older-man-glasses-green-polo` (-160) |
| Testimonial 3 (resident) Harold Greene | `portrait-older-man-veteran-cap` (-160) |

## 4. About (`about.html`): reserved

| Slot | Photo |
|---|---|
| Our story split image | `companionship-holding-hands` [CH] |
| Values / life here image | `couple-reading-in-library` |
| Community / celebrations image | `birthday-cake-celebration` |
| Leader 1: Elena Marlowe, Registered Manager | `portrait-care-manager-white-blazer` [tall] (-800 in a tall 4/5 frame, or -160) |
| Leader 2: Dr Arjun Mehta, Medical Lead (visiting GP) | `portrait-physician-stethoscope` [tall] |
| Leader 3: Sofia Reyes, Head of Nursing | `portrait-nurse-teal-scrubs` [tall] |
| Leader 4: Abena Mensah, Head of Operations | `portrait-woman-glasses-black-blazer` [tall] |
| Resident testimonial: Rosemary Atkins | `portrait-older-woman-warm-smile` (-160; moved from spares) |

## 5. Facilities (`facilities.html`): reserved

| Section id | Photos |
|---|---|
| `#suites` | `private-bedroom-with-bedside-lamp`, `lounge-with-wood-stove-and-garden-views` |
| `#dining` | `tea-room-afternoon-tea-stand` |
| `#gardens` | `garden-arbour-brick-path` [tall] |
| `#activities` | `craft-room-table-supplies`, `library-reading-room` [tall], `couple-playing-cards` |
| `#wellness` | `hydrotherapy-pool-with-garden-view`, `fitness-studio-with-treadmills`, `hair-salon-barber-chair`, `chapel-quiet-room-garden-windows` (very wide 1600x720: use in a wide frame) |

## 6. Care Services (`care-services.html`): reserved

| Section id | Photos |
|---|---|
| `#nursing` | `doctor-check-up-conversation`, `weekly-medication-organiser` (`blood-pressure-check` moved to the page hero) |
| `#memory-care` | `caregiver-colouring-with-couple` [CH] |
| `#daily-living` | `carer-wellbeing-chat` [CH] (not adjacent to the memory-care [CH] image: keep them in different sections with text between) |
| `#therapy` | `mobility-walk-with-rollator` |
| `#respite` | `cafe-outing-with-friends` |

## 7. Blog (`blog.html`): 7 covers + 7 unique authors

Each post section/card has `id="post-N"`. Featured = post-1; the 3 x 2 grid = posts 2–7.

| Post | Category | Cover | Author (name, role) | Author photo (-160) |
|---|---|---|---|---|
| post-1 (featured) | Family guide | `moving-boxes-and-houseplants` | Carmen Ruiz, Admissions & Settling-in Nurse | `portrait-nurse-navy-scrubs` |
| post-2 | Staying active | `seniors-playing-badminton` | Hannah Doyle, Activities Coordinator | `portrait-activity-coordinator-cardigan` |
| post-3 | Resident voices | `watering-plants-in-garden` | Walter Brennan, Resident, Kitchen Garden Club | `portrait-older-man-white-beard-red-hat` |
| post-4 | Nutrition | `nutritious-plate-eggs-and-greens` | Marco Bellini, Head Chef | `portrait-man-grey-sweater` |
| post-5 | Memory care | `friends-doing-jigsaw-puzzle` [LR] | Dr Priya Nair, Dementia Care Lead | `portrait-doctor-in-garden` |
| post-6 | Staying connected | `woman-using-smartphone-in-garden` (square: fine in a cover frame with object-fit) | Laura Kent, Family Liaison | `portrait-woman-plaid-blazer` |
| post-7 | Outings | `couple-on-bench-overlooking-sea` | Dorothy Hale, Resident, Outings Committee | `portrait-older-woman-pink-blouse` |

Suggested titles (posts 1–3 are already used by the Home 1 teasers, keep them identical):
1. "Settling in: a gentle guide to the first month" (14 Oct 2026)
2. "Small movements, big gains: staying active after eighty" (30 Sep 2026)
3. "A year in the kitchen garden" (12 Sep 2026)

## 8. Contact (`contact.html`): reserved

| Slot | Photo |
|---|---|
| Hero | `rose-pergola-garden-walk` (see section 1) |
| "Your visit host" card avatar: Daniel Osei, Visits & Admissions | `portrait-male-nurse-blue-scrubs` (-160) |

## 9. Unassigned spares

Revision 4 freed these hero photos (files stay in `images/`, used nowhere on the site):
`caregiver-supports-resident-with-walker` [CH], `couple-walking-arm-in-arm-tree-lined-lane`, `couple-waving-hello-in-lounge` [CH].

In the library only, NOT copied to `images/`:

Copy from the library if needed, then move the line into your page's section above:
`portrait-doctor-glasses-white-coat`, `portrait-young-doctor-white-coat`,
`portrait-older-man-suspenders`.

## 10. Pixel sizes of the `-800` files (use these for width/height)

Scenes 800 x 533 unless listed: bright-suite 800x534, caregiver-colouring 800x566, carer-wellbeing-chat 800x566,
chapel 800x360, couple-on-bench 800x534, dining-room 800x534, doctor-check-up 800x521, fitness-studio 800x450,
friends-doing-jigsaw 800x450, friends-gardening 800x532, garden-arbour 533x800, grandfather-christmas 533x800,
grandmother-hug 800x450, knitting-circle 800x566, library-reading-room 533x800, lounge-wood-stove 800x534,
mobility-walk 800x534, moving-boxes 800x530, nurse-shares-smile 800x566, nutritious-plate 800x544,
preparing-a-meal 800x534, residence-exterior 800x529, residents-share-photo-album 800x450, birthday-cake 800x531,
sunlit-lounge 800x534, watering-plants 800x640, woman-using-smartphone 800x800.
`-1600` files are exactly 2x (e.g. 1600x1066). Portrait `-160` files are 160x160.
Portrait `-800`: activity-coordinator 556x800, care-manager 533x800, doctor-in-garden 533x800, male-nurse 640x800,
man-grey-sweater 534x800, nurse-navy 566x800, nurse-teal 533x800, white-beard-red-hat 533x800, pink-blouse 533x800,
physician 623x800, woman-glasses-black-blazer 533x800, woman-plaid-blazer 533x800; older landscape portraits 800x533
(white-hair-scarf 800x527).
