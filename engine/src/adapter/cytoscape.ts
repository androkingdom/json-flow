import type { EngineGraph } from "../types/graph";

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

export const toCytoscape = (graph: EngineGraph): CytoscapeGraph => {
  const nodes = graph.nodes.map((node) => {
    const data: {
      id: string;
      label?: string;
      type?: string;
      kind?: string;
      shape?: string;
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
    if (node.shape !== undefined) {
      data.shape = node.shape;
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
