# Sumbar Smart Portal Design System

Last updated: 2026-06-23

## Design Read

This project should read as a modern public-sector service portal for citizens,
businesses, researchers, journalists, and provincial staff. The visual language
should feel official, calm, local, and trustworthy. It should not feel like a
generic hackathon landing page, a yellow/red template, or an experimental agency
site.

Target dials:

- Design variance: 4 out of 10. Structured and civic, with selective cultural detail.
- Motion intensity: 2 out of 10. Functional transitions only.
- Visual density: 6 out of 10. Citizens need fast scanning, not empty luxury spacing.

## Cultural Research Foundation

The design direction is rooted in Minangkabau and West Sumatra identity:

- West Sumatra is the homeland of Minangkabau culture, and the official provincial
  portal already centers civic services, announcements, transparency documents,
  PPID, IPKD, anti-hoax, OPD, and public-service links.
- Rumah Gadang is the strongest architectural signal. Its gonjong roof, timber
  construction, communal meeting function, and ceremonial role should inspire
  structure, rhythm, and subtle geometry, not literal clip-art decoration.
- Minangkabau society is widely described as matrilineal, with land and family
  continuity passing through women. For UI, this argues for stability, continuity,
  and clear lineage of information.
- The Minangkabau principle "adat basandi syarak, syarak basandi Kitabullah"
  connects custom, religion, and public ethics. For UI, this argues for honesty,
  restraint, and no fake metrics or ornamental claims.
- Nagari and deliberation culture should inform navigation: group information by
  public task and civic decision, not by arbitrary visual sections.
- Songket and Rumah Gadang carvings use nature-based motifs such as bamboo shoots,
  fern curves, roots, vines, and returning ducks. Use these as low-contrast
  pattern ideas for dividers, empty states, and map/category surfaces.
- West Sumatra landscape identity includes highlands, volcanoes, rice fields,
  valleys, coastline, and sea routes. The palette should combine warm ceremonial
  gold with forest, stone, and ocean neutrals.

Research sources:

- Official provincial portal IA and service references: https://sumbarprov.go.id/
- Rumah Gadang architecture and symbolism: https://en.wikipedia.org/wiki/Rumah_Gadang
- Minangkabau culture overview: https://en.wikipedia.org/wiki/Minangkabau_culture
- West Sumatra overview, motto, emblem, and cultural context: https://en.wikipedia.org/wiki/West_Sumatra
- Songket Minangkabau motifs and craft context: https://en.wikipedia.org/wiki/Songket
- Minangkabau people and matrilineal context: https://en.wikipedia.org/wiki/Minangkabau_people

## Design Principles

### 1. Civic First, Cultural Second

Every page must answer: what can the citizen do here? Culture should support
orientation and trust, not compete with services.

Good:

- "Ajukan permohonan informasi publik"
- "Cek pengumuman resmi"
- "Lihat laporan keuangan daerah"
- "Laporkan informasi mencurigakan"

Bad:

- Decorative cultural text with no service action
- Hero imagery without task entry points
- Pattern overlays that reduce readability

### 2. One Province, One System

All routes must share the same typography, container width, color tokens, radius,
shadow, nav behavior, and card treatment. Page-specific themes are allowed only
for semantic contexts:

- Anti Hoax: use red as danger/trust-critical accent.
- Keuangan: use data blue and green for charts.
- Budaya: use nature green and gold, with stronger imagery.
- Pengumuman: use amber for official notice, red only for urgent status.

### 3. Trust Beats Decoration

Use real links, real dates, real source labels, real document names, and clear
status. Dead `#` links and fake placeholder metrics are design bugs.

### 4. Modern Government, Not Corporate SaaS

Avoid purple/blue AI gradients, glass panels, random bento cards, excessive
rounded pills, floating decorative badges, and fake dashboard previews. This is
not a startup product page.

### 5. Mobile Citizens Are Primary

The mobile homepage should surface:

1. Portal identity and search.
2. Top services.
3. Urgent announcements.
4. Public transparency shortcuts.
5. AI/help entry point, collapsed into one launcher.

## Brand Personality

Use these words when making design decisions:

- Reliable
- Warm
- Deliberative
- Local
- Accessible
- Documented
- Direct

Avoid these words in visible copy:

- Elevate
- Seamless
- Next-gen
- Revolutionize
- Unleash
- Smart solution

## Palette Strategy

The current implementation overuses bright yellow and red. Replace it with a
more controlled civic palette:

- Primary brand: muted ceremonial gold, inspired by songket and official accents.
- Heritage accent: deep marawa red, reserved for cultural emphasis and serious
  attention states.
- Nature accent: highland green, reserved for success, culture, maps, environment.
- Information accent: ocean blue, reserved for data, links, and public info.
- Surfaces: warm off-white, stone, and white. Avoid pure white everywhere.
- Text: deep charcoal, never pure black.

Use one dominant accent per page. Do not mix gold, red, green, and blue in the
same content block unless the values are semantic data categories.

## Typography

Recommended stack:

- UI and body: Plus Jakarta Sans
- Display: Plus Jakarta Sans or Geist
- Data and numbers: Geist Mono or Fira Code with tabular numerals

Rules:

- Replace Inter as the default brand font.
- Use sentence case for headings.
- Avoid tight negative tracking on normal civic headings.
- Keep body copy around 65 characters per line.
- Use tabular numbers for APBD, SKM, percentages, and counters.

## Layout System

Base layout:

- Page max width: 1200px for content pages.
- Wide max width: 1320px for homepage and data dashboards.
- Reading max width: 760px for articles and policy text.
- Standard page padding: 24px mobile, 32px tablet, 40px desktop.
- Section rhythm: 48px mobile, 72px desktop.

Homepage structure:

1. Hero service gateway.
2. Priority service grid.
3. Official announcements and anti-hoax strip.
4. Latest news with real source metadata.
5. Transparency and finance links.
6. Culture and tourism gateway.
7. Help footer.

Avoid:

- Full-width bright yellow sections.
- Repeating three equal card rows.
- Centered page header on every route.
- Random rotated hero image treatments.
- Floating decorative leaves on top of critical content.

## Component Rules

### Navigation

Group the top nav into fewer items:

- Beranda
- Layanan
- Informasi
- Transparansi
- Budaya
- OPD

Move lower-priority links into dropdowns or footer groups. Desktop nav must stay
one line. Mobile nav must expose search and top services first.

### Buttons

Use three button types:

- Primary: official action, gold background, dark text or white text only if contrast passes.
- Secondary: white or stone surface with border.
- Tertiary: text link with underline on hover.

Do not use dead buttons. If no route exists, disable it and label it as coming
soon in development only.

### Cards

Cards are for independent objects: announcements, reports, service entries,
news items, culture destinations. Use a consistent radius and shadow.

Avoid using cards inside cards. Avoid making every section a card.

### Status

Use semantic status colors:

- Urgent: red
- Official notice: gold
- Verified/complete: green
- Information: blue
- Neutral draft/archive: stone

### Patterns

Use cultural patterns only as low-contrast support:

- Gonjong angle: section divider, empty state frame, hero bottom mask.
- Songket lattice: subtle background in footer or data panels.
- Pucuak rabuang triangle rhythm: list separators or small illustration accents.
- Itiak pulang patang movement: onboarding/progress step flow.

Never place busy cultural patterns behind body text.

## Accessibility Rules

- All body text must pass WCAG AA contrast.
- Buttons and links must have visible focus states.
- Do not rely on color alone for status.
- Respect reduced motion.
- No hover-only information.
- No `window.alert()` for form validation.
- Floating help buttons must not cover content on mobile.

## Motion Rules

Motion should communicate state, not decoration:

- Nav dropdown: 150ms opacity/translate.
- Button press: 100ms scale or translate.
- Cards: subtle background or border shift.
- Skeletons: only during real async loading.
- Marquee: avoid unless user can pause and reduced motion disables it.

No scroll hijacking, parallax, or constant animation for this project.

## Content Voice

Use plain Indonesian. Be direct and official without sounding cold.

Preferred:

- "Lihat laporan keuangan daerah"
- "Cek pengumuman resmi"
- "Ajukan permohonan informasi publik"
- "Klarifikasi informasi sebelum dibagikan"

Avoid:

- "Portal digital yang menghubungkan pemerintah dan masyarakat" as the only hero message.
- "Melayani dengan teknologi, berinovasi untuk masa depan" as generic footer copy.
- Fake urgency, fake counters, and fake-perfect percentages unless sourced.

## Migration Priority

1. Define tokens in Tailwind/HeroUI and CSS variables.
2. Replace global font.
3. Rebuild navbar grouping and footer links.
4. Recompose homepage around top citizen tasks.
5. Normalize cards, buttons, and page headers.
6. Remove fake loading timers.
7. Replace dead links and placeholder images.
8. Audit mobile layout and floating assistant controls.

