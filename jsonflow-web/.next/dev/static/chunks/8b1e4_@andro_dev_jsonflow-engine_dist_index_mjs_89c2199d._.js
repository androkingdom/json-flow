(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/.pnpm/@andro.dev+jsonflow-engine@1.1.0/node_modules/@andro.dev/jsonflow-engine/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EdgeSchema",
    ()=>EdgeSchema,
    "Engine",
    ()=>Engine,
    "GraphSchema",
    ()=>GraphSchema,
    "NodeSchema",
    ()=>NodeSchema,
    "toCytoscape",
    ()=>toCytoscape
]);
// src/schema/graph.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
var GraphTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "graph",
    "sequence",
    "flow"
]);
var NodeKindSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "actor",
    "lifeline",
    "message",
    "activity",
    "state",
    "class"
]);
var NodeShapeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "ellipse",
    "rectangle",
    "round-rectangle",
    "diamond",
    "hexagon",
    "triangle"
]);
var EdgeLinkTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "solid",
    "dash",
    "dot",
    "double",
    "bold",
    "arrow",
    "open-arrow"
]);
var EdgeKindSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "next",
    "call",
    "return",
    "async",
    "transition",
    "inherit",
    "association"
]);
var LayoutDirectionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "LR",
    "RL",
    "TB",
    "BT"
]);
var LayoutSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    direction: LayoutDirectionSchema.default("LR")
});
var NodeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    kind: NodeKindSchema.optional(),
    shape: NodeShapeSchema.optional(),
    properties: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].unknown()).optional()
});
var EdgeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    from: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    to: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    kind: EdgeKindSchema.optional(),
    link_type: EdgeLinkTypeSchema.optional()
});
var GraphSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: GraphTypeSchema.default("flow"),
    layout: LayoutSchema.optional(),
    nodes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(NodeSchema),
    edges: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$4$2e$3$2e$6$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(EdgeSchema)
});
// src/semantic.ts
var buildAdjacency = (graph, nodeIds)=>{
    const adjacency = /* @__PURE__ */ new Map();
    const incoming = /* @__PURE__ */ new Map();
    graph.nodes.forEach((node)=>{
        adjacency.set(node.id, []);
        incoming.set(node.id, 0);
    });
    graph.edges.forEach((edge)=>{
        if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
            return;
        }
        adjacency.get(edge.from)?.push(edge.to);
        incoming.set(edge.to, (incoming.get(edge.to) ?? 0) + 1);
    });
    return {
        adjacency,
        incoming
    };
};
var detectCycle = (adjacency)=>{
    const visiting = /* @__PURE__ */ new Set();
    const visited = /* @__PURE__ */ new Set();
    let isCyclic = false;
    const dfs = (nodeId)=>{
        if (isCyclic) return;
        if (visiting.has(nodeId)) {
            isCyclic = true;
            return;
        }
        if (visited.has(nodeId)) return;
        visiting.add(nodeId);
        const neighbors = adjacency.get(nodeId) ?? [];
        neighbors.forEach(dfs);
        visiting.delete(nodeId);
        visited.add(nodeId);
    };
    Array.from(adjacency.keys()).forEach(dfs);
    return isCyclic;
};
var findUnreachable = (adjacency, incoming)=>{
    const roots = Array.from(incoming.entries()).filter(([, count])=>count === 0).map(([id])=>id);
    if (roots.length === 0) {
        return [];
    }
    const reachable = /* @__PURE__ */ new Set();
    const queue = [
        ...roots
    ];
    while(queue.length > 0){
        const current = queue.shift();
        if (!current || reachable.has(current)) continue;
        reachable.add(current);
        const neighbors = adjacency.get(current) ?? [];
        neighbors.forEach((next)=>{
            if (!reachable.has(next)) {
                queue.push(next);
            }
        });
    }
    return Array.from(adjacency.keys()).filter((id)=>!reachable.has(id));
};
var analyzeGraph = (graph)=>{
    const nodeIds = new Set(graph.nodes.map((node)=>node.id));
    const issues = [];
    graph.edges.forEach((edge)=>{
        if (!nodeIds.has(edge.from)) {
            issues.push({
                type: "edge-missing-node",
                edge: {
                    from: edge.from,
                    to: edge.to
                },
                missing: edge.from
            });
        }
        if (!nodeIds.has(edge.to)) {
            issues.push({
                type: "edge-missing-node",
                edge: {
                    from: edge.from,
                    to: edge.to
                },
                missing: edge.to
            });
        }
    });
    const { adjacency, incoming } = buildAdjacency(graph, nodeIds);
    const isCyclic = detectCycle(adjacency);
    const unreachable = findUnreachable(adjacency, incoming);
    unreachable.forEach((nodeId)=>{
        issues.push({
            type: "unreachable-node",
            nodeId
        });
    });
    return {
        meta: {
            isCyclic
        },
        issues
    };
};
// src/adapter/cytoscape.ts
var toCytoscape = (graph)=>{
    const nodes = graph.nodes.map((node)=>{
        const data = {
            id: node.id
        };
        if (node.label !== void 0) {
            data.label = node.label;
        }
        if (node.type !== void 0) {
            data.type = node.type;
        }
        if (node.kind !== void 0) {
            data.kind = node.kind;
        }
        if (node.shape !== void 0) {
            data.shape = node.shape;
        }
        if (node.properties !== void 0) {
            data.properties = node.properties;
        }
        return {
            data
        };
    });
    const edges = graph.edges.map((edge)=>{
        const data = {
            id: `${edge.from}->${edge.to}`,
            source: edge.from,
            target: edge.to
        };
        if (edge.label !== void 0) {
            data.label = edge.label;
        }
        if (edge.kind !== void 0) {
            data.kind = edge.kind;
        }
        if (edge.link_type !== void 0) {
            data.link_type = edge.link_type;
        }
        return {
            data
        };
    });
    return {
        nodes,
        edges
    };
};
// src/index.ts
var Engine = class {
    validate(input) {
        return GraphSchema.parse(input);
    }
    safeValidate(input) {
        return GraphSchema.safeParse(input);
    }
    parse(input) {
        const result = GraphSchema.safeParse(input);
        if (!result.success) {
            return {
                ok: false,
                error: result.error
            };
        }
        const graph = result.data;
        const engineGraph = {
            nodes: graph.nodes,
            edges: graph.edges
        };
        const semantic = analyzeGraph(graph);
        return {
            ok: true,
            graph,
            engineGraph,
            meta: semantic.meta,
            semantic: semantic.issues
        };
    }
};
;
 //# sourceMappingURL=index.mjs.map
}),
]);

//# sourceMappingURL=8b1e4_%40andro_dev_jsonflow-engine_dist_index_mjs_89c2199d._.js.map