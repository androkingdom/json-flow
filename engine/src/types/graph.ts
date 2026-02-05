import type { z } from "zod";
import type {
  EdgeLinkTypeSchema,
  EdgeKindSchema,
  EdgeSchema,
  GraphSchema,
  GraphTypeSchema,
  LayoutDirectionSchema,
  LayoutSchema,
  NodeKindSchema,
  NodeShapeSchema,
  NodeSchema,
} from "../schema/graph";

export type GraphType = z.infer<typeof GraphTypeSchema>;
export type NodeKind = z.infer<typeof NodeKindSchema>;
export type NodeShape = z.infer<typeof NodeShapeSchema>;
export type EdgeKind = z.infer<typeof EdgeKindSchema>;
export type EdgeLinkType = z.infer<typeof EdgeLinkTypeSchema>;
export type LayoutDirection = z.infer<typeof LayoutDirectionSchema>;
export type Layout = z.infer<typeof LayoutSchema>;
export type Node = z.infer<typeof NodeSchema>;
export type Edge = z.infer<typeof EdgeSchema>;
export type Graph = z.infer<typeof GraphSchema>;

export type EngineGraph = {
  nodes: Node[];
  edges: Edge[];
};

export type CytoscapeNode = {
  data: {
    id: string;
    label?: string;
    type?: string;
    kind?: string;
    shape?: string;
    properties?: Record<string, unknown>;
  };
};

export type CytoscapeEdge = {
  data: {
    id: string;
    source: string;
    target: string;
    label?: string;
    kind?: string;
    link_type?: string;
  };
};

export type CytoscapeGraph = {
  nodes: CytoscapeNode[];
  edges: CytoscapeEdge[];
};

export type FlowchartCytoscapeGraph = CytoscapeGraph;
