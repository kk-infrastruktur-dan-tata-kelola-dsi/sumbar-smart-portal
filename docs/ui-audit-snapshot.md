# UI Audit Snapshot

Last updated: 2026-06-23

## Audit Boundary

This is the Stage 0 baseline audit for the Sumbar Smart Portal UI refactor.
No application code was changed for this stage.

Sources reviewed:

- `docs/design-system.md`
- `docs/redesign-plan.md`
- `docs/agent-handoff.md`
- `docs/ui-refactor-stages.md`
- `config/design-tokens.ts`
- `tailwind.config.js`
- `config/fonts.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `components/navbar.tsx`
- `components/footer.tsx`
- `components/AiAssistant.tsx`
- Representative route families under `app/`
- Shared visual components under `components/`

## Executive Diagnosis

The current UI reads as a hackathon prototype assembled from multiple visual
ideas, not as a professional West Sumatran government dashboard. The product has
useful route coverage, but the interface lacks one governing system for color,
spacing, typography, navigation, loading, cards, and trust states.

The biggest design problems are:

1. Token debt: the new `config/design-tokens.ts` exists, but the app still uses
   raw Tailwind colors, inline hex values, HeroUI defaults, and one-off gradients.
2. Shell inconsistency: the navbar is overloaded and the footer contains many
   dead links, so the portal feels less official than its content deserves.
3. Homepage mismatch: the homepage is decorative and media-led, but it should be
   a civic service gateway with search, top tasks, official updates, and
   transparency shortcuts.
4. Repeated generic page templates: many routes use the same centered title,
   white background, card grid, and artificial loading pattern regardless of
   content type.
5. Trust debt: dead `href="#"` links, placeholder imagery, fake loading timers,
   `alert()` validation, and unsourced mock metrics weaken the government
   credibility of the portal.

## Current Page Families and Visual Patterns

### Global Shell

Files:

- `app/layout.tsx`
- `components/navbar.tsx`
- `components/footer.tsx`
- `components/AiAssistant.tsx`

Current pattern:

- The app shell renders navbar, assistant controls, page content, and footer on
  every route.
- Navbar uses HeroUI, a brand lockup, a separate Minang quote area, and a second
  desktop nav row.
- Desktop nav exposes too many top-level items: Beranda, Profil, Informasi,
  Pengumuman, Anti Hoax, Informasi Layanan, Keuangan Daerah, Budaya, Inovasi,
  and OPD.
- Mobile nav mirrors the overloaded desktop IA and does not prioritize search,
  top services, or transparency.
- Footer is a dark link farm with generic official copy and many dead links.
- Assistant, survey, and TTS controls appear as three separate floating buttons.

Risk:

- The global shell currently communicates "demo portal" more than "official
  provincial service system".
- The top nav will continue to fight for space as more pages become real.
- Floating controls can cover content on mobile and compete with each other.

### Homepage

File:

- `app/page.tsx`

Current pattern:

- A decorative rotated mountain hero with yellow backing shape and leaf images.
- Hero CTAs are visually prominent but do not route anywhere.
- Statistics are shown immediately after the hero, but the source and purpose of
  "5.5M+" and "19" are not explained.
- A large yellow video documentation section dominates the page.
- News cards use placeholder images, inline SVG icons, and dead "Baca
  Selengkapnya" links.
- Announcements are static objects inside the page and include a dead "Lihat
  Semua" link.
- Services are delegated to an auto-marquee carousel.

Risk:

- The first viewport does not clearly function as "Portal resmi Provinsi
  Sumatera Barat".
- Citizens do not get immediate search, PPID, Pengumuman, Keuangan, Anti Hoax,
  OPD, or SKM task entry points.
- The cultural direction is literal decoration rather than system logic.

### Public Information and Content Indexes

Files:

- `app/pengumuman/page.tsx`
- `app/informasi/page.tsx`
- `app/informasi/berita/page.tsx`
- `app/informasi/berita/[slug]/page.tsx`
- `app/informasi/agenda/page.tsx`
- `app/informasi/foto/page.tsx`
- `app/informasi/video/page.tsx`
- `app/informasi/infografis/page.tsx`
- `components/card_pengumuman.tsx`

Current pattern:

- Most pages start with a centered black text header on a white background.
- Content cards repeat border, white surface, rounded corners, and shadow with
  small local variations.
- Several pages simulate loading with `setTimeout` even when rendering local
  placeholder/static content.
- `app/informasi/page.tsx` uses placeholder images, generic section dividers,
  gradient yellow buttons, and lorem ipsum agenda copy.
- `app/informasi/page.tsx` links the photo CTA to `/informasi/photo`, but the
  actual route family is `/informasi/foto`.
- Content pages do not share one metadata, filter, empty-state, card, or
  pagination system.

Risk:

- The content family feels like separate assignments instead of one official
  newsroom/document system.
- Placeholder and lorem ipsum content is visible enough to damage trust.

### Anti Hoax

Files:

- `app/anti_hoax/page.tsx`
- `components/card_antihoax.tsx`
- `components/popup-antihoax.tsx`

Current pattern:

- Anti Hoax uses red more appropriately than other pages, but the treatment is
  still heavy and not integrated into a wider semantic status system.
- The page uses a centered header, red warning panel, and two card grids.
- Empty states exist, which is good, but they should align with shared
  `EmptyState` and `StatusBadge` primitives later.

Risk:

- Because red is also used elsewhere as decoration, this page loses some of its
  semantic urgency. Stage 1 needs to reserve red for danger/anti-hoax states.

### Transparency and Finance

File:

- `app/keuangan/page.tsx`

Current pattern:

- Keuangan already has the right content ingredients: year filter, metrics,
  reports, charts, trend data, and CTA.
- It still uses a generic centered page header, white cards, default HeroUI
  colors, raw chart hex values, and simulated loading.
- Finance numbers do not use a visible tabular-number system.
- Source notes are present but weak. Downloads look like actions, but their
  actual file behavior is not grounded in a real document route.

Risk:

- The page is close to a public accountability dashboard but still feels like a
  SaaS demo. Stage 6 should be high impact after shell/homepage foundations.

### Public Service Flow: SKM and Layanan

Files:

- `app/informasi-layanan/page.tsx`
- `app/layanan/page.tsx`

Current pattern:

- These two files appear duplicated.
- Both use artificial `setTimeout` loading for local state.
- Validation uses `alert("Silakan pilih periode terlebih dahulu")`.
- Many design colors are inline, especially `#d48b00`.
- The UI emphasizes large score cards and gradients before explaining the task,
  requirement, source, or next action.
- Metrics are static/dummy but not clearly labeled as static/mock data.

Risk:

- `alert()` and inline hex should be treated as public-service quality bugs.
- This page needs a service-flow layout, not a marketing/statistics layout.

### Culture, OPD, and Regional Explorer

Files:

- `app/budaya/page.tsx`
- `app/budaya/DetailDialog.tsx`
- `components/MapSumbar.tsx`
- `app/opd/page.tsx`
- `app/inovasi/page.tsx`

Current pattern:

- Budaya has meaningful ingredients: search, category filters, regional map,
  list/detail behavior, and image-led content.
- Budaya also uses emoji category icons, debug console logging, map colors from
  data, inline style handling, and a very rounded detail dialog.
- OPD uses tabs and cards but looks like a generic directory grid. It lacks
  search, contact/action structure, source notes, and clear hierarchy.
- Inovasi and OPD use the same artificial loading pattern found elsewhere.

Risk:

- Culture is the route with the strongest potential for local identity, but it
  must not become tourism decoration. It should become an official knowledge
  explorer.
- OPD needs to feel like a government directory dashboard, not a static icon
  gallery.

## Token Debt

Current token state:

- `config/design-tokens.ts` defines a useful West Sumatran civic palette,
  typography, radius, shadow, spacing, motion, layout, and z-index scale.
- `tailwind.config.js` only extends `fontFamily.sans` and `fontFamily.mono`.
- HeroUI is included through `heroui()` but no civic theme values are wired.
- `config/fonts.ts` still uses Inter and Fira Code.
- `app/layout.tsx` uses HeroUI default `bg-background` and `text-foreground`.

Repeated one-off colors and patterns found:

- `#FFB900` in navbar active and hover states.
- `#F0B100`, `#FFB900`, and `#ffdd00` in content CTA gradients.
- `#d48b00` repeated through SKM buttons, modal borders, and metric text.
- `#FBBF24`, `#3B82F6`, and `#fff` inside inline homepage SVG icons.
- `#f59e0b`, `#10b981`, and `#e5e7eb` in finance charts.
- `#1a2332` in the footer instead of the `footer` token.
- Old gradient utility examples remain in `components/primitives.ts`.

Stage 1 implication:

- Wire `config/design-tokens.ts` into Tailwind and HeroUI before touching page
  composition.
- Replace Inter with Plus Jakarta Sans or Geist.
- Add CSS variables for paper, text, border, focus, primary, danger, success,
  info, and footer surfaces.
- Add a tabular-number utility for finance, counters, SKM, and percentages.

## Dead Links, Broken Routes, and Placeholder Content

Visible `href="#"` problems:

- `components/footer.tsx` has dead social links, about links, service links,
  information links, privacy, terms, and sitemap.
- `app/page.tsx` has dead news "Baca Selengkapnya" links and a dead "Lihat
  Semua" announcement link.
- `components/LayananCarousel.tsx` uses `href ?? "#"` for most service items.

Route/content issues:

- `app/informasi/page.tsx` links to `/informasi/photo`; the repo has
  `app/informasi/foto/page.tsx`.
- `components/LayananCarousel.tsx` image fallback points to
  `/images/info-publik.png`, but the available asset is `infopublik.png`.
- `app/informasi/page.tsx` includes lorem ipsum agenda descriptions.
- Many information pages use `placeholder-horizontal.jpg` or
  `placholder-vertical.jpg` as actual content imagery.
- Homepage news images use `images/placeholder-horizontal.jpg` with raw `img`
  tags instead of `next/image`.

Stage 3 and Stage 4 implication:

- Footer and homepage dead links must be fixed before visual polish is judged.
- If a route does not exist, the UI should either remove the action or mark it
  as pending in a controlled way, not link to `#`.

## Loading and State Debt

Artificial loading patterns:

- `app/page.tsx`
- `app/informasi-layanan/page.tsx`
- `app/layanan/page.tsx`
- `app/keuangan/page.tsx`
- `app/opd/page.tsx`
- `app/profile/page.tsx`
- `app/informasi/page.tsx`
- `app/informasi/berita/page.tsx`
- `app/informasi/berita/[slug]/page.tsx`
- `app/informasi/agenda/page.tsx`
- `app/informasi/foto/page.tsx`
- `app/informasi/video/page.tsx`
- `app/informasi/infografis/page.tsx`
- `app/inovasi/page.tsx`

Good patterns already present:

- Data-driven pages such as Pengumuman, Anti Hoax, and Budaya have actual async
  data loading and basic empty/error handling.
- Keuangan has skeletons shaped roughly like the page layout.

Risk:

- Fake loading makes static pages feel slower and less trustworthy.
- Stage 9 should remove fake loading. Earlier stages can remove it when touching
  a page directly.

## Mobile Risks

Highest-risk areas:

- Navbar has too many route families for a compact public-service mobile menu.
- Three global floating controls in `AiAssistant` can obscure page CTAs or
  bottom content on mobile.
- Homepage hero uses fixed `h-[420px]`, absolute text, rotated image/backing,
  and decorative leaves. This is fragile on narrow screens.
- Homepage video timeline uses an absolute center line with a two-column grid on
  desktop and dense cards on mobile.
- `LayananCarousel` uses fixed `w-48 h-56` service tiles and a continuous
  marquee. It is not a reliable mobile service directory.
- SKM modal uses large metric type and a two-column detail grid that may become
  cramped on small screens.
- OPD tab row is horizontally scrollable but categories are long, uppercase
  content is dense, and no search exists.

Stage implication:

- Mobile citizens should see identity, search, top services, and urgent
  announcements quickly. The homepage should not force users through decoration,
  video, or marquee before service discovery.

## Accessibility Risks

Observed risks:

- Many buttons and icon-only controls rely on color/shape without consistent
  visible focus treatment.
- Several custom buttons use raw `<button>` or `<a>` styling without a shared
  focus-visible contract.
- `alert()` validation in SKM is disruptive and not accessible as inline form
  feedback.
- Placeholder or decorative images sometimes use generic alt text such as
  "Berita 1", "Foto 1", or "Daun".
- Links to `#` create keyboard traps or meaningless navigation.
- Hover-only overlays in media cards may hide meaning from touch and keyboard
  users.
- The assistant uses `danger`, `warning`, and icon-only floating controls that
  can be visually confusing and may not have enough context when labels are
  hover-revealed.
- Busy yellow/red treatments can reduce contrast discipline and status meaning.

Stage implication:

- Stage 2 primitives need focus-visible, disabled, hover, active, and semantic
  variants from the start.
- Stage 9 should explicitly test keyboard navigation, 390px mobile, reduced
  motion, and contrast.

## Shared Primitive Candidates

Create these before broad page rewrites:

- `PageShell`: content width, page background, vertical rhythm, and optional
  dashboard width.
- `PageHeader`: title, description, eyebrow, actions, search/filter slot, and
  metadata slot.
- `Section`: title row, description, action slot, divider treatment, and spacing.
- `ActionCard`: service entry with icon, title, description, status, and route.
- `NoticeCard`: announcement/anti-hoax card with status, source, date, and CTA.
- `DocumentCard`: finance/report/manual card with file metadata and download
  action.
- `StatusBadge`: urgent, official, verified, information, archived, draft.
- `MetricCard`: tabular numeric value, label, source note, and trend slot.
- `EmptyState`: consistent icon, title, message, and optional recovery action.
- `FilterBar`: search input, category tabs, year select, and reset action.
- `HelpLauncher`: one consolidated entry for assistant, SKM, accessibility, and
  support pathways.
- `ContentCard`: shared article/gallery/video/infographic card with metadata.

Do not build all page-specific logic into these primitives. They should enforce
the civic visual system and interaction states, not own route data.

## Priority Findings for the Next Stages

### Stage 1 Must Fix

- Replace Inter with the chosen civic font stack.
- Wire the design tokens into Tailwind and HeroUI.
- Establish global paper/text/border/focus colors.
- Add chart/data semantic tokens.
- Add a tabular-number utility.

### Stage 2 Must Fix

- Create primitives before rewriting pages.
- Make focus, hover, disabled, active, empty, and status states consistent.
- Remove dependence on generic white bordered card styling in new work.

### Stage 3 Must Fix

- Group nav into Beranda, Layanan, Informasi, Transparansi, Budaya, OPD.
- Fix or intentionally mark footer links.
- Consolidate global floating controls.
- Preserve route slugs.

### Stage 4 Must Fix

- Replace decorative homepage structure with a civic dashboard gateway.
- Add search and top task links in the first viewport.
- Replace carousel-first service discovery with a scannable service grid.
- Remove homepage dead CTAs and placeholder news cards where possible.

### Stage 5 Through Stage 8 Must Fix

- Normalize content indexes into one official content system.
- Make Keuangan a credible transparency dashboard with source notes.
- Refactor SKM into a service flow with inline validation.
- Treat Budaya as an official regional knowledge explorer.
- Treat OPD as a searchable directory dashboard.

### Stage 9 Must Verify

- No visible production `href="#"` links remain unless documented.
- No UI validation uses `alert()`.
- Fake loading has been removed from static/local pages.
- Remaining inline design hex values are either token definitions, chart config,
  or documented data-driven colors.
- Mobile 390px, tablet 768px, desktop 1440px, keyboard focus, and reduced motion
  are checked.

## Final Stage 0 Note

Changed files for Stage 0:

- `docs/ui-audit-snapshot.md`

No application code was edited. No build was run because this stage only creates
documentation for the next implementation stages.
