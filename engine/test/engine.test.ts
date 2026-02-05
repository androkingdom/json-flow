import { describe, expect, it } from "vitest";
import { Engine } from "../src";

describe("Engine", () => {
  it("parses a minimal graph and defaults type to flow", () => {
    const engine = new Engine();
    const result = engine.parse({
      nodes: [{ id: "A" }, { id: "B" }],
      edges: [{ from: "A", to: "B" }],
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.graph.type).toBe("flow");
      expect(result.engineGraph.nodes).toHaveLength(2);
      expect(result.engineGraph.edges).toHaveLength(1);
      expect(result.meta.isCyclic).toBe(false);
      expect(result.semantic).toHaveLength(0);
    }
  });
});
