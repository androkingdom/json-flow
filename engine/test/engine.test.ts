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
      expect(result.cytoscape.nodes).toHaveLength(2);
      expect(result.cytoscape.edges).toHaveLength(1);
    }
  });
});
