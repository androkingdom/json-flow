# Implementation Status (Minimal)

## Current Focus

- Flowchart-first rendering (engine + client).

## UI Layout

- Editor and Visualizer are side-by-side on medium+ screens.
- Sidebar removed; schema help is via tooltip in the editor header.

## TODO / Plan

1. Map `link_type` values to Cytoscape edge styles.
2. Add example JSON for each diagram type.
3. Add parser rules per `GraphSchema.type` (`sequence`, `flow`, `graph`) beyond basic mapping.
4. Add validation errors and UX messages in the editor layer.

## Layer Status

- Editor Layer: in progress (React + Monaco)
- Logic Layer: partial (Zod schema + validation)
- Parser Layer: partial (basic Cytoscape conversion)
- Visualization Layer: in progress (Cytoscape client)
- Layout Layer: not started

## Testing

- Engine: basic Vitest coverage (parse + default type)

## Packaging

- Engine published as `@andro.dev/jsonflow-engine`
- Client consumes the published package

## Live

- Client: https://json-flow-client.vercel.app/
