# Uri Gukbap 우리국밥 — Website

Single-page site for Uri Gukbap, a Korean gukbap restaurant at Ruko Maggiore Grande Blok G No. 5, Gading Serpong.

Plain HTML/CSS/JS: no build step, no dependencies. The only external requests are Google Fonts and the Google Maps embed.

## Live site

Published with GitHub Pages from the `gh-pages` branch: https://lostdna123.github.io/edo/

To publish changes, copy the contents of this folder to the root of the `gh-pages` branch and push.

## Run locally

```bash
cd uri-gukbap
python3 -m http.server 8080
# open http://localhost:8080
```

## What's in it

- **Hero**: tagline, a live "Open now / Closed" badge (always computed in Jakarta time), and an illustrated bowl of dwaeji gukbap with animated steam.
- **Our Broth**: a 24-hour ring that fills as you scroll.
- **Uri (우리)**: what the name means.
- **Menu**: Original Gukbap, Spicy Gukbap, Bossam Set, Hotteok with ice cream.
- **How to eat gukbap**: the season-it-yourself ritual (salt and pepper on the table, rice into the soup, kimchi refills).
- **Visit**: address, hours, sold-out note, non-halal notice, directions, Instagram, and a map.
- **English / Bahasa Indonesia toggle**: picks the browser language on the first visit and remembers the choice.
- SEO: meta description, Open Graph share image (`og-image.png`), and schema.org `Restaurant` JSON-LD.
- Works on phones, keyboard-accessible, and respects reduced-motion settings.

## Editing

| What | Where |
|---|---|
| Opening hours (drives the open/closed badge) | `HOURS` at the top of `script.js`. Also update the hours text in `index.html` and the JSON-LD block. |
| Indonesian copy | `I18N.id` in `script.js` (keys match `data-i18n` attributes) |
| English copy | directly in `index.html` |
| Colours / fonts | CSS variables at the top of `styles.css` |

## Please verify before publishing

This content was collected from public social posts, so some details could be out of date:

- Hours: posts say daily 10.00–22.00 (until sold out). Early posts said 10.00–14.00 and 17.00–22.00.
- Prices: only "gukbap sets from Rp 70.000" is shown. Add prices for Spicy, Bossam and Hotteok if you want them on the page.
- Menu descriptions (for example, what comes in the Bossam Set).
- The map uses a Google Maps search for the restaurant. Swap in the embed link from your Google Business profile for an exact pin.
- `og:image`, `og:url` and the canonical link point at https://lostdna123.github.io/edo/. Update them if you move to your own domain.
- Real photos: the dish art is illustrated SVG. Photos from @urigukbap can replace it.
