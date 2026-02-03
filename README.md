# JSONFLOW

Schema-aware engine + client for turning JSON into Cytoscape-ready diagrams.

Live: https://json-flow-client.vercel.app/

## Packages

- `engine/` — `@andro.dev/jsonflow-engine` (Zod validation + parser)
- `client/` — React + Monaco + Cytoscape UI
- `docs/` — project docs

## Quick Start

```bash
pnpm install
pnpm -C client dev
```

## Engine

```bash
pnpm -C engine build
pnpm -C engine test
```

## Client

```bash
pnpm -C client dev
pnpm -C client build
```
