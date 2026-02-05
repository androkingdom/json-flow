import cytoscape, { type Core, type Css, type StylesheetCSS } from "cytoscape";
import { toCytoscape } from "@andro.dev/jsonflow-engine";

export type LayoutDirection = "LR" | "RL" | "TB" | "BT";

export type GraphLayout = {
  direction?: LayoutDirection;
};

export type MinimalGraph = {
  layout?: GraphLayout;
};

export type MinimalNode = {
  id: string;
};

export type MinimalEdge = {
  from: string;
  to: string;
};

export type MinimalEngineGraph = {
  nodes: MinimalNode[];
  edges: MinimalEdge[];
};

export type CytoscapeRenderInput = {
  container: HTMLElement;
  graph: MinimalGraph;
  engineGraph: MinimalEngineGraph;
  existingCy?: Core | null;
};

export type CytoscapeRenderResult =
  | { ok: true; cy: Core }
  | { ok: false; error: string };

const shapeFromData = "data(shape)" as unknown as Css.PropertyValueNode<Css.NodeShape>;

export const CYTOSCAPE_STYLES: StylesheetCSS[] = [
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
    selector: "node[shape]",
    css: {
      "shape": shapeFromData,
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
  {
    selector: 'edge[loop = "true"]',
    css: {
      "curve-style": "unbundled-bezier",
      "control-point-distance": 60,
      "control-point-weight": 0.5,
    },
  },
];

const applyLayoutDirection = (targetCy: Core, direction: LayoutDirection) => {
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

const detectBackEdges = (
  nodeIds: string[],
  edges: { data: { source: string; target: string } }[],
) => {
  const state = new Map<string, 0 | 1 | 2>();
  const outgoing = new Map<string, number[]>();
  const backEdgeIndexes = new Set<number>();

  nodeIds.forEach((id) => {
    state.set(id, 0);
    outgoing.set(id, []);
  });

  edges.forEach((edge, index) => {
    const list = outgoing.get(edge.data.source);
    if (list) {
      list.push(index);
    }
  });

  const dfs = (nodeId: string) => {
    state.set(nodeId, 1);
    const edgeIndexes = outgoing.get(nodeId) ?? [];
    edgeIndexes.forEach((edgeIndex) => {
      const target = edges[edgeIndex]?.data.target;
      if (!target) return;
      const targetState = state.get(target) ?? 0;
      if (targetState === 0) {
        dfs(target);
      } else if (targetState === 1) {
        backEdgeIndexes.add(edgeIndex);
      }
    });
    state.set(nodeId, 2);
  };

  nodeIds.forEach((id) => {
    if ((state.get(id) ?? 0) === 0) {
      dfs(id);
    }
  });

  return backEdgeIndexes;
};

export const renderCytoscape = (
  input: CytoscapeRenderInput,
): CytoscapeRenderResult => {
  const elements = toCytoscape(input.engineGraph);
  const nodeIds = new Set(elements.nodes.map((node) => node.data.id));
  const filteredEdges = elements.edges.filter((edge) => {
    const source = edge.data.source;
    const target = edge.data.target;
    return Boolean(source) && Boolean(target) && nodeIds.has(source) && nodeIds.has(target);
  });

  if (filteredEdges.length !== elements.edges.length) {
    return {
      ok: false,
      error: "Some edges reference missing or empty node ids. Fix them before rendering.",
    };
  }

  const orderedNodeIds = elements.nodes.map((node) => node.data.id);
  const backEdgeIndexes = detectBackEdges(orderedNodeIds, filteredEdges);
  const renderedEdges = filteredEdges.map((edge, index) => {
    if (!backEdgeIndexes.has(index)) {
      return edge;
    }
    return {
      data: {
        ...edge.data,
        loop: "true",
      },
    };
  });

  if (input.existingCy) {
    input.existingCy.destroy();
  }

  const nextCy = cytoscape({
    container: input.container,
    elements: [...elements.nodes, ...renderedEdges],
    style: CYTOSCAPE_STYLES,
    layout: {
      name: "breadthfirst",
      directed: true,
      padding: 24,
    },
  });

  const direction = input.graph.layout?.direction ?? "LR";
  nextCy.ready(() => applyLayoutDirection(nextCy, direction));

  return { ok: true, cy: nextCy };
};
