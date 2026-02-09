"use client";

import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import type { Core } from "cytoscape";
import { useTheme } from "@/contexts/ThemeContext";
import {
  type LayoutDirection,
} from "@/libs/renders/cytoscape";
import { getRenderer } from "@/libs/renders/registry";
import EditorInterface from "@/features/workspace/components/EditorInterface";
import VisualInterface from "@/features/workspace/components/VisualInterface";
import type { GraphStats, SchemaStatus } from "@/features/workspace/types/ui";
import {
  errorAtom,
  errorTypeAtom,
  parsedAtom,
  parsedSourceAtom,
  rendererIdAtom,
  rawAtom,
} from "@/features/workspace/state/workspace-atoms";
import { useWorkspaceParse } from "@/features/workspace/state/use-workspace-parse";
import { parseGraphRaw } from "@/features/workspace/state/parse-graph";

export default function Workspace() {
  const { theme } = useTheme();
  const [raw, setRaw] = useAtom(rawAtom);
  const [error, setError] = useAtom(errorAtom);
  const [errorType, setErrorType] = useAtom(errorTypeAtom);
  const [parsed, setParsed] = useAtom(parsedAtom);
  const [parsedSource, setParsedSource] = useAtom(parsedSourceAtom);
  const [rendererId] = useAtom(rendererIdAtom);
  const [cy, setCy] = useState<Core | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const downloadRef = useRef<HTMLAnchorElement | null>(null);

  useWorkspaceParse();

  const status: SchemaStatus = parsed.ok ? "ok" : "error";
  const stats: GraphStats = parsed.ok
    ? {
        nodes: parsed.engineGraph.nodes.length,
        edges: parsed.engineGraph.edges.length,
      }
    : { nodes: 0, edges: 0 };

  const renderGraph = () => {
    if (!containerRef.current) {
      return;
    }

    let currentParsed = parsed;
    let currentError = error;
    let currentErrorType = errorType;

    if (raw !== parsedSource) {
      const next = parseGraphRaw(raw);
      currentParsed = next.parsed;
      currentError = next.error;
      currentErrorType = next.errorType;
      setError(next.error);
      setErrorType(next.errorType);
      setParsed(next.parsed);
      setParsedSource(raw);
    }

    if (!currentParsed.ok) {
      if (currentErrorType === "json") {
        setError(currentError ?? "JSON parse error.");
      } else if (currentErrorType === "schema") {
        setError(currentError ?? "Schema validation failed.");
      } else {
        setError("Invalid JSON or schema validation failed.");
      }
      return;
    }

    setError(null);

    if (currentParsed.semantic.length > 0) {
      const missing = currentParsed.semantic.find((issue) => issue.type === "edge-missing-node");
      if (missing && missing.type === "edge-missing-node") {
        setError(
          `Edge ${missing.edge.from} → ${missing.edge.to} references missing node "${missing.missing}".`,
        );
        return;
      }
    }

    if (cy) {
      cy.destroy();
    }

    const renderer = getRenderer(rendererId);
    const result = renderer.render({
      container: containerRef.current,
      graph: currentParsed.graph,
      engineGraph: currentParsed.engineGraph,
      existingCy: cy,
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setCy(result.cy);
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
  }, [parsed.ok, raw, error, errorType]);

  return (
    <main className="grid w-full flex-1 items-stretch gap-4 px-3 py-3 md:grid-cols-2 md:px-4 md:py-4">
      <a ref={downloadRef} className="hidden" />
      <EditorInterface
        value={raw}
        status={status}
        errorMessage={error}
        semanticIssues={parsed.ok ? parsed.semantic : undefined}
        onChange={setRaw}
        onRender={renderGraph}
      />
      <VisualInterface
        onExport={exportImage}
        canExport={Boolean(cy)}
        stats={stats}
        isCyclic={parsed.ok ? parsed.meta.isCyclic : undefined}
        containerRef={containerRef}
      />
    </main>
  );
}
