# Sumbar Smart Portal

Sumbar Smart Portal is a **24-hour project** built during the **Firetech Event by Neotelemetri in 2025**.

## Team

Team members are listed from repository contributors:

- abrar
- nabilrn
- Nabil
- Radithya21
- rmdsftr

## Stack

- Next.js
- React
- TypeScript
- HeroUI
- Tailwind CSS

## Development

```bash
pnpm install
pnpm dev
```

## Design Modernization Context

Before redesigning UI, read:

- `docs/design-system.md`
- `docs/redesign-plan.md`
- `docs/agent-handoff.md`
- `docs/ui-refactor-stages.md`
- `config/design-tokens.ts`

These files define the West Sumatra / Minangkabau-informed civic design direction,
token strategy, staged implementation prompts, and handoff instructions for
future agents.

## Environment Variables

| Key | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for the Tanyo Mamak AI assistant (server-side). |
| `NEXT_PUBLIC_MAP_DEBUG` | No | Set to `1` to enable map debug logging on the Budaya page. |

Copy `.env.local.example` to `.env.local` for local development.

## Docker Deployment

```bash
docker build -t sumbar-smart-portal .
docker run --rm -p 3000:3000 -e GEMINI_API_KEY=your-key sumbar-smart-portal
```

The container runs as a non-root `nextjs` user and listens on `0.0.0.0:3000`.

## MyPaas Settings

| Field | Value |
|---|---|
| Deployment mode | **Dockerfile** |
| App port | **3000** |
| Environment keys | `GEMINI_API_KEY` (required), `NEXT_PUBLIC_MAP_DEBUG` (optional) |

## Vercel Deployment

This project is configured for Vercel (Next.js with API routes and middleware).

Required environment variable:

- `GEMINI_API_KEY`

Deploy by importing this repository into Vercel and setting the environment variable in Project Settings.
