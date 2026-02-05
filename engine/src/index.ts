import { z } from "zod";
import { EdgeSchema, GraphSchema, NodeSchema } from "./schema/graph";
import type {
  Edge,
  EngineGraph,
  Graph,
  Node,
} from "./types/graph";
import { analyzeGraph, type SemanticIssue, type SemanticMeta } from "./semantic";

export type EngineResult =
  | {
      ok: true;
      graph: Graph;
      engineGraph: EngineGraph;
      meta: SemanticMeta;
      semantic: SemanticIssue[];
    }
  | { ok: false; error: z.ZodError };

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
    const engineGraph: EngineGraph = {
      nodes: graph.nodes,
      edges: graph.edges,
    };
    const semantic = analyzeGraph(graph);

    return {
      ok: true,
      graph,
      engineGraph,
      meta: semantic.meta,
      semantic: semantic.issues,
    };
  }
}

export {
  EdgeSchema,
  GraphSchema,
  NodeSchema,
};

export { toCytoscape } from "./adapter/cytoscape";
