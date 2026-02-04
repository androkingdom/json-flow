const sections = [
  { id: "intro", label: "Intro" },
  { id: "schema", label: "Schema" },
  { id: "quickstart", label: "Quickstart" },
  { id: "flow", label: "Flow Diagram" },
  { id: "sequence", label: "Sequence (Beta)" },
  { id: "styles", label: "Link Styles" },
  { id: "layout", label: "Layout Direction" },
  { id: "engine", label: "Engine API" },
  { id: "client", label: "Client UI" },
];

export default function Docs() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex flex-col gap-2 px-4 py-4 lg:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                JSONFLOW Docs
              </p>
              <h1 className="text-2xl font-semibold text-slate-900">
                Schema-Aware Diagrams
              </h1>
            </div>
            <a className="chip" href="/" aria-label="Back to editor">
              Editor
            </a>
          </div>
          <p className="max-w-3xl text-sm text-slate-600">
            JSONFLOW transforms JSON into Cytoscape-ready graphs. The engine
            validates input, the parser prepares renderable elements, and the
            client renders them without a backend.
          </p>
        </div>
      </header>
      <div className="grid w-full gap-6 px-4 py-6 md:grid-cols-[200px_1fr] lg:px-6 lg:py-8">
        <aside className="sticky top-4 h-fit rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Docs Index
          </p>
          <nav className="flex flex-col gap-1 text-sm text-slate-600">
            {sections.map((section) => (
              <a
                key={section.id}
                className="rounded-lg px-2 py-2 hover:bg-white hover:text-slate-900"
                href={`#${section.id}`}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="space-y-8">
          <section id="intro" className="space-y-3">
            <p className="text-sm text-slate-600">
              Start here for the schema, quickstart, and layout rules. For the
              editor, use the “Editor” link above.
            </p>
          </section>

          <section id="schema" className="space-y-3">
            <h2 className="text-2xl font-semibold">Schema</h2>
            <p className="text-slate-600">
              The graph schema defines nodes, edges, and layout direction. The
              engine defaults the graph type to{" "}
              <span className="font-mono">flow</span>.
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

          <section id="quickstart" className="space-y-3">
            <h2 className="text-2xl font-semibold">Quickstart</h2>
            <ol className="list-decimal space-y-2 pl-5 text-slate-600">
              <li>Paste JSON in the editor.</li>
              <li>Click Render.</li>
              <li>Export PNG from the preview panel.</li>
            </ol>
            <pre className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700">
{`{
  "nodes": [
    { "id": "editor", "label": "Editor Layer" },
    { "id": "logic", "label": "Logic Layer" },
    { "id": "parser", "label": "Parser Layer" }
  ],
  "edges": [
    { "from": "editor", "to": "logic", "kind": "next" },
    { "from": "logic", "to": "parser", "kind": "next" }
  ]
}`}
            </pre>
          </section>

          <section id="flow" className="space-y-3">
            <h2 className="text-2xl font-semibold">Flow Diagram</h2>
            <p className="text-slate-600">
              Flow is the default. Nodes are steps, edges are execution order.
            </p>
            <pre className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700">
{`{
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
}`}
            </pre>
          </section>

          <section id="sequence" className="space-y-3">
            <h2 className="text-2xl font-semibold">Sequence (Beta)</h2>
            <p className="text-slate-600">
              Sequence diagrams are renderable but still use flow layout in the
              client. Dedicated layout rules are planned.
            </p>
            <pre className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700">
{`{
  "type": "sequence",
  "nodes": [
    { "id": "user", "label": "User", "kind": "actor" },
    { "id": "app", "label": "App", "kind": "lifeline" }
  ],
  "edges": [
    { "from": "user", "to": "app", "label": "click", "kind": "call" },
    { "from": "app", "to": "user", "label": "ok", "kind": "return" }
  ]
}`}
            </pre>
          </section>

          <section id="styles" className="space-y-3">
            <h2 className="text-2xl font-semibold">Link Styles</h2>
            <p className="text-slate-600">
              Use <span className="font-mono">link_type</span> to control line
              style and arrow shape.
            </p>
            <pre className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700">
{`{
  "edges": [
    { "from": "A", "to": "B", "link_type": "solid" },
    { "from": "B", "to": "C", "link_type": "dash" },
    { "from": "C", "to": "D", "link_type": "open-arrow" }
  ]
}`}
            </pre>
          </section>

          <section id="layout" className="space-y-3">
            <h2 className="text-2xl font-semibold">Layout Direction</h2>
            <p className="text-slate-600">
              Control orientation with <span className="font-mono">layout.direction</span>.
            </p>
            <pre className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700">
{`{
  "layout": { "direction": "LR" }
}`}
            </pre>
          </section>

          <section id="engine" className="space-y-3">
            <h2 className="text-2xl font-semibold">Engine API</h2>
            <p className="text-slate-600">
              The engine validates JSON with Zod, then outputs Cytoscape nodes
              and edges. It is headless and UI-agnostic.
            </p>
            <pre className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700">
{`import { Engine } from "@andro.dev/jsonflow-engine";

const engine = new Engine();
const result = engine.parse(inputJson);

if (result.ok) {
  console.log(result.cytoscape);
}`}
            </pre>
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
