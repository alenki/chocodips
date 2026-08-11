# ChocoDips

Website for ChocoDips — a chocolaterie / dessert room in Nalchik, Russia. Showcase only: no
ordering, no reservations, no backend. Bilingual RU/EN, RU is the default.

## Commands

- `npm run dev` — start dev server
- `npm run build` — type-check + production build (`tsc -b && vite build`)
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Verified cafe facts

Cross-checked against two independent directories and the cafe's own Taplink menu. Do not
change these without a source.

- Address: **Нальчик, ул. Пушкина, 87** (Kabardino-Balkaria)
- Phone: **+7 964 040-70-20**
- Hours: **ежедневно 10:00 — 23:00**
- Instagram: **@chocodips.ru**
- Map coords `[43.4837, 43.6083]` — interpolated from OSM house numbers 79 and 89 on Pushkina

All of this lives in `src/data/cafe.ts`. Nothing else should hard-code it.

## Architecture

React 19 + TypeScript + Vite 7, plain CSS (no framework), `motion/react` for animation,
`leaflet` + `react-leaflet` for the map. No router dependency — `src/hooks/useHashRoute.ts`
is a ~40-line hash router over five pages.

```
src/
  main.tsx            entry — mounts LocaleProvider > App
  App.tsx             chrome + route switch + page transition
  types.ts            shared types (Locale, Bilingual, MenuItem, …)
  styles/
    tokens.css        palette, typefaces, scale, motion, z-index — the single source of truth
    base.css          reset, atmosphere, .display/.eyebrow/.btn/.frame primitives
  data/
    menu.ts           19 dishes: real prices and real descriptions from the cafe's Taplink
    cafe.ts           address, phone, hours, socials, coords
    journal.ts        Daily entries + photo essay
  i18n/
    dict.ts           every user-facing string, ru + en, flat dotted keys
    context.ts        LocaleContext + useLocale()  (t / pick / locale / setLocale)
    LocaleProvider.tsx
  hooks/              useHashRoute, useLockBodyScroll, useMediaQuery, useOpenNow,
                      useFocusTrap
  lib/                compose.ts (WhatsApp hand-off), plural.ts (RU plural forms)
  components/         Header, Footer, Cursor, DripEdge, Marquee, Reveal, DishCard,
                      DishModal, CafeMap(+Lazy), Field, ReadyPanel
  pages/              Home, MenuPage, Daily, Careers, Reviews  (+ one CSS file each)
```

Every component owns a sibling `.css` file. Import it from the component, never globally.

### Pages

`#/` Home · `#/menu` Меню · `#/daily` Daily · `#/careers` Вакансии · `#/reviews` Обратная связь.
Unknown hashes fall back to Home.

### Forms

There is no server. `Careers` and `Reviews` validate, then compose a prefilled WhatsApp message
via `src/lib/compose.ts` and hand it to the visitor (`ReadyPanel`). The UI says exactly that —
never make a form imply it delivered a message on its own.

### Copy

Add strings to **both** `ru` and `en` in `src/i18n/dict.ts` (`en` is typed against `keyof typeof ru`,
so a missing key is a compile error). Menu/journal data carries its own `{ ru, en }` fields, read
through `pick()`. Counts printed in Russian must go through `countPositions()` — «4 позиции»,
«19 позиций».

## Design system

**«Шоколадный регистр»** — a warm cream editorial patisserie catalogue. Cream page, deep
chocolate ink, one sharp molten-orange accent, punctuated by full-bleed chocolate slabs.

- **Colour** — from the logo. `--cream #F7F0E2`, `--ink #2A1109`, `--cocoa-900 #1B0A05`,
  `--cocoa-700 #5A2318` (brand brown), `--molten #E4652C` (brand orange), plus `--pistachio`
  and `--berry` used sparingly. Never hard-code a colour that a token already covers.
- **Type** — `Oranienbaum` (display, all-caps, huge only), `Yeseva One` via `.em` (the one
  accented word in a display line), `Alice` (body), `Tenor Sans` (micro/UI, uppercase, tracked).
  All four carry Cyrillic. Do not introduce Inter, Roboto, Space Grotesk or system fonts.
- **The drip** — `DripEdge` is the brand's one graphic idea, taken from the dripping "d" in the
  logo. Use it only where a chocolate surface meets a cream one, and sparingly: two per page at
  most. `Footer` skips it on routes that already end dark (`DARK_TAIL`).
- **Motion** — `Reveal`, `RevealLine`, `RevealWords`, `Stagger` in `components/Reveal.tsx`.
  `RevealLine` puts its in-view trigger on the *outer* (unclipped) span on purpose: watching the
  inner span deadlocks, because it starts translated outside its own overflow mask and an
  IntersectionObserver on it never fires. Everything honours `prefers-reduced-motion`.
- **Overlays** — anything `position: fixed` (modal, cursor-following preview) is portalled to
  `document.body`. A `filter` or `transform` on an ancestor would otherwise become its containing
  block. This is why the page transition in `App.tsx` animates opacity/y but never `filter`.
- **Header** — inverts over dark heroes via the `DARK_HERO` route set in `Header.tsx`.

## TypeScript & Lint

- Strict, plus `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`,
  `verbatimModuleSyntax` (use `import type`).
- `react-hooks` forbids `setState` inside an effect body. Adjust state during render with the
  "previous value" pattern, or use `useSyncExternalStore`, as `useMediaQuery` does.
- Both `npm run lint` and `npm run build` must be clean before a change is done.

## Assets

Dish photography is in `public/data/menu/<CYRILLIC NAME>/image_N.png`. Folder names contain
Cyrillic and spaces, so every path is run through `encodeURI()` at the data layer — never build
one by hand in a component. Two dishes (Тедди, Чокомису) intentionally have no photos and get a
designed no-photo treatment; that is not a bug.
