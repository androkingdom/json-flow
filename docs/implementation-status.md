# Implementation Status (Minimal)

## Current Focus

- Flowchart-first rendering (engine + client).
- Migrate client to Next.js 16 (App Router) in `jsonflow-web/`.
- Add dark/light mode toggle and docs route.

## UI Layout

- Next.js UI in progress with componentized layout.
- Header, Workspace (Editor + Visual), Footer.
- Docs route served under `/docs` (opens in new tab from header).

## TODO / Plan

1. Complete Next.js client migration.
2. Map `link_type` values to Cytoscape edge styles.
3. Add example JSON for each diagram type.
4. Add parser rules per `GraphSchema.type` (`sequence`, `flow`, `graph`) beyond basic mapping.
5. Add validation errors and UX messages in the editor layer.

## Layer Status

- Editor Layer: in progress (Next.js + Monaco, componentized)
- Logic Layer: partial (Zod schema + validation)
- Parser Layer: partial (basic Cytoscape conversion)
- Visualization Layer: in progress (Cytoscape client, componentized)
- Layout Layer: not started

## Testing

- Engine: basic Vitest coverage (parse + default type)

## Packaging

- Engine published as `@andro.dev/jsonflow-engine`
- Client consumes the published package

## Live

- Client: https://json-flow-client.vercel.app/

## Backlog

- Add node `shape` support (schema + engine + client styles)
