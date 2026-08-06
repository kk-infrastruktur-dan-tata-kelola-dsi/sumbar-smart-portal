# Final UI QA Snapshot

Last updated: 2026-06-24

## Scope

This QA snapshot covers the staged Sumbar Smart Portal UI refactor through:

- Stage 5: content index pages
- Stage 6: finance dashboard
- Stage 7: SKM and layanan
- Stage 8: budaya, OPD, and inovasi
- Stage 9: cleanup pass

## Automated Checks

Commands run during cleanup:

```bash
rg 'href="#"' app components
rg 'alert\(|window.alert' app components
rg '#[0-9A-Fa-f]{3,8}' app components
rg 'setTimeout\(' app components
pnpm build
```

Current results before final build:

- `href="#"`: no matches in `app` or `components`.
- `alert()` / `window.alert`: no matches in `app` or `components`.
- Raw hex colors in `app` or `components`: no matches.
- `setTimeout()`: remaining matches are interaction or animation timers:
  - `components/carousel.tsx`: resize, drag, and carousel animation timing.
  - `components/MinangQuote.tsx`: quote fade timing.
  - `components/TopProgress.tsx`: route progress timing.

## Page Checks

- Homepage: uses civic dashboard structure, real internal routes, and no dead CTAs.
- Content pages: berita, pengumuman, agenda, foto, video, and infografis now share headers, cards, status labels, and empty/data notes.
- Finance: no fake loading; charts use token colors, source notes, and honest document availability states.
- SKM and layanan: no `alert()`; validation is inline and accessible; manual book remains available.
- Budaya: map/list/detail behavior preserved; build-time debug logging removed; category filters use text and icons instead of emoji UI.
- OPD: converted to a directory dashboard with tokenized category filters.
- Inovasi: converted to official service cards with clear external-link treatment.
- Error and file-preview states: tokenized and localized.

## Mobile And Accessibility Notes

- Layouts use responsive grids, constrained containers, and shared focus-ring utilities.
- Primary controls have visible focus styles through `civic-focus-ring`.
- Floating help was consolidated earlier into one launcher to reduce mobile overlap risk.
- Red is reserved for urgent/danger states; finance and public information use gold, blue, and green according to semantic role.

## Remaining Limitations

- Some media assets are still placeholders and need official photo/infographic replacements.
- SKM values and several content datasets remain static/mock until connected to official APIs.
- The Budaya map depends on Leaflet and OpenStreetMap tiles at runtime; offline or blocked network conditions will affect map rendering.
- Manual browser viewport QA at 390px, 768px, and 1440px should still be performed in the running dev server before release.
