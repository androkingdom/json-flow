# JSONFLOW Engine

Schema-aware engine for validating JSON graphs and producing Cytoscape-ready elements.

## What It Does

- Validates JSON via Zod schemas
- Outputs Cytoscape-compatible nodes and edges
- Headless: no UI required

## Install (local)

```bash
pnpm -C engine install
```

## Build

```bash
pnpm -C engine build
```

## Test

```bash
pnpm -C engine test
```

## Usage

```ts
import { Engine } from "jsonflow-engine";

const engine = new Engine();
const result = engine.parse({
  type: "flow",
  nodes: [{ id: "A" }, { id: "B" }],
  edges: [{ from: "A", to: "B" }],
});

if (result.ok) {
  console.log(result.cytoscape);
}
```

## Schema (Summary)

- Graph: `type`, `layout.direction`, `nodes`, `edges`
- Node: `id`, `label`, `type`, `kind`, `properties`
- Edge: `from`, `to`, `label`, `kind`, `link_type`

See `docs/diagram-spec.md` for details.
