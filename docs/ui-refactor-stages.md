# UI Refactor Stages and Copy-Ready Prompts

Last updated: 2026-06-23

## Purpose

Use this document to refactor Sumbar Smart Portal into a professional,
West Sumatran, culture-aware government dashboard and service portal. Each
stage is intentionally scoped so you can paste one prompt into a fresh agent
and get a reviewable implementation without mixing unrelated work.

The target product is not a decorative culture website. It is a civic dashboard:

- Citizens can quickly find services, announcements, public documents, finance
  information, anti-hoax clarification, OPD data, and culture content.
- Government staff can maintain a consistent interface without hand-styling
  every page.
- The visual identity feels rooted in West Sumatra and Minangkabau culture
  through structure, color, rhythm, and restraint.

## Global Context for Every Stage

Every agent should preserve this context:

- Stack: Next.js 15, React 18, TypeScript, HeroUI, Tailwind CSS v4.
- Existing routes must remain stable unless the user explicitly approves route
  changes.
- Do not start or stop the dev server unless the user asks. The user may already
  have `pnpm dev` running at `http://localhost:3000`.
- Read `docs/design-system.md`, `docs/redesign-plan.md`, `docs/agent-handoff.md`,
  and `config/design-tokens.ts` before editing UI.
- Design direction: official, structured, calm, local, accessible, task-first.
- Cultural language: Rumah Gadang structure, songket precision, nagari
  deliberation, adat and syarak ethics, highland/coast landscape palette.
- Avoid: purple AI gradients, generic glassmorphism, fake metrics, dead links,
  ornamental cultural clip-art, all-yellow pages, red as generic decoration,
  three identical card rows, and artificial loading for static content.

## Stage Discipline

- Complete one stage before starting the next.
- Keep each stage as a separate PR or at least a separate commit.
- Do not mix foundation work with page redesign work.
- If a stage exposes unrelated bugs, document them and keep moving unless they
  block the stage.
- Each stage must include a short final note listing changed files and remaining
  risks.

## Stage 0: Baseline Audit Snapshot

### Goal

Create a clear implementation baseline before changing UI. This prevents agents
from redesigning blindly or losing track of current defects.

### Read

- `docs/design-system.md`
- `docs/redesign-plan.md`
- `docs/agent-handoff.md`
- `app/page.tsx`
- `components/navbar.tsx`
- `components/footer.tsx`
- `components/AiAssistant.tsx`
- `tailwind.config.js`
- `config/fonts.ts`

### Edit

- `docs/ui-audit-snapshot.md`

### Scope

Document:

- Current page families and their visual patterns.
- Dead links and placeholder content.
- Repeated one-off colors.
- Components that should become shared primitives.
- Mobile risks.
- Accessibility risks.

### Done When

- Audit file exists and can guide Stage 1 without re-reading the whole repo.
- No application code has changed.

### Copy-Ready Prompt

```text
You are continuing the Sumbar Smart Portal redesign. Do not change app code yet.
Read docs/design-system.md, docs/redesign-plan.md, docs/agent-handoff.md, app/page.tsx,
components/navbar.tsx, components/footer.tsx, components/AiAssistant.tsx,
tailwind.config.js, and config/fonts.ts.

Create docs/ui-audit-snapshot.md with a concise but complete baseline audit:
page families, current visual patterns, token debt, dead links, placeholder
content, mobile risks, accessibility risks, and recommended shared primitives.
Keep the design direction civic, professional, and West Sumatran. Do not start
or stop the dev server.
```

## Stage 1: Token Wiring and Font Foundation

### Goal

Make the design system real in Tailwind and HeroUI so pages stop using one-off
hex colors and random styling.

### Read

- `config/design-tokens.ts`
- `tailwind.config.js`
- `app/providers.tsx`
- `app/layout.tsx`
- `config/fonts.ts`
- `styles/globals.css`

### Edit

- `tailwind.config.js`
- `config/fonts.ts`
- `app/providers.tsx`
- `styles/globals.css`
- Optional: `config/theme.ts`

### Scope

- Wire semantic colors from `config/design-tokens.ts` into Tailwind.
- Configure HeroUI theme tokens if practical.
- Replace Inter with Plus Jakarta Sans or Geist.
- Add CSS variables for core surfaces, text, border, focus, and semantic states.
- Add base body background and text color.
- Add tabular number utility for metrics and finance.

### Do Not

- Redesign navbar, footer, or homepage yet.
- Rename routes.
- Refactor page components.

### Done When

- Token names are available as Tailwind classes or CSS variables.
- Existing pages still render.
- No visible page redesign is attempted.
- `pnpm build` passes if run.

### Copy-Ready Prompt

```text
Implement Stage 1 of the Sumbar Smart Portal UI refactor: token wiring and font
foundation only.

Read docs/design-system.md, docs/redesign-plan.md, docs/agent-handoff.md, and
config/design-tokens.ts first. Use the existing stack: Next.js, HeroUI, Tailwind
CSS v4. Do not redesign pages yet.

Wire the semantic design tokens into tailwind.config.js and any HeroUI provider
theme config that fits this project. Replace Inter in config/fonts.ts with Plus
Jakarta Sans or Geist. Add global CSS variables and base styles for paper
surface, text, borders, focus rings, semantic states, and tabular numbers.

Keep the design civic, professional, and Minangkabau-informed. Do not start or
stop the dev server. After editing, run pnpm build if available and summarize
changed files plus any remaining token gaps.
```

## Stage 2: Shared UI Primitives

### Goal

Create reusable building blocks so later page redesigns do not copy-paste card,
header, button, and section styles.

### Read

- Stage 1 changes
- `components/primitives.ts`
- `components/card_pengumuman.tsx`
- `components/card_antihoax.tsx`
- Existing HeroUI usage in `app/keuangan/page.tsx`, `app/pengumuman/page.tsx`,
  and `app/budaya/page.tsx`

### Edit

- `components/ui/page-shell.tsx`
- `components/ui/page-header.tsx`
- `components/ui/section.tsx`
- `components/ui/status-badge.tsx`
- `components/ui/action-card.tsx`
- `components/ui/document-card.tsx`
- `components/ui/empty-state.tsx`
- `components/ui/index.ts`

### Scope

Build primitives with:

- Token-based colors.
- Consistent radius and shadow.
- Focus-visible states.
- Semantic variants.
- TypeScript props.
- No page-specific content.

### Do Not

- Replace every page yet.
- Build a separate design library.
- Add a new UI framework.

### Done When

- Primitives compile and are exported.
- At least one small existing component can use a primitive if low risk.
- No broad page redesign is included.

### Copy-Ready Prompt

```text
Implement Stage 2 of the Sumbar Smart Portal UI refactor: shared UI primitives.

Read docs/design-system.md, docs/redesign-plan.md, docs/agent-handoff.md,
config/design-tokens.ts, and the Stage 1 token changes. Create reusable
components under components/ui for PageShell, PageHeader, Section, StatusBadge,
ActionCard, DocumentCard, EmptyState, and an index export.

Use HeroUI and Tailwind token classes already available in the project. Components
must be civic, accessible, responsive, and suitable for a West Sumatran government
dashboard. Add focus-visible states and semantic variants. Do not redesign whole
pages yet, do not add a new UI framework, and do not start or stop the dev server.
Run pnpm build if practical and summarize changed files.
```

## Stage 3: Government Shell

### Goal

Make the global shell feel like one official government portal: simpler nav,
trustworthy footer, and consolidated floating help controls.

### Read

- `components/navbar.tsx`
- `components/footer.tsx`
- `components/AiAssistant.tsx`
- `config/site.ts`
- `docs/redesign-plan.md`

### Edit

- `components/navbar.tsx`
- `components/footer.tsx`
- `components/AiAssistant.tsx`
- Optional: `config/navigation.ts`
- Optional: `components/help-launcher.tsx`

### Scope

- Group nav into: Beranda, Layanan, Informasi, Transparansi, Budaya, OPD.
- Desktop nav must fit one line.
- Mobile nav must prioritize search/top services.
- Footer links must be real routes or intentionally disabled with TODO comments.
- Collapse assistant, survey, and accessibility controls into one launcher or
  cleaner cluster.
- Use tokens from Stage 1 and primitives from Stage 2.

### Do Not

- Redesign homepage sections.
- Change route slugs.
- Remove important service destinations.

### Done When

- Header/footer feel consistent across routes.
- No visible footer `href="#"` remains unless explicitly documented as pending.
- Mobile menu is usable.

### Copy-Ready Prompt

```text
Implement Stage 3 of the Sumbar Smart Portal UI refactor: the government shell.

Read docs/design-system.md, docs/redesign-plan.md, docs/agent-handoff.md,
config/design-tokens.ts, components/navbar.tsx, components/footer.tsx,
components/AiAssistant.tsx, and config/site.ts.

Refactor the global shell into a professional West Sumatran government portal:
group nav into Beranda, Layanan, Informasi, Transparansi, Budaya, and OPD; keep
desktop nav on one line; improve mobile nav; fix footer links; and consolidate
the three floating assistant/survey/accessibility buttons into one clean help
entry pattern. Use existing routes and do not change slugs.

Do not redesign the homepage yet. Do not start or stop the dev server. Run
pnpm build if practical and summarize changed files, routes preserved, and any
remaining pending links.
```

## Stage 4: Homepage Civic Dashboard

### Goal

Transform the homepage from a decorative landing page into a professional
government dashboard gateway.

### Read

- `app/page.tsx`
- `components/LayananCarousel.tsx`
- `data/dummy/pengumuman.json`
- `data/dummy/antihoax.json`
- `utils/*queries.ts`
- Official IA references in `docs/design-system.md`

### Edit

- `app/page.tsx`
- Optional: `components/home/*`
- Optional: `components/LayananCarousel.tsx` if replaced or deprecated

### Scope

Homepage sections:

1. Civic hero with search and top actions.
2. Priority service grid.
3. Official updates: pengumuman plus berita.
4. Transparency dashboard shortcuts.
5. Culture and region gateway.
6. Help and feedback band.

Use real routes. Remove dead CTAs. Replace placeholder images where possible.

### Do Not

- Add fake official metrics.
- Use busy cultural backgrounds.
- Keep the auto-marquee as the primary service navigation.

### Done When

- First viewport clearly communicates "Portal resmi Provinsi Sumatera Barat".
- Citizens can reach core services quickly.
- No homepage `href="#"` remains.
- Mobile first screen is useful.

### Copy-Ready Prompt

```text
Implement Stage 4 of the Sumbar Smart Portal UI refactor: homepage civic dashboard.

Read docs/design-system.md, docs/redesign-plan.md, docs/agent-handoff.md,
config/design-tokens.ts, app/page.tsx, components/LayananCarousel.tsx, and
available dummy data under data/dummy.

Rebuild the homepage into a professional West Sumatran government dashboard:
civic hero with search and top actions, priority service grid, official updates,
transparency shortcuts, culture gateway, and help/feedback section. Use Rumah
Gadang/songket inspiration only as subtle structure or low-contrast accents.
Use real internal routes and remove dead CTAs. Replace or de-emphasize the
marquee carousel so services are scannable.

Do not change route slugs, do not invent fake official metrics, and do not start
or stop the dev server. Run pnpm build if practical and summarize changed files
plus mobile risks.
```

## Stage 5: Content Index Pages

### Goal

Normalize the public information pages so news, announcements, agenda, photos,
videos, and infographics feel like one content system.

### Read

- `app/pengumuman/page.tsx`
- `app/informasi/page.tsx`
- `app/informasi/berita/page.tsx`
- `app/informasi/berita/[slug]/page.tsx`
- `app/informasi/agenda/page.tsx`
- `app/informasi/foto/page.tsx`
- `app/informasi/video/page.tsx`
- `app/informasi/infografis/page.tsx`
- `components/card_pengumuman.tsx`

### Edit

- The content index pages above.
- Shared cards/filters under `components/ui` or `components/content`.

### Scope

- Use shared PageHeader, Section, StatusBadge, EmptyState, and cards.
- Create consistent filters, metadata, cards, pagination, and empty states.
- Use red only for urgent/anti-hoax status.
- Keep content readable and official.

### Do Not

- Rewrite all article copy.
- Replace data fetching behavior unless needed.
- Build ornamental magazine layouts.

### Done When

- Content routes share one visual system.
- Empty/loading states are consistent.
- Metadata and dates are easy to scan.

### Copy-Ready Prompt

```text
Implement Stage 5 of the Sumbar Smart Portal UI refactor: content index pages.

Read docs/design-system.md, docs/redesign-plan.md, docs/agent-handoff.md,
components/ui primitives, app/pengumuman/page.tsx, app/informasi/page.tsx,
app/informasi/berita/page.tsx, app/informasi/berita/[slug]/page.tsx,
app/informasi/agenda/page.tsx, app/informasi/foto/page.tsx,
app/informasi/video/page.tsx, app/informasi/infografis/page.tsx, and
components/card_pengumuman.tsx.

Normalize these routes into one official content system: consistent headers,
filters, cards, metadata, pagination, empty states, and status badges. Keep the
look professional, civic, and West Sumatran through tokens and subtle pattern
logic, not decoration. Preserve route slugs and visible content meaning.

Do not start or stop the dev server. Run pnpm build if practical and summarize
changed files plus any remaining content/data gaps.
```

## Stage 6: Transparency and Finance Dashboard

### Goal

Make `Keuangan Daerah` and related transparency surfaces feel like a credible
public accountability dashboard.

### Read

- `app/keuangan/page.tsx`
- Any akuntabilitas pages/examples
- `components/file-preview.tsx`
- Existing Recharts usage

### Edit

- `app/keuangan/page.tsx`
- Related transparency pages if in scope
- Optional: `components/transparency/*`

### Scope

- Use tabular numbers.
- Use gold for official accent, blue/green for data series, red only for negative
  or danger states.
- Add source notes and document cards.
- Keep charts restrained and readable.
- Make year controls and downloads accessible.

### Do Not

- Invent financial data.
- Use decorative progress bars.
- Overload the page with fake precision.

### Done When

- Finance page looks like a professional public accountability dashboard.
- Report downloads are clear.
- Charts have labels/source notes.

### Copy-Ready Prompt

```text
Implement Stage 6 of the Sumbar Smart Portal UI refactor: transparency and
finance dashboard.

Read docs/design-system.md, docs/redesign-plan.md, docs/agent-handoff.md,
config/design-tokens.ts, app/keuangan/page.tsx, components/file-preview.tsx,
and existing Recharts usage.

Refactor Keuangan Daerah into a credible public accountability dashboard using
shared primitives and tokens. Use tabular numbers, restrained charts, clear year
controls, source notes, document cards, and accessible download actions. Use
gold for official accent, blue/green for data, and red only for danger/negative
states. Do not invent data.

Do not start or stop the dev server. Run pnpm build if practical and summarize
changed files and any data limitations.
```

## Stage 7: Public Service Flow: SKM and Layanan

### Goal

Turn SKM and service pages into trustworthy public-service flows instead of
demo-style statistic cards.

### Read

- `app/informasi-layanan/page.tsx`
- `app/layanan/page.tsx`
- `public/file/SEPAKAT - Manual Book.pdf`
- `components/AiAssistant.tsx` if help entry links here

### Edit

- `app/informasi-layanan/page.tsx`
- `app/layanan/page.tsx`
- Optional shared service components

### Scope

- Remove `window.alert()` and replace with inline validation.
- Remove fake loading if data is local.
- Use service-flow structure: summary, requirements, action, support document,
  status/score lookup.
- Keep SKM metrics honest and clearly labeled.
- Use tokenized colors, no inline `#d48b00`.

### Do Not

- Invent real SKM API behavior.
- Hide the manual book.
- Make the page a marketing landing page.

### Done When

- SKM is understandable and usable on mobile.
- Validation is inline and accessible.
- No inline design hex remains for the page theme.

### Copy-Ready Prompt

```text
Implement Stage 7 of the Sumbar Smart Portal UI refactor: public service flow
for SKM and layanan.

Read docs/design-system.md, docs/redesign-plan.md, docs/agent-handoff.md,
app/informasi-layanan/page.tsx, app/layanan/page.tsx, and the existing manual
book route. Refactor SKM into a trustworthy public-service flow with summary,
requirements, primary action, support document, period selection, inline
validation, and accessible modal or result panel.

Remove window.alert(), remove fake loading where data is local, replace inline
design hex colors with tokens, and keep all metrics clearly labeled as current
mock/static data unless real data exists. Do not start or stop the dev server.
Run pnpm build if practical and summarize changed files.
```

## Stage 8: Culture, OPD, and Regional Explorer

### Goal

Make culture and OPD pages feel like official knowledge dashboards rather than
generic grids.

### Read

- `app/budaya/page.tsx`
- `app/budaya/DetailDialog.tsx`
- `components/MapSumbar.tsx`
- `app/opd/page.tsx`
- `app/inovasi/page.tsx`

### Edit

- `app/budaya/page.tsx`
- `app/budaya/DetailDialog.tsx`
- `components/MapSumbar.tsx`
- `app/opd/page.tsx`
- `app/inovasi/page.tsx`
- Optional: `components/explorer/*`

### Scope

- Culture page: map/list/detail should use highland green, gold accents, and
  strong imagery with readable overlays.
- OPD page: make it a directory dashboard with filters, categories, and clear
  contact/role structure if data exists.
- Inovasi page: align with service/product cards but keep official tone.

### Do Not

- Turn culture into decorative tourism-only marketing.
- Use random emojis for empty/error states.
- Break map behavior.

### Done When

- Budaya, OPD, and Inovasi share the design system.
- Culture content has the strongest local visual identity without hurting clarity.
- Map and filters remain usable.

### Copy-Ready Prompt

```text
Implement Stage 8 of the Sumbar Smart Portal UI refactor: culture, OPD, and
regional explorer pages.

Read docs/design-system.md, docs/redesign-plan.md, docs/agent-handoff.md,
app/budaya/page.tsx, app/budaya/DetailDialog.tsx, components/MapSumbar.tsx,
app/opd/page.tsx, and app/inovasi/page.tsx.

Refactor these pages into official knowledge/dashboard surfaces. Budaya should
use highland green, gold accents, strong imagery, readable overlays, and a
usable map/list/detail pattern. OPD should feel like a government directory
dashboard with clear categories and filters. Inovasi should align with service
cards and official tone. Preserve route slugs and map behavior.

Do not start or stop the dev server. Run pnpm build if practical and summarize
changed files and any data limitations.
```

## Stage 9: Accessibility, Mobile, and Trust Cleanup

### Goal

Finish the refactor by removing prototype residue and verifying the portal as a
professional public-sector product.

### Read

- All changed files from Stages 1-8
- `styles/globals.css`
- `app/error.tsx`
- `components/file-preview.tsx`
- Any remaining pages with `href="#"`, `setTimeout`, inline hex colors, or raw SVG

### Edit

- Focused cleanup files only.
- Optional: `docs/final-ui-qa.md`

### Scope

- Remove remaining dead links or mark them explicitly.
- Remove fake loading timers.
- Replace remaining inline design hex colors.
- Check focus states, keyboard nav, contrast, mobile spacing, and reduced motion.
- Document known limitations.

### Done When

- `rg 'href="#"' app components` returns no visible production dead links, or
  every remaining instance is documented.
- `rg 'alert\\(' app components` returns no UI validation alerts.
- `pnpm build` passes.
- Mobile 390px layout is checked.

### Copy-Ready Prompt

```text
Implement Stage 9 of the Sumbar Smart Portal UI refactor: accessibility, mobile,
and trust cleanup.

Read docs/design-system.md, docs/redesign-plan.md, docs/agent-handoff.md, and all
files changed in prior stages. Search for remaining href="#", alert(), fake
setTimeout loading, inline design hex colors, raw decorative SVGs, inaccessible
focus states, and mobile overflow risks.

Fix only cleanup issues. Do not introduce a new visual direction. Verify mobile
390px, tablet 768px, desktop 1440px, keyboard focus, reduced motion, and build.
Create docs/final-ui-qa.md with what was checked and remaining limitations.
Do not start or stop the dev server unless the user asks.
```

## Recommended Stage Order

1. Stage 0: Baseline Audit Snapshot
2. Stage 1: Token Wiring and Font Foundation
3. Stage 2: Shared UI Primitives
4. Stage 3: Government Shell
5. Stage 4: Homepage Civic Dashboard
6. Stage 6: Transparency and Finance Dashboard
7. Stage 5: Content Index Pages
8. Stage 7: Public Service Flow
9. Stage 8: Culture, OPD, and Regional Explorer
10. Stage 9: Accessibility, Mobile, and Trust Cleanup

The homepage can technically happen before the shell, but the recommended order
keeps the visual foundation stable before rewriting the most visible route.

