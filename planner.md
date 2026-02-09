# JSONFLOW Planner

## Phase 0 — Adapter Layer (Foundation)

**Goal:** remove renderer lock‑in by introducing an adapter layer.

### Steps

1. Define engine‑output contract (renderer‑agnostic)
   - Add `EngineGraph` type (nodes + edges only).
   - Engine returns `engineGraph` alongside `graph`.

2. Add Cytoscape adapter
   - New file: `engine/adapter/cytoscape.ts`
   - Export `toCytoscape(engineGraph)`.

3. Switch client to adapter output
   - Client imports adapter instead of engine internals.
   - Engine stays renderer‑agnostic.

### Done When

- Engine outputs renderer‑agnostic `engineGraph`.
- Cytoscape mapping lives only in adapter.
- Client uses adapter for rendering.
  
Status: **Done** (engine + client wired to adapter).

---

## Phase 1 — Semantic Validation (Engine)

**Goal:** add graph logic checks beyond Zod shape validation.

### Checks (report only)

- Edge references existing nodes
- Unreachable nodes
- Start node rules (when defined)
- Cycles allowed, but detected

### Output (planned)

```ts
{
  ok: true,
  graph,
  engineGraph,
  meta: { isCyclic: true },
  semantic: [{ type: "unreachable", nodeId: "X" }]
}
```

### Done When

- Engine returns `meta.isCyclic`
- Engine returns `semantic[]` with structured issues

Status: **Done** (engine computes `meta.isCyclic` + `semantic[]`).

---

## Phase 2 — Cyclic Support (Explicit)

**Goal:** cycles are allowed and detectable.

### Steps

1. Add `meta.isCyclic` computation.
2. Optional UI badge for cyclic graphs.

### Done When

- Cycles are detected (engine)
- UI can optionally display cyclic status

Status: **Done** (engine detects cycles, UI badge shown).

---

## Phase 3 — Node Shapes (Enum‑Based)

**Goal:** allow user‑driven shapes without layout complexity.

### Schema change (implemented)

```ts
shape: z
  .enum([
    "ellipse",
    "rectangle",
    "round-rectangle",
    "diamond",
    "hexagon",
    "triangle",
  ])
  .optional()
```

### Adapter mapping (implemented)

```ts
shape: "data(shape)"
```

### Done When

- Schema accepts `shape`
- Adapter passes `shape` to Cytoscape
- Client styles render shapes

Status: **Done** (schema + adapter + client wired).

---

## Phase 4 — UI + Docs Sync

**Goal:** surface new engine features and update docs.

### Steps

- Show semantic errors in UI
- Show cyclic badge in UI (use `meta.isCyclic`)
- Document `shape` enum + example JSON
- Document `meta.isCyclic` + semantic errors
- Update docs + changelog
- Split UI parsing/render logic for SSR safety and clearer typing (Next.js 16)
- Improve cycle visualization (render loop/back edges visibly)
- Ensure render-on-demand parses latest editor text (Ctrl/Cmd+Enter)

### Done When

- UI displays semantic issues
- Docs reflect latest behavior

Status: **Done** (UI: semantic issues + cyclic badge + cycle visualization; logic segregation complete).
- Landing page refactored with video demo, feature grid, and react-icons
- Component architecture moved to `features/landing/`

---

## Phase 5 — Render Semantics (Edges + Cycles) (Future)

**Goal:** ensure cycles and edge roles are visually accurate without losing layout stability.

### Steps

1. Edge classification in render layer
   - Tree edges (first discovery)
   - Back edges (cycle edges)
   - Cross edges (optional)
2. Keep BFS layout but never drop edges
   - Render tree edges as straight arrows
   - Render back edges as curved/loop arrows
3. (Advanced) Layout-aware cycles
   - Detect SCCs (Tarjan)
   - Collapse SCCs to super-nodes for layout
   - Expand SCCs with circular layout

### Done When

- Cyclic edges are visibly distinct (no hidden loops)
- No edges are discarded during render
