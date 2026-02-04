export type SchemaStatus = "ok" | "error";

export type GraphStats = {
  nodes: number;
  edges: number;
};

export type EditorInterfaceProps = {
  value: string;
  status: SchemaStatus;
  errorMessage?: string | null;
  onChange: (value: string) => void;
  onRender: () => void;
};

import type { RefObject } from "react";

export type VisualInterfaceProps = {
  onExport: () => void;
  canExport: boolean;
  stats: GraphStats;
  containerRef: RefObject<HTMLDivElement | null>;
};
