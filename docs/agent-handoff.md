# Agent Handoff: Design Modernization

Use this file when a new agent continues the Sumbar Smart Portal redesign.

## Current Goal

Modernize the visual design and implementation consistency of the Next.js
Sumbar Smart Portal while preserving the public-service routes and local
Minangkabau/West Sumatra identity.

## Required Reading

Before editing UI, read these files in order:

1. `docs/design-system.md`
2. `docs/redesign-plan.md`
3. `config/design-tokens.ts`
4. `docs/ui-refactor-stages.md`
5. `tailwind.config.js`
6. `app/layout.tsx`
7. `components/navbar.tsx`
8. `components/footer.tsx`
9. `app/page.tsx`

## Design Position

This is a public-sector portal. The correct direction is not flashy, dark,
glassmorphic, or Awwwards-style. The correct direction is structured, calm,
local, accessible, and task-first.

Use Minangkabau culture as system logic:

- Rumah Gadang: structure, shelter, meeting, civic order.
- Songket: precise accents and fine patterning, not loud decoration.
- Nagari deliberation: clear grouping and consensus-oriented navigation.
- Adat and syarak: honesty, restraint, and trust.
- Highland/coast landscape: warm neutral, forest, stone, and ocean palette.

## Implementation Rules

- Do not start or stop the dev server unless the user asks. The user may already
  have `pnpm dev` running on port 3000.
- Use existing stack: Next.js, React, TypeScript, HeroUI, Tailwind CSS.
- Do not migrate design libraries.
- Prefer editing shared primitives and tokens before page-level one-offs.
- Do not use raw `style={{ color: "#..." }}` for design colors after tokens exist.
- Do not add more floating global buttons.
- Replace fake loading timers with real loading states only when async data is
  actually loading.
- Preserve routes and nav labels unless the user approves IA changes.
- Use Indonesian copy for visible portal UI unless the user asks otherwise.

## Known Existing Problems

- `config/fonts.ts` uses Inter and Fira Code.
- `tailwind.config.js` has almost no semantic theme extension.
- `components/navbar.tsx` has too many top-level nav links and repeated `#FFB900`.
- `components/footer.tsx` contains many `href="#"` links.
- `app/page.tsx` has decorative hero treatment, dead CTAs, placeholder news
  images, inline SVG icons, and repeated card styles.
- `app/informasi-layanan/page.tsx` uses inline `#d48b00`, hand-rolled SVG icons,
  fake loading, and `alert()`.
- Several pages share generic centered headers and card grids.
- `components/AiAssistant.tsx` creates three separate global floating controls.

## Suggested Work Order

Use `docs/ui-refactor-stages.md` as the operational prompt book. It breaks the
work into separate stages with context, scope, target files, acceptance criteria,
and copy-ready prompts.

Recommended order:

1. Baseline audit snapshot.
2. Token wiring and font foundation.
3. Shared UI primitives.
4. Government shell.
5. Homepage civic dashboard.
6. Transparency and finance dashboard.
7. Content index pages.
8. Public service flow.
9. Culture, OPD, and regional explorer.
10. Accessibility, mobile, and trust cleanup.

## Do Not Do

- Do not introduce purple AI gradients.
- Do not make every card rounded-full or `rounded-3xl`.
- Do not use red as a generic brand accent.
- Do not put busy pattern backgrounds behind text.
- Do not create fake data to make the UI look full.
- Do not use random cultural symbols without a documented reason.
- Do not hide government transparency links behind marketing copy.

## Verification

Run these when changing implementation:

```bash
pnpm build
```

Optional if the user wants lint fixes:

```bash
pnpm lint
```

Visual checks should cover:

- Desktop 1440px
- Tablet 768px
- Mobile 390px
- Keyboard focus through navbar and primary actions
- Reduced motion
