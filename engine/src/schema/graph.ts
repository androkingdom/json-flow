import { z } from "zod";

export const GraphTypeSchema = z.enum(["graph", "sequence", "flow"]);

export const NodeKindSchema = z.enum([
  "actor",
  "lifeline",
  "message",
  "activity",
  "state",
  "class",
]);

export const NodeShapeSchema = z.enum([
  "ellipse",
  "rectangle",
  "round-rectangle",
  "diamond",
  "hexagon",
  "triangle",
]);

export const EdgeLinkTypeSchema = z.enum([
  "solid",
  "dash",
  "dot",
  "double",
  "bold",
  "arrow",
  "open-arrow",
]);

export const EdgeKindSchema = z.enum([
  "next",
  "call",
  "return",
  "async",
  "transition",
  "inherit",
  "association",
]);

export const LayoutDirectionSchema = z.enum(["LR", "RL", "TB", "BT"]);

export const LayoutSchema = z.object({
  direction: LayoutDirectionSchema.default("LR"),
});

export const NodeSchema = z.object({
  id: z.string().min(1, "Node id cannot be empty."),
  label: z.string().optional(),
  type: z.string().optional(),
  kind: NodeKindSchema.optional(),
  shape: NodeShapeSchema.optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
});

export const EdgeSchema = z.object({
  from: z.string().min(1, "Edge from cannot be empty."),
  to: z.string().min(1, "Edge to cannot be empty."),
  label: z.string().optional(),
  kind: EdgeKindSchema.optional(),
  link_type: EdgeLinkTypeSchema.optional(),
});

export const GraphSchema = z.object({
  type: GraphTypeSchema.default("flow"),
  layout: LayoutSchema.optional(),
  nodes: z.array(NodeSchema),
  edges: z.array(EdgeSchema),
});
