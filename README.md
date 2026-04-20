# AI Director Challenge (Next.js Migration)

This project has been migrated from a Google AI Studio/Vite React app to a full
Next.js App Router project while preserving the same visual design, spacing,
colors, animations, and UX flow.

## New project structure

```txt
app/
  globals.css
  layout.tsx
  page.tsx
components/
  challenge/
    ChallengeFooter.tsx
    ChallengeHeader.tsx
    ChallengeShell.tsx
    StepNavigation.tsx
    StepPanels.tsx
types/
  challenge.ts
next.config.ts
postcss.config.mjs
```

## Old to new file mapping

- `src/main.tsx` -> `app/layout.tsx` + `app/page.tsx`
- `src/App.tsx` -> `components/challenge/ChallengeShell.tsx` +
  `components/challenge/StepPanels.tsx`
- Header section from old `src/App.tsx` ->
  `components/challenge/ChallengeHeader.tsx`
- Footer section from old `src/App.tsx` ->
  `components/challenge/ChallengeFooter.tsx`
- Step progress nav from old `src/App.tsx` ->
  `components/challenge/StepNavigation.tsx`
- `src/types.ts` -> `types/challenge.ts`
- `src/index.css` -> `app/globals.css`
- `index.html` -> handled by Next.js `app/layout.tsx`
- `vite.config.ts` -> replaced with Next.js `next.config.ts` +
  `postcss.config.mjs`

## How components were converted

- The original single-file UI was split into reusable components:
  - shared shell/layout (`ChallengeShell`)
  - shared chrome (`ChallengeHeader`, `StepNavigation`, `ChallengeFooter`)
  - step modules (`MissionStep`, `BlueprintStep`, `UpgradeStep`,
    `ActivateStep`, `ReportStep`)
- All styling classes and animated interactions were preserved to keep a
  near-identical appearance.
- Motion animations were kept using `motion/react` inside client components.
- Metadata/SEO was added in `app/layout.tsx` using Next.js `metadata`.

## Fonts, styles, responsiveness, and assets

- Font setup uses `Inter` via `next/font/google` in `app/layout.tsx`.
- Tailwind theme tokens and custom styles are in `app/globals.css`.
- Responsive behavior is unchanged (`sm/md/lg` utility classes preserved).
- Static assets should be placed in `public/` and referenced with root-relative
  paths (for example: `/images/hero.png`).

## SSR / SSG notes

- `app/page.tsx` is a server component entry point.
- Interactive UI is rendered through `ChallengeShell` as a client component.
- This is the closest match to the original interactive, stateful Studio flow.
- If you add content pages later, use static generation by default and add
  route-level metadata via `export const metadata`.

## Run locally

**Prerequisites:** Node.js 20+ (required for Next.js 15 + Tailwind 4 native bindings)

1. Install dependencies:
   `npm install`
2. Run development server:
   `npm run dev`
3. Open:
   `http://localhost:3000`

## Build for production

1. Create production build:
   `npm run build`
2. Start production server:
   `npm run start`

## Notes for pixel-accurate matching

- Keep color tokens in `app/globals.css` unchanged.
- Keep component structure and Tailwind classes unchanged where possible.
- If you introduce images/icons from the original Studio app, place them in
  `public/` and keep dimensions/aspect-ratio consistent.
- Minor rendering differences can occur due to browser/font rasterization, but
  layout and styling intent are preserved.
# test-repo
