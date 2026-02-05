import type { RenderInput, RenderResult, RendererId } from "@/libs/renders/types";
import { renderCytoscape } from "@/libs/renders/cytoscape";

export type RendererDefinition = {
  id: RendererId;
  label: string;
  render: (input: RenderInput) => RenderResult;
};

export const RENDERERS: Record<RendererId, RendererDefinition> = {
  cytoscape: {
    id: "cytoscape",
    label: "Cytoscape",
    render: renderCytoscape,
  },
};

export const getRenderer = (id: RendererId) => RENDERERS[id];
