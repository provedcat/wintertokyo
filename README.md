# Tokyo Christmas 2026

Mobile trip planner for 리미 · 티고 · 요니, December 9–13, 2026.

The first implemented day is Wednesday. Other dates are intentionally marked pending because the supplied itinerary and previous final-sheet summary differ. Arrival times, reservations, and opening hours must be confirmed before travel. No private home address or family phone number is included.

## Features

- Google Maps JavaScript API map with numbered public reference points (Incheon → Narita → Tsukuba Center), an air-travel dotted line and a bus-travel solid line. Lines show visit order, not computed roads or the booked bus route. Whole-trip and Japan-only overview buttons are available. Timeline scrolling highlights the corresponding reference point. Undecided stops and private accommodation are excluded. Other days still use basic embeds.
- Timeline uses 2.8 CSS pixels per minute. Detail panels do not change the duration bars.
- Shared D1 packing checklist: add, edit, assign, check; refresh every 10 seconds. Anyone who can access the public site can edit it. Version checks reject stale changes.
- Weather via Open-Meteo within its 16-day forecast range, using Japan time. Current weather appears on the trip day; stale cached data is labeled.
- Downloadable standalone Wednesday HTML itinerary. It opens offline without the map. A service worker also caches previously visited page resources; the downloaded file is the reliable fallback.

The browser Maps key is stored in the Sites runtime variable `MAPS_BROWSER_KEY`, not the Git source, and returned through `/api/maps-config`. Restrict it in Google Cloud to the deployed website and Maps JavaScript API.

## Develop

Use the Sites helper to install dependencies, then `npm run dev`. Schema is in `db/schema.ts`; migrations are in `drizzle/` and applied by Sites when deployed. `node node_modules/typescript/bin/tsc --noEmit` checks types; `npm run build` builds the Worker.

Run `node --experimental-strip-types checks.mjs` and `python checks_db.py` for duration and concurrent-edit checks. Actual Google map rendering, mobile downloads, and cross-device interaction need browser/device verification.

Typography uses self-hosted Spoqa Han Sans Neo (400, 500, 700); see `public/fonts/OFL.txt`. Mobile schedule headings are 22px, descriptions 15px, and split-line start times 32px.
