export type SchemaStatus = "ok" | "error";

export type GraphStats = {
  nodes: number;
  edges: number;
};

export type SemanticIssue =
  | {
      type: "edge-missing-node";
      edge: { from: string; to: string };
      missing: string;
    }
  | {
      type: "unreachable-node";
      nodeId: string;
    };

export type EditorInterfaceProps = {
  value: string;
  status: SchemaStatus;
  errorMessage?: string | null;
  semanticIssues?: SemanticIssue[];
  onChange: (value: string) => void;
  onRender: () => void;
};

import type { RefObject } from "react";

export type VisualInterfaceProps = {
  onExport: () => void;
  canExport: boolean;
  stats: GraphStats;
  isCyclic?: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
};
