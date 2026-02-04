"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import cytoscape, { type Core } from "cytoscape";
import { Engine } from "@andro.dev/jsonflow-engine";
import { useTheme } from "@/contexts/ThemeContext";
import EditorInterface from "@/components/EditorInterface";
import VisualInterface from "@/components/VisualInterface";
import type { GraphStats, SchemaStatus } from "@/types/ui";

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

const applyLayoutDirection = (
  targetCy: Core,
  direction: "LR" | "RL" | "TB" | "BT",
) => {
  const nodes = targetCy.nodes();
  if (nodes.length === 0) {
    return;
  }

  const positions = nodes.map((node) => node.position());
  const xs = positions.map((pos) => pos.x);
  const ys = positions.map((pos) => pos.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);

  nodes.positions((node) => {
    const { x, y } = node.position();
    const nx = x - minX;
    const ny = y - minY;

    if (direction === "BT") {
      return { x, y: minY + (height - ny) };
    }

    if (direction === "LR") {
      return { x: minX + ny, y: minY + (width - nx) };
    }

    if (direction === "RL") {
      return { x: minX + (height - ny), y: minY + nx };
    }

    return { x, y };
  });

  targetCy.fit(undefined, 24);
};

export default function Workspace() {
  const { theme } = useTheme();
  const [raw, setRaw] = useState(starterJson);
  const [error, setError] = useState<string | null>(null);
  const [cy, setCy] = useState<Core | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const downloadRef = useRef<HTMLAnchorElement | null>(null);

  const parsed = useMemo(() => {
    try {
      return engine.parse(JSON.parse(raw));
    } catch (parseError) {
      return { ok: false as const, error: parseError };
    }
  }, [raw]);

  const status: SchemaStatus = parsed.ok ? "ok" : "error";
  const stats: GraphStats = parsed.ok
    ? {
        nodes: parsed.cytoscape.nodes.length,
        edges: parsed.cytoscape.edges.length,
      }
    : { nodes: 0, edges: 0 };

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

    const direction = parsed.graph.layout?.direction ?? "LR";
    nextCy.ready(() => applyLayoutDirection(nextCy, direction));

    setCy(nextCy);
  };

  const exportImage = () => {
    if (!cy) {
      setError("Render a graph before exporting.");
      return;
    }

    const bgColor = theme === 'dark' ? '#0f172a' : '#ffffff';
    const png = cy.png({ full: true, bg: bgColor });
    if (downloadRef.current) {
      downloadRef.current.href = png;
      downloadRef.current.download = "jsonflow-graph.png";
      downloadRef.current.click();
    }
  };

  useEffect(() => {
    const handler = () => renderGraph();
    window.addEventListener("jsonflow:render", handler);
    return () => window.removeEventListener("jsonflow:render", handler);
  }, [parsed.ok, raw]);

  return (
    <main className="grid w-full gap-6 px-6 py-8 md:grid-cols-2">
      <a ref={downloadRef} className="hidden" />
      <EditorInterface
        value={raw}
        status={status}
        errorMessage={error}
        onChange={setRaw}
        onRender={renderGraph}
      />
      <VisualInterface
        onExport={exportImage}
        canExport={Boolean(cy)}
        stats={stats}
        containerRef={containerRef}
      />
    </main>
  );
}
