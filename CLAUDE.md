# ChocoDips

Dessert cafe website for ChocoDips in Nalchik, Russia. Showcases menu items and cafe info — no ordering or reservation functionality. Russian-language content. Currently in early development (Vite boilerplate).

## Commands

- `npm run dev` — start dev server
- `npm run build` — type-check + production build (`tsc -b && vite build`)
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Architecture

React 19 + TypeScript + Vite 7. Minimal scaffold right now:

- `src/main.tsx` — entry point
- `src/App.tsx` — root component (still boilerplate)
- `public/` — static assets

No routing, state management, or component library installed yet.

## TypeScript & Lint

- **Strict mode** enabled: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `erasableSyntaxOnly`
- Target: ES2022
- ESLint 9 flat config with `react-hooks` and `react-refresh` plugins
- `tseslint.configs.recommended` (not type-checked)

## Design Requirements

**Anti-"AI slop" mandate.** Every design choice must feel intentionally crafted, not generated:

- **Typography**: Distinctive fonts only. Never use Inter, Roboto, Arial, Space Grotesk, or system fonts.
- **Color**: Cohesive palette derived from the cafe's branding (chocolate/dessert tones). Dominant colors with sharp accents — avoid timid, evenly-distributed palettes. Use CSS variables.
- **Motion**: High-impact staggered animations (animation-delay reveals) over scattered micro-interactions. Prefer CSS-only; use Motion library for React when needed.
- **Backgrounds**: Atmospheric CSS gradients and geometric patterns — never plain solid colors.
- **Inspiration**: Draw from IDE themes and cultural aesthetics. Vary between light/dark. Make unexpected choices that feel genuinely designed for a dessert cafe context.

## Menu Items (Russian)

18 dessert items to display: Медовик, Красный бархат, Наполеон, Чизкейк Нью-Йорк, Тирамису, Эклер шоколадный, Брауни, Профитроли, Макарон, Панна-котта, Круассан с шоколадом, Фондан шоколадный, Штрудель яблочный, Картошка пирожное, Трубочка заварная, Корзиночка с фруктами, Мусс шоколадный, Захер торт.

## Planned Features

- Map integration with Leaflet + OpenStreetMap (no API key needed)
- Menu showcase with item details
- Cafe information / about section
