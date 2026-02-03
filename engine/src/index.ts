import { z } from "zod";
import { EdgeSchema, GraphSchema, NodeSchema } from "@engine/schema/graph";
import type {
  CytoscapeGraph,
  Edge,
  FlowchartCytoscapeGraph,
  Graph,
  Node,
} from "@engine/types/graph";

export type EngineResult =
  | { ok: true; graph: Graph; cytoscape: CytoscapeGraph }
  | { ok: false; error: z.ZodError };

const toCytoscape = (graph: Graph): CytoscapeGraph => {
  const nodes = graph.nodes.map((node) => {
    const data: {
      id: string;
      label?: string;
      type?: string;
      kind?: string;
      properties?: Record<string, unknown>;
    } = {
      id: node.id,
    };

    if (node.label !== undefined) {
      data.label = node.label;
    }
    if (node.type !== undefined) {
      data.type = node.type;
    }
    if (node.kind !== undefined) {
      data.kind = node.kind;
    }
    if (node.properties !== undefined) {
      data.properties = node.properties;
    }

    return { data };
  });

  const edges = graph.edges.map((edge) => {
    const data: {
      id: string;
      source: string;
      target: string;
      label?: string;
      kind?: string;
      link_type?: string;
    } = {
      id: `${edge.from}->${edge.to}`,
      source: edge.from,
      target: edge.to,
    };

    if (edge.label !== undefined) {
      data.label = edge.label;
    }
    if (edge.kind !== undefined) {
      data.kind = edge.kind;
    }
    if (edge.link_type !== undefined) {
      data.link_type = edge.link_type;
    }

    return { data };
  });

  return { nodes, edges };
};

export class Engine {
  validate(input: unknown): Graph {
    return GraphSchema.parse(input);
  }

  safeValidate(input: unknown): ReturnType<typeof GraphSchema.safeParse> {
    return GraphSchema.safeParse(input);
  }

  parse(input: unknown): EngineResult {
    const result = GraphSchema.safeParse(input);
    if (!result.success) {
      return { ok: false, error: result.error };
    }

    const graph = result.data;
    const cytoscape = toCytoscape(graph);

    if (graph.type === "flow") {
      const flowchart: FlowchartCytoscapeGraph = cytoscape;
      return { ok: true, graph, cytoscape: flowchart };
    }

    return { ok: true, graph, cytoscape };
  }
}

export {
  EdgeSchema,
  GraphSchema,
  NodeSchema,
};
