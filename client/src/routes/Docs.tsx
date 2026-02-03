const sections = [
  { id: "intro", label: "Intro" },
  { id: "schema", label: "Schema" },
  { id: "flow", label: "Flowchart" },
  { id: "sequence", label: "Sequence" },
  { id: "styles", label: "Link Styles" },
  { id: "engine", label: "Engine" },
  { id: "client", label: "Client UI" },
];

export default function Docs() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-8 py-10 md:grid-cols-[220px_1fr]">
        <aside className="sticky top-8 h-fit rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Docs Index
          </p>
          <nav className="flex flex-col gap-2 text-sm text-slate-600">
            {sections.map((section) => (
              <a
                key={section.id}
                className="rounded-lg px-3 py-2 hover:bg-white hover:text-slate-900"
                href={`#${section.id}`}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="space-y-10">
          <section id="intro" className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              JSONFLOW Docs
            </p>
            <h1 className="text-4xl font-semibold">Schema-Aware Diagrams</h1>
            <p className="text-slate-600">
              JSONFLOW transforms JSON into Cytoscape-ready graphs. The engine
              validates input, the parser prepares renderable elements, and the
              client renders them without a backend.
            </p>
          </section>

          <section id="schema" className="space-y-3">
            <h2 className="text-2xl font-semibold">Schema</h2>
            <p className="text-slate-600">
              The graph schema defines nodes, edges, and layout direction. The
              engine defaults the graph type to <span className="font-mono">flow</span>.
            </p>
            <pre className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700">
{`{
  "type": "flow",
  "layout": { "direction": "LR" },
  "nodes": [{ "id": "A", "label": "Start" }],
  "edges": [{ "from": "A", "to": "B", "kind": "next" }]
}`}
            </pre>
          </section>

          <section id="flow" className="space-y-3">
            <h2 className="text-2xl font-semibold">Flowchart</h2>
            <p className="text-slate-600">
              Flow is the default. Nodes are steps, edges are execution order.
            </p>
          </section>

          <section id="sequence" className="space-y-3">
            <h2 className="text-2xl font-semibold">Sequence</h2>
            <p className="text-slate-600">
              Sequence diagrams are renderable but still use flow layout in the
              client. Dedicated layout rules are planned.
            </p>
          </section>

          <section id="styles" className="space-y-3">
            <h2 className="text-2xl font-semibold">Link Styles</h2>
            <p className="text-slate-600">
              Use <span className="font-mono">link_type</span> to control line
              style and arrow shape.
            </p>
          </section>

          <section id="engine" className="space-y-3">
            <h2 className="text-2xl font-semibold">Engine</h2>
            <p className="text-slate-600">
              The engine validates JSON with Zod, then outputs Cytoscape nodes
              and edges. It is headless and UI-agnostic.
            </p>
          </section>

          <section id="client" className="space-y-3">
            <h2 className="text-2xl font-semibold">Client UI</h2>
            <p className="text-slate-600">
              The client uses Monaco for editing and Cytoscape for rendering.
              Export is available as PNG.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
