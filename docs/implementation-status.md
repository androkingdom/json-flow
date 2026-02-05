# Implementation Status (Minimal)

## Current Focus

- UI polish (badges, schema/semantic messaging, layout tweaks).
- Docs refresh for shapes + semantic output.
- Renderer registry integration and additional renderer support.

## UI Layout

- Componentized layout: `Header`, `Workspace` (Editor + Visual), `Footer`.
- Docs route served under `/docs` (opened in new tab from header).

## TODO / Plan

1. Finish Next.js client parity with old Vite UI (docs polish, layout tuning).
2. Cytoscape adapter layer (engine output → adapter → renderer). (Done)
3. Map `link_type` values to Cytoscape edge styles (engine + client). (Done)
4. Add example JSON for each diagram type in docs. (In progress)
5. Add parser rules per `GraphSchema.type` (`sequence`, `flow`, `graph`) beyond basic mapping.
6. Add semantic validation reporting (cycle detection, unreachable nodes). (Done)
7. Add validation errors and UX messages in the editor layer. (Done)
8. Add node `shape` support (schema + engine + client styles). (Done)
9. Split UI parsing/validation and rendering responsibilities for SSR safety. (Done)
10. Improve cycle visualization (back-edge loop styling). (Done)

## Layer Status

- Editor Layer: in progress (Next.js + Monaco, componentized)
- Logic Layer: solid (Zod + semantic validation)
- Parser Layer: solid (adapter conversion)
- Visualization Layer: solid (Cytoscape client + semantic UI + loop styling)
- Layout Layer: basic (breadthfirst + direction transform)

## Testing

- Engine: basic Vitest coverage (parse + default type)

## Packaging

- Engine published as `@andro.dev/jsonflow-engine`
- Client consumes the published package

## Live

- Client: https://json-flow-client.vercel.app/

## Backlog

- Add example JSON for each diagram type in docs
- Advanced cycle layout (SCC collapse/expand)
