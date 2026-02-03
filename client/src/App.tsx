import { useMemo, useRef, useState } from "react";
import cytoscape, { type Core } from "cytoscape";
import Editor, { type OnMount } from "@monaco-editor/react";
import { Engine } from "@andro.dev/jsonflow-engine";
import type { ParseResult } from "./types/parse";

const starterJson = `{
  "type": "flow",
  "layout": { "direction": "LR" },
  "nodes": [
    { "id": "editor", "label": "Editor Layer" },
    { "id": "logic", "label": "Logic Layer" },
    { "id": "parser", "label": "Parser Layer" },
    { "id": "visual", "label": "Visualization Layer" },
    { "id": "layout", "label": "Layout Layer" }
  ],
  "edges": [
    { "from": "editor", "to": "logic", "label": "validate", "kind": "next", "link_type": "solid" },
    { "from": "logic", "to": "parser", "label": "transform", "kind": "next", "link_type": "solid" },
    { "from": "parser", "to": "visual", "label": "render-ready", "kind": "next", "link_type": "arrow" },
    { "from": "visual", "to": "layout", "label": "layout", "kind": "next", "link_type": "dash" }
  ]
}`;

const engine = new Engine();

const styles: cytoscape.StylesheetCSS[] = [
  {
    selector: "node",
    css: {
      "background-color": "#1b4332",
      "border-color": "#081c15",
      "border-width": 2,
      color: "#fefae0",
      "font-size": "12px",
      "font-weight": 600,
      label: "data(label)",
      "text-wrap": "wrap",
      "text-max-width": "140px",
      "text-valign": "center",
      "text-halign": "center",
      width: "label",
      padding: "10px",
      "shape": "round-rectangle",
    },
  },
  {
    selector: "edge",
    css: {
      width: 2,
      "curve-style": "bezier",
      "line-color": "#2d6a4f",
      "target-arrow-color": "#2d6a4f",
      "target-arrow-shape": "triangle",
      label: "data(label)",
      "font-size": "10px",
      "text-rotation": "autorotate",
      "text-margin-y": -8,
      "text-background-color": "#fefae0",
      "text-background-opacity": 0.9,
      "text-background-padding": "2px",
    },
  },
  {
    selector: 'edge[link_type = "dash"]',
    css: { "line-style": "dashed" },
  },
  {
    selector: 'edge[link_type = "dot"]',
    css: { "line-style": "dotted" },
  },
  {
    selector: 'edge[link_type = "bold"]',
    css: { width: 4 },
  },
  {
    selector: 'edge[link_type = "double"]',
    css: { width: 3 },
  },
  {
    selector: 'edge[link_type = "open-arrow"]',
    css: { "target-arrow-shape": "vee" },
  },
  {
    selector: 'edge[link_type = "solid"]',
    css: { "line-style": "solid" },
  },
];

const parseInput = (input: string): ParseResult => {
  try {
    const parsed = JSON.parse(input);
    return engine.parse(parsed);
  } catch (error) {
    return {
      ok: false as const,
      error,
    };
  }
};

const jsonSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  required: ["nodes", "edges"],
  additionalProperties: false,
  properties: {
    type: { enum: ["graph", "sequence", "flow"], default: "flow" },
    layout: {
      type: "object",
      additionalProperties: false,
      properties: {
        direction: { enum: ["LR", "RL", "TB", "BT"], default: "LR" },
      },
    },
    nodes: {
      type: "array",
      items: {
        type: "object",
        required: ["id"],
        additionalProperties: false,
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          type: { type: "string" },
          kind: {
            enum: ["actor", "lifeline", "message", "activity", "state", "class"],
          },
          properties: { type: "object", additionalProperties: true },
        },
      },
    },
    edges: {
      type: "array",
      items: {
        type: "object",
        required: ["from", "to"],
        additionalProperties: false,
        properties: {
          from: { type: "string" },
          to: { type: "string" },
          label: { type: "string" },
          kind: {
            enum: [
              "next",
              "call",
              "return",
              "async",
              "transition",
              "inherit",
              "association",
            ],
          },
          link_type: {
            enum: ["solid", "dash", "dot", "double", "bold", "arrow", "open-arrow"],
          },
        },
      },
    },
  },
} as const;

const handleEditorMount: OnMount = (editor, monaco) => {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    allowComments: false,
    schemas: [
      {
        uri: "jsonflow-schema.json",
        fileMatch: ["*"],
        schema: jsonSchema,
      },
    ],
  });

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    const event = new CustomEvent("jsonflow:render");
    window.dispatchEvent(event);
  });
};

export default function App() {
  const [raw, setRaw] = useState(starterJson);
  const [error, setError] = useState<string | null>(null);
  const [cy, setCy] = useState<Core | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const parsed = useMemo(() => parseInput(raw), [raw]);

  const renderGraph = () => {
    if (!containerRef.current) {
      return;
    }

    if (!parsed.ok) {
      setError("Invalid JSON or schema validation failed.");
      return;
    }

    setError(null);

    if (cy) {
      cy.destroy();
    }

    const nextCy = cytoscape({
      container: containerRef.current,
      elements: [...parsed.cytoscape.nodes, ...parsed.cytoscape.edges],
      style: styles,
      layout: {
        name: "breadthfirst",
        directed: true,
        padding: 24,
      },
    });

    setCy(nextCy);
  };

  const exportImage = () => {
    if (!cy) {
      setError("Render a graph before exporting.");
      return;
    }

    const png = cy.png({ full: true, bg: "#ffffff" });
    const link = document.createElement("a");
    link.href = png;
    link.download = "jsonflow-graph.png";
    link.click();
  };

  useMemo(() => {
    const handler = () => renderGraph();
    window.addEventListener("jsonflow:render", handler);
    return () => window.removeEventListener("jsonflow:render", handler);
  }, [parsed.ok, raw]);

  return (
    <div className="min-h-screen bg-white px-8 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="chip">JSONFLOW / editor + renderer</div>
            <h1 className="text-4xl font-semibold leading-tight">
              Schema-Aware Diagram Playground
            </h1>
            <p className="max-w-2xl text-base text-slate-600">
              Paste JSON, validate with the engine, and render Cytoscape output.
              This is a fast, no-backend editor playground.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-500">
              {parsed.ok ? "Schema OK" : "Schema Error"}
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1 space-y-6">
            <section className="panel space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">JSON Editor</h2>
                  <span className="chip">Monaco</span>
                </div>
                <div className="relative group">
                  <button className="chip" type="button" aria-label="Schema quick view">
                    (i)
                  </button>
                  <div className="pointer-events-none absolute right-0 top-10 z-10 w-64 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600 opacity-0 shadow-lg transition group-hover:opacity-100">
                    <p className="mb-2 font-semibold text-slate-800">Schema Quick View</p>
                    <p>
                      <span className="font-mono">type</span>: graph | sequence | flow
                    </p>
                    <p>
                      <span className="font-mono">layout.direction</span>: LR | RL | TB | BT
                    </p>
                    <p>
                      <span className="font-mono">node.kind</span>: actor, lifeline, message, activity, state, class
                    </p>
                    <p>
                      <span className="font-mono">edge.kind</span>: next, call, return, async, transition, inherit, association
                    </p>
                    <p>
                      <span className="font-mono">edge.link_type</span>: solid, dash, dot, double, bold, arrow, open-arrow
                    </p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200 pt-3">
                <Editor
                  height="520px"
                  defaultLanguage="json"
                  value={raw}
                  onChange={(value) => setRaw(value ?? "")}
                  onMount={handleEditorMount}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "JetBrains Mono",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: true,
                  }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="btn" onClick={renderGraph}>
                  Render Now
                </button>
                {error ? (
                  <p className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-700">
                    {error}
                  </p>
                ) : (
                  <p className="text-sm text-slate-500">
                    Engine parses and validates before rendering. Defaults to
                    <span className="font-mono"> flow </span>.
                  </p>
                )}
              </div>
            </section>
          </div>

          <div className="flex-1 space-y-6">
            <section className="panel flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Graph Preview</h2>
                <span className="chip">Cytoscape</span>
              </div>
              <div
                ref={containerRef}
                className="h-[520px] rounded-xl border border-slate-200 bg-white"
              />
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative group">
                  <button
                    className="btn disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    onClick={exportImage}
                    disabled={!cy}
                  >
                    Export PNG
                  </button>
                  <div className="pointer-events-none absolute left-1/2 top-11 w-40 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 opacity-0 shadow-lg transition group-hover:opacity-100">
                    {cy ? "Download the canvas as PNG." : "Render first to export."}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  layout: breadthfirst
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  edges: {parsed.ok ? parsed.cytoscape.edges.length : 0}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  nodes: {parsed.ok ? parsed.cytoscape.nodes.length : 0}
                </span>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
