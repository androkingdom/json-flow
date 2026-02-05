# Diagram Spec (Minimal)

## JSON Schema (Hints)

```ts
const NodeSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
  type: z.string().optional(),
  kind: z
    .enum(["actor", "lifeline", "message", "activity", "state", "class"])
    .optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
});

const EdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  label: z.string().optional(),
  kind: z
    .enum(["next", "call", "return", "async", "transition", "inherit", "association"])
    .optional(),
  link_type: z
    .enum(["solid", "dash", "dot", "double", "bold", "arrow", "open-arrow"])
    .optional(),
});

const GraphSchema = z.object({
  type: z.enum(["graph", "sequence", "flow"]).default("flow"),
  layout: z.object({ direction: z.enum(["LR", "RL", "TB", "BT"]).default("LR") }).optional(),
  nodes: z.array(NodeSchema),
  edges: z.array(EdgeSchema),
});
```

## Rendering Rules (Minimal)

- `type: "sequence"`:
- `kind: "actor" | "lifeline"` are participants
- `edges` render in order as messages
- `kind` defines execution meaning (call/return/async)
- `link_type` controls edge style (solid, dash, etc.)

- `type: "flow"`:
- nodes render as steps
- edges render as flow links
- `kind` defines execution meaning (next/transition)
- `link_type` controls edge style

- `type: "graph"`:
- generic graph render (Cytoscape default)

## Client UI (Minimal)

- Monaco editor for JSON input
- Cytoscape renders engine output
- Tailwind-based layout and styling
- Next.js client (App Router)
  - Componentized layout: Header + Workspace + Footer
  - `/docs` route for documentation
  - Theme toggle via CSS variables (`.dark` on `html`)

## Rendering Adapter (Planned)

- Introduce an adapter layer between engine output and Cytoscape.
- Goal: isolate renderer changes without breaking schema/engine.

## Future (Planned)

- Node `shape` support (ellipse, diamond, etc.) with schema + renderer mapping
