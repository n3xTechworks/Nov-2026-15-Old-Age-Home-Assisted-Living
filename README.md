# Thymewood Garden Residence: Website 15 (Old Age Home & Assisted Living)

A static, frontend-only website (HTML, CSS, vanilla JavaScript) for a fictional assisted-living residence.
There is no backend, no login and no real data. Forms are validated in the browser only.

## Pages

| File | Page |
|---|---|
| `index.html` | Home 1: hero, welcome, facilities preview, promises (green band), care services, testimonials, journal, visit CTA |
| `home-2.html` | Home 2: family-focused home page (different content) |
| `about.html` | About: story, timeline, values, leadership team |
| `facilities.html` | Facilities: `#suites`, `#dining`, `#gardens`, `#activities`, `#wellness` |
| `care-services.html` | Care Services: `#nursing`, `#memory-care`, `#daily-living`, `#therapy`, `#respite` |
| `blog.html` | Blog: featured post + 3 x 2 grid, `#post-1` … `#post-7`, a unique author for each post |
| `contact.html` | Contact: `#visit-info`, visit booking form in `#book`, map, `#faq` |
| `privacy.html`, `terms.html` | Privacy Policy and Terms of Service (same inner-page hero, plain brand-green variant) |

Navigation: Home ▾ (Home 1, Home 2) · About · Facilities · Care Services · Blog · Contact, plus the "Book a Visit" CTA
(→ `contact.html#book`).

## Structure

```
css/site.css          shared design system: tokens (light/dark), base, header, heroes, components, footer
css/pages/<page>.css  page-specific additions
js/site.js            theme + RTL toggles (persisted), Home dropdown, mobile menu, anchor offset, footer year,
                      motion (scroll reveal, count-up, accordion open/close slide); only when html.motion is set (not under
                      prefers-reduced-motion or navigator.webdriver, so QA screenshots stay static)
js/validation.js      reusable form validator for every form[data-validate] (also exports pure functions for Node)
js/pages/<page>.js    page-specific behaviour
images/               WebP photos (-160 / -800 / -1600), CREDITS.md (Unsplash sources), ASSIGNMENT.md (which photo goes where)
favicon.svg
COMPONENTS.md         component guide: class names and markup for every shared component
tests/                unit tests, QA script and runner
```

Theme (`html[data-theme="light|dark"]`) and direction (`html[dir="ltr|rtl"]`) are stored in `localStorage`
(`tw-theme`, `tw-dir`) and applied by a tiny inline script in `<head>` before the first paint.

## Running the site

Open `index.html` in a browser, or serve the folder (for example `python3 -m http.server 8000`) and visit
http://localhost:8000/. Fonts load from Google Fonts (Literata and Atkinson Hyperlegible); everything else is local.

## Tests

```bash
node --test tests/validation.test.js   # unit tests for the validator (names, emails, phones, dates, required fields)
node tests/qa.cjs "$(pwd)"             # full-site QA in Chromium (add --quick for fewer widths)
bash tests/run-tests.sh                # both
```

`tests/qa.cjs` checks every page at 360–1440px in light/dark and LTR/RTL: nav order, logo link, exactly one visible
theme toggle / RTL toggle / CTA with matching height and radius, horizontal scroll, level card text rows, contrast,
image loading/alt/size, no photo used twice, internal links and ids, blog authors and covers, and the booking form
validation.

**Playwright note:** `tests/qa.cjs` requires Playwright from an absolute path on the original build machine:
`/private/tmp/claude-501/.../scratchpad/entwork/ctools/node_modules/playwright`. On any other machine run
`npm i -D playwright && npx playwright install chromium` in this folder and change the `require(...)` at the top of
`tests/qa.cjs` to `require('playwright')`.

## Credits

All photos are free-licence Unsplash photos; see `images/CREDITS.md`. The brand, people, address and phone number are
fictional.
