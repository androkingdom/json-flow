# JSONFLOW Engine

Schema-aware engine for validating JSON graphs and producing renderer-agnostic graph data.

## What It Does

- Validates JSON via Zod schemas
- Outputs an engine graph (nodes + edges)
- Optional Cytoscape adapter for renderer output
- Headless: no UI required

## Install (local)

```bash
pnpm -C engine install
```

## Install (package)

```bash
pnpm add @andro.dev/jsonflow-engine
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
import { Engine, toCytoscape } from "@andro.dev/jsonflow-engine";

const engine = new Engine();
const result = engine.parse({
  type: "flow",
  nodes: [{ id: "A" }, { id: "B" }],
  edges: [{ from: "A", to: "B" }],
});

if (result.ok) {
  console.log(result.engineGraph);
  console.log(result.meta.isCyclic);
  const cytoscape = toCytoscape(result.engineGraph);
  console.log(cytoscape);
}
```

## Schema (Summary)

- Graph: `type`, `layout.direction`, `nodes`, `edges`
- Node: `id`, `label`, `type`, `kind`, `shape`, `properties`
- Edge: `from`, `to`, `label`, `kind`, `link_type`

See `docs/diagram-spec.md` for details.
