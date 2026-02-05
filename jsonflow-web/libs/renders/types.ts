import type { Core } from "cytoscape";
import type { LayoutDirection } from "@/libs/renders/cytoscape";

export type RendererId = "cytoscape";

export type RenderGraph = {
  layout?: {
    direction?: LayoutDirection;
  };
};

export type RenderEngineGraph = {
  nodes: { id: string }[];
  edges: { from: string; to: string }[];
};

export type RenderInput = {
  container: HTMLElement;
  graph: RenderGraph;
  engineGraph: RenderEngineGraph;
  existingCy?: Core | null;
};

export type RenderResult =
  | { ok: true; cy: Core }
  | { ok: false; error: string };
