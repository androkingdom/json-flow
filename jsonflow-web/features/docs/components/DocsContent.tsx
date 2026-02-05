"use client";

import { useState } from "react";

const sections = [
  { id: "intro", label: "Intro" },
  { id: "schema", label: "Schema" },
  { id: "shapes", label: "Node Shapes" },
  { id: "semantic", label: "Semantic Checks" },
  { id: "quickstart", label: "Quickstart" },
  { id: "flow", label: "Flow Diagram" },
  { id: "sequence", label: "Sequence (Beta)" },
  { id: "styles", label: "Link Styles" },
  { id: "layout", label: "Layout Direction" },
  { id: "engine", label: "Engine API" },
  { id: "renderer", label: "Renderer" },
];

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute right-3 top-3 cursor-pointer rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
        onClick={handleCopy}
        type="button"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="rounded-2xl border p-5 text-xs" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
        {code}
      </pre>
    </div>
  );
};

export default function DocsContent() {
  return (
    <div className="grid w-full gap-6 px-6 py-8 md:grid-cols-[220px_1fr]">
      <aside className="sticky top-6 h-fit rounded-xl border p-4 text-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
          Docs Index
        </p>
        <nav className="flex flex-col gap-1">
          {sections.map((section) => (
            <a
              key={section.id}
              className="rounded-lg px-2 py-2 cursor-pointer"
              style={{ color: 'var(--text-secondary)' }}
              href={`#${section.id}`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="space-y-8" style={{ color: 'var(--text-primary)' }}>
        <section id="intro" className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
            JSONFLOW Docs
          </p>
          <h1 className="text-3xl font-semibold">Schema-Aware Diagrams</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            JSONFLOW transforms JSON into Cytoscape-ready graphs. The engine
            validates input, the parser prepares renderable elements, and the
            client renders them without a backend.
          </p>
        </section>

        <section id="schema" className="space-y-3">
          <h2 className="text-2xl font-semibold">Schema</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            The graph schema defines nodes, edges, and layout direction. The
            engine defaults the graph type to{" "}
            <span className="font-mono">flow</span>.
          </p>
          <CodeBlock code={`{
  "type": "flow",
  "layout": { "direction": "LR" },
  "nodes": [
    { "id": "A", "label": "Start" },
    { "id": "B", "label": "Next" }
  ],
  "edges": [{ "from": "A", "to": "B", "kind": "next" }]
}`} />
        </section>

        <section id="shapes" className="space-y-3">
          <h2 className="text-2xl font-semibold">Node Shapes</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Optional <span className="font-mono">shape</span> controls the node
            body. Supported values: ellipse, rectangle, round-rectangle,
            diamond, hexagon, triangle.
          </p>
          <CodeBlock code={`{
  "nodes": [
    { "id": "A", "label": "Start", "shape": "ellipse" },
    { "id": "B", "label": "Decision", "shape": "diamond" }
  ],
  "edges": [{ "from": "A", "to": "B" }]
}`} />
        </section>

        <section id="semantic" className="space-y-3">
          <h2 className="text-2xl font-semibold">Semantic Checks</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            The engine reports structured semantic issues and cycle metadata.
          </p>
          <CodeBlock code={`{
  "ok": true,
  "engineGraph": { "nodes": [...], "edges": [...] },
  "meta": { "isCyclic": true },
  "semantic": [
    { "type": "edge-missing-node", "missing": "X" },
    { "type": "unreachable-node", "nodeId": "C" }
  ]
}`} />
        </section>

        <section id="quickstart" className="space-y-3">
          <h2 className="text-2xl font-semibold">Quickstart</h2>
          <ol className="list-decimal space-y-2 pl-5" style={{ color: 'var(--text-secondary)' }}>
            <li>Paste JSON in the editor.</li>
            <li>Click Render.</li>
            <li>Export PNG from the preview panel.</li>
          </ol>
        </section>

        <section id="flow" className="space-y-3">
          <h2 className="text-2xl font-semibold">Flow Diagram</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Flow is the default. Nodes are steps, edges are execution order.
          </p>
          <CodeBlock code={`{
  "type": "flow",
  "nodes": [
    { "id": "A", "label": "Start" },
    { "id": "B", "label": "Validate" },
    { "id": "C", "label": "Render" }
  ],
  "edges": [
    { "from": "A", "to": "B", "kind": "next", "link_type": "solid" },
    { "from": "B", "to": "C", "kind": "next", "link_type": "arrow" }
  ]
}`} />
        </section>

        <section id="sequence" className="space-y-3">
          <h2 className="text-2xl font-semibold">Sequence (Beta)</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Sequence diagrams are renderable but still use flow layout in the
            client. Dedicated layout rules are planned.
          </p>
        </section>

        <section id="styles" className="space-y-3">
          <h2 className="text-2xl font-semibold">Link Styles</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Use <span className="font-mono">link_type</span> to control line
            style and arrow shape.
          </p>
        </section>

        <section id="layout" className="space-y-3">
          <h2 className="text-2xl font-semibold">Layout Direction</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Control orientation with{" "}
            <span className="font-mono">layout.direction</span>.
          </p>
        </section>

        <section id="engine" className="space-y-3">
          <h2 className="text-2xl font-semibold">Engine API</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            The engine validates JSON with Zod, then outputs renderer-agnostic
            graph data. Use the adapter to map to a renderer (Cytoscape today).
          </p>
          <CodeBlock code={`import { Engine, toCytoscape } from "@andro.dev/jsonflow-engine";

const engine = new Engine();
const result = engine.parse(input);

if (result.ok) {
  const elements = toCytoscape(result.engineGraph);
}`} />
        </section>

        <section id="renderer" className="space-y-3">
          <h2 className="text-2xl font-semibold">Renderer</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            The client uses a renderer registry so additional renderers can be
            added without changing engine output.
          </p>
        </section>
      </main>
    </div>
  );
}
