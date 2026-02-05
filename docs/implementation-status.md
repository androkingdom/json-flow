# Implementation Status (Minimal)

## Current Focus

- Flowchart-first rendering (engine + client).
- Next.js client (App Router) stabilization in `jsonflow-web/`.
- Theme toggle + CSS-variable theming (light/dark).
- Docs route in Next client.
- Add Cytoscape adapter layer to isolate rendering dependency.

## UI Layout

- Componentized layout: `Header`, `Workspace` (Editor + Visual), `Footer`.
- Docs route served under `/docs` (opened in new tab from header).

## TODO / Plan

1. Finish Next.js client parity with old Vite UI (docs polish, layout tuning).
2. Introduce a Cytoscape adapter (engine output → adapter → renderer).
3. Map `link_type` values to Cytoscape edge styles (engine + client).
4. Add example JSON for each diagram type in docs.
5. Add parser rules per `GraphSchema.type` (`sequence`, `flow`, `graph`) beyond basic mapping.
6. Add semantic validation reporting (cycle detection, unreachable nodes).
7. Add validation errors and UX messages in the editor layer.

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
