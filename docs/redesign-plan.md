# Sumbar Smart Portal Redesign Plan

Last updated: 2026-06-23

## Objective

Create a consistent, modern, professional public-service portal for Pemerintah
Provinsi Sumatera Barat. Preserve the existing information architecture where
possible, but change the visual system, homepage composition, and component
rules so the product no longer feels like stitched demo pages.

## Non-Negotiables

- Do not change route slugs without explicit approval.
- Do not remove public-service routes.
- Do not hide PPID, Pengumuman, Anti Hoax, Keuangan Daerah, OPD, or service links.
- Do not invent fake official metrics.
- Do not use decorative culture motifs where they reduce readability.
- Do not start or stop the user's dev server unless asked.

## Current Design Problems

1. Token debt
   - Colors, shadows, radii, and typography are embedded directly in components.
   - Tailwind config only extends fonts.
   - HeroUI theme is not customized to the province identity.

2. Homepage composition
   - No strong civic service gateway.
   - CTAs are buttons with no destination.
   - Hero image treatment is decorative, not task-oriented.
   - News and announcements include placeholder links.

3. Navigation overload
   - Too many top-level items.
   - Desktop uses two nav zones and a quote area.
   - Mobile menu does not prioritize top citizen tasks.

4. Component inconsistency
   - HeroUI components, raw HTML, inline SVG, Lucide icons, raw img tags, and
     one-off styles are mixed.
   - Cards repeat `border border-gray-200 shadow-sm` without hierarchy.
   - Pages use the same centered heading template regardless of content type.

5. Interaction and trust issues
   - Dead `#` links.
   - Artificial `setTimeout` loading on mostly static pages.
   - Floating assistant/survey/accessibility buttons compete with content.
   - `window.alert()` is used for validation in the SKM page.

## Target Information Architecture

Keep the existing route family, but reframe the navigation:

- Beranda
- Layanan
  - Survey Kepuasan Masyarakat
  - PPID
  - SPJ Online
  - PPDB Online
  - SIMPEG
  - JDIH
  - Dashboard Pembangunan
- Informasi
  - Berita
  - Pengumuman
  - Agenda
  - Foto
  - Video
  - Infografis
  - Anti Hoax
- Transparansi
  - Keuangan Daerah
  - Akuntabilitas
  - IPKD
  - Dokumen
- Budaya
- OPD

## Homepage Plan

### Section 1: Hero Service Gateway

Purpose: immediately show identity and top actions.

Content:

- H1: "Portal resmi Provinsi Sumatera Barat"
- Short supporting text: max 18 words.
- Search input: "Cari layanan, pengumuman, dokumen..."
- Top task buttons:
  - Pengumuman resmi
  - PPID
  - Keuangan daerah
  - Anti Hoax

Visual:

- Warm off-white or stone background.
- Right-side visual can use real West Sumatra landscape or a restrained Rumah
  Gadang crop.
- Use a subtle gonjong-shaped divider, not decorative floating leaves.

### Section 2: Priority Services

Purpose: route citizens quickly.

Layout:

- 2x3 or 3x2 service grid on desktop.
- Single list on mobile.
- Each item has icon, title, one-line description, and direct destination.

Recommended services:

- Pengumuman
- PPID
- Survey Kepuasan Masyarakat
- Keuangan Daerah
- Anti Hoax
- OPD

### Section 3: Official Updates

Purpose: combine announcements and news without overwhelming.

Layout:

- Left: urgent/official announcements.
- Right: latest news.
- Use real source metadata, date, and department.

### Section 4: Transparency

Purpose: make public accountability visible.

Content:

- Keuangan Daerah
- IPKD
- Akuntabilitas
- Rencana Strategis

Visual:

- Data cards with tabular numbers.
- No fake charts unless backed by existing data.

### Section 5: Culture and Region

Purpose: expose culture without making the entire portal decorative.

Content:

- Budaya Sumbar
- Peta budaya
- Wisata/tradisi/kuliner categories

Visual:

- Use image-led layout.
- Cultural patterns as divider accents only.

### Section 6: Help and Feedback

Purpose: consolidate assistant, accessibility, survey, and support.

Content:

- Tanyo Mamak
- Survey Kepuasan Masyarakat
- Kontak Diskominfotik
- LAPOR or complaint pathway where available

## Page Type Templates

### Content Index

Used for berita, pengumuman, agenda, foto, video, infografis.

Structure:

- Page header with title, description, and optional filter.
- Featured/current item if relevant.
- Grid or list of items.
- Pagination.
- Empty state.

### Public Service Page

Used for SKM and future service flows.

Structure:

- Task-focused header.
- Requirements or summary.
- Primary action.
- Secondary support documents.
- Validation and error states.

### Data/Transparency Page

Used for keuangan and accountability.

Structure:

- Year/filter controls.
- Key metrics.
- Reports/documents.
- Charts with source note.
- Download actions.

### Culture Explorer

Used for budaya.

Structure:

- Search and category filters.
- Map plus list.
- Detail dialog/page.
- Cultural source notes where data is editorial.

## Implementation Phases

### Phase 1: Foundations

- Add semantic design tokens to Tailwind and HeroUI.
- Replace Inter with Plus Jakarta Sans or Geist.
- Create shared primitives:
  - `PageShell`
  - `PageHeader`
  - `Section`
  - `ServiceCard`
  - `NoticeCard`
  - `DocumentCard`
  - `StatusBadge`
  - `EmptyState`

### Phase 2: Shell

- Rebuild navbar grouping.
- Replace two-row desktop nav with one responsive header.
- Consolidate floating controls into one help launcher.
- Fix footer links and group legal/service/contact links.

### Phase 3: Homepage

- Recompose the homepage according to the plan in this document.
- Replace dead buttons with real links.
- Replace placeholder news images or remove image dependency.
- Move service carousel into a usable service grid or searchable service section.

### Phase 4: High-Impact Routes

1. Pengumuman
2. Informasi/Berita
3. Keuangan Daerah
4. Anti Hoax
5. Budaya
6. OPD

### Phase 5: Cleanup

- Remove fake loading timers where data is static/local.
- Replace inline SVG icons with one icon family.
- Replace raw `img` with `next/image` where appropriate.
- Remove unused color/style helpers.
- Audit mobile and keyboard navigation.

## Acceptance Checklist

Before considering the redesign done:

- One token system is used across all public pages.
- Navigation fits one line at desktop.
- Mobile homepage shows top citizen tasks without scrolling far.
- No dead `href="#"` links in visible UI.
- No artificial loading timers on static pages.
- Every interactive element has hover, focus, disabled, and active states.
- Red is only urgent/danger/anti-hoax.
- Gold is the primary official accent.
- Cultural motifs are subtle and never placed behind body text.
- Footer links resolve to real routes or are visibly disabled until available.
- Body text contrast passes WCAG AA.

## Suggested First PR

Scope:

- Add tokens to Tailwind/HeroUI.
- Add shared primitives.
- Update font.
- Refactor navbar/footer only.

Do not include homepage redesign in the same PR. Shell consistency should be
reviewed first because it affects every route.

