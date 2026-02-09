module.exports = [
"[project]/jsonflow-web/libs/renders/cytoscape.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CYTOSCAPE_STYLES",
    ()=>CYTOSCAPE_STYLES,
    "renderCytoscape",
    ()=>renderCytoscape
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$cytoscape$40$3$2e$33$2e$1$2f$node_modules$2f$cytoscape$2f$dist$2f$cytoscape$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/cytoscape@3.33.1/node_modules/cytoscape/dist/cytoscape.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$andro$2e$dev$2b$jsonflow$2d$engine$40$1$2e$1$2e$0$2f$node_modules$2f40$andro$2e$dev$2f$jsonflow$2d$engine$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@andro.dev+jsonflow-engine@1.1.0/node_modules/@andro.dev/jsonflow-engine/dist/index.mjs [app-ssr] (ecmascript)");
;
;
const shapeFromData = "data(shape)";
const CYTOSCAPE_STYLES = [
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
            "shape": "round-rectangle"
        }
    },
    {
        selector: "node[shape]",
        css: {
            "shape": shapeFromData
        }
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
            "text-background-padding": "2px"
        }
    },
    {
        selector: 'edge[link_type = "dash"]',
        css: {
            "line-style": "dashed"
        }
    },
    {
        selector: 'edge[link_type = "dot"]',
        css: {
            "line-style": "dotted"
        }
    },
    {
        selector: 'edge[link_type = "bold"]',
        css: {
            width: 4
        }
    },
    {
        selector: 'edge[link_type = "double"]',
        css: {
            width: 3
        }
    },
    {
        selector: 'edge[link_type = "open-arrow"]',
        css: {
            "target-arrow-shape": "vee"
        }
    },
    {
        selector: 'edge[link_type = "solid"]',
        css: {
            "line-style": "solid"
        }
    }
];
const applyLayoutDirection = (targetCy, direction)=>{
    const nodes = targetCy.nodes();
    if (nodes.length === 0) {
        return;
    }
    const positions = nodes.map((node)=>node.position());
    const xs = positions.map((pos)=>pos.x);
    const ys = positions.map((pos)=>pos.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const width = Math.max(1, maxX - minX);
    const height = Math.max(1, maxY - minY);
    nodes.positions((node)=>{
        const { x, y } = node.position();
        const nx = x - minX;
        const ny = y - minY;
        if (direction === "BT") {
            return {
                x,
                y: minY + (height - ny)
            };
        }
        if (direction === "LR") {
            return {
                x: minX + ny,
                y: minY + (width - nx)
            };
        }
        if (direction === "RL") {
            return {
                x: minX + (height - ny),
                y: minY + nx
            };
        }
        return {
            x,
            y
        };
    });
    targetCy.fit(undefined, 24);
};
const renderCytoscape = (input)=>{
    const elements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$andro$2e$dev$2b$jsonflow$2d$engine$40$1$2e$1$2e$0$2f$node_modules$2f40$andro$2e$dev$2f$jsonflow$2d$engine$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toCytoscape"])(input.engineGraph);
    const nodeIds = new Set(elements.nodes.map((node)=>node.data.id));
    const filteredEdges = elements.edges.filter((edge)=>{
        const source = edge.data.source;
        const target = edge.data.target;
        return Boolean(source) && Boolean(target) && nodeIds.has(source) && nodeIds.has(target);
    });
    if (filteredEdges.length !== elements.edges.length) {
        return {
            ok: false,
            error: "Some edges reference missing or empty node ids. Fix them before rendering."
        };
    }
    if (input.existingCy) {
        input.existingCy.destroy();
    }
    const nextCy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$cytoscape$40$3$2e$33$2e$1$2f$node_modules$2f$cytoscape$2f$dist$2f$cytoscape$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        container: input.container,
        elements: [
            ...elements.nodes,
            ...filteredEdges
        ],
        style: CYTOSCAPE_STYLES,
        layout: {
            name: "breadthfirst",
            directed: true,
            padding: 24
        }
    });
    const direction = input.graph.layout?.direction ?? "LR";
    nextCy.ready(()=>applyLayoutDirection(nextCy, direction));
    return {
        ok: true,
        cy: nextCy
    };
};
}),
"[project]/jsonflow-web/features/workspace/components/Workspace.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Workspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.2_9d8d1bf7a8807769963b5151bd760c41/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.2_9d8d1bf7a8807769963b5151bd760c41/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$andro$2e$dev$2b$jsonflow$2d$engine$40$1$2e$1$2e$0$2f$node_modules$2f40$andro$2e$dev$2f$jsonflow$2d$engine$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@andro.dev+jsonflow-engine@1.1.0/node_modules/@andro.dev/jsonflow-engine/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/contexts/ThemeContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$libs$2f$renders$2f$cytoscape$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/libs/renders/cytoscape.ts [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/ui/components/EditorInterface'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/ui/components/VisualInterface'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
;
;
;
;
const starterJson = `{
  "type": "flow",
  "layout": { "direction": "LR" },
  "nodes": [
    { "id": "editor", "label": "Editor Layer" },
    { "id": "logic", "label": "Logic Layer" },
    { "id": "parser", "label": "Parser Layer" },
    { "id": "visual", "label": "Visualization Layer" },
    { "id": "layout", "label": "Layout Layer" }
  ],
  "edges": [
    { "from": "editor", "to": "logic", "label": "validate", "kind": "next", "link_type": "solid" },
    { "from": "logic", "to": "parser", "label": "transform", "kind": "next", "link_type": "solid" },
    { "from": "parser", "to": "visual", "label": "render-ready", "kind": "next", "link_type": "arrow" },
    { "from": "visual", "to": "layout", "label": "layout", "kind": "next", "link_type": "dash" }
  ]
}`;
const engine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$andro$2e$dev$2b$jsonflow$2d$engine$40$1$2e$1$2e$0$2f$node_modules$2f40$andro$2e$dev$2f$jsonflow$2d$engine$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Engine"]();
function Workspace() {
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const [raw, setRaw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(starterJson);
    const [debouncedRaw, setDebouncedRaw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(starterJson);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [errorType, setErrorType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [parsed, setParsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        ok: false,
        error: null
    });
    const [cy, setCy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const downloadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handle = setTimeout(()=>setDebouncedRaw(raw), 250);
        return ()=>clearTimeout(handle);
    }, [
        raw
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const json = JSON.parse(debouncedRaw);
            const result = engine.parse(json);
            if (!result.ok) {
                const issues = result.error.issues;
                if (issues && issues.length > 0) {
                    const first = issues[0];
                    const path = first.path.length > 0 ? first.path.join(".") : "root";
                    setErrorType("schema");
                    setError(`Schema error at ${path}: ${first.message}`);
                } else {
                    setErrorType("schema");
                    setError("Schema validation failed.");
                }
            } else {
                setErrorType(null);
                setError(null);
            }
            setParsed(result);
        } catch (parseError) {
            const message = parseError instanceof Error ? parseError.message : "Invalid JSON";
            setErrorType("json");
            setError(`JSON parse error: ${message}`);
            setParsed({
                ok: false,
                error: parseError
            });
        }
    }, [
        debouncedRaw
    ]);
    const status = parsed.ok ? "ok" : "error";
    const stats = parsed.ok ? {
        nodes: parsed.engineGraph.nodes.length,
        edges: parsed.engineGraph.edges.length
    } : {
        nodes: 0,
        edges: 0
    };
    const renderGraph = ()=>{
        if (!containerRef.current) {
            return;
        }
        if (!parsed.ok) {
            if (errorType === "json") {
                setError(error ?? "JSON parse error.");
            } else if (errorType === "schema") {
                setError(error ?? "Schema validation failed.");
            } else {
                setError("Invalid JSON or schema validation failed.");
            }
            return;
        }
        setError(null);
        if (parsed.semantic.length > 0) {
            const missing = parsed.semantic.find((issue)=>issue.type === "edge-missing-node");
            if (missing && missing.type === "edge-missing-node") {
                setError(`Edge ${missing.edge.from} → ${missing.edge.to} references missing node "${missing.missing}".`);
                return;
            }
        }
        if (cy) {
            cy.destroy();
        }
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$libs$2f$renders$2f$cytoscape$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderCytoscape"])({
            container: containerRef.current,
            graph: parsed.graph,
            engineGraph: parsed.engineGraph,
            existingCy: cy
        });
        if (!result.ok) {
            setError(result.error);
            return;
        }
        setCy(result.cy);
    };
    const exportImage = ()=>{
        if (!cy) {
            setError("Render a graph before exporting.");
            return;
        }
        const bgColor = theme === 'dark' ? '#0f172a' : '#ffffff';
        const png = cy.png({
            full: true,
            bg: bgColor
        });
        if (downloadRef.current) {
            downloadRef.current.href = png;
            downloadRef.current.download = "jsonflow-graph.png";
            downloadRef.current.click();
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = ()=>renderGraph();
        window.addEventListener("jsonflow:render", handler);
        return ()=>window.removeEventListener("jsonflow:render", handler);
    }, [
        parsed.ok,
        raw,
        error,
        errorType
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "grid w-full gap-6 px-6 py-8 md:grid-cols-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                ref: downloadRef,
                className: "hidden"
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/features/workspace/components/Workspace.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EditorInterface, {
                value: raw,
                status: status,
                errorMessage: error,
                semanticIssues: parsed.ok ? parsed.semantic : undefined,
                onChange: setRaw,
                onRender: renderGraph
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/features/workspace/components/Workspace.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VisualInterface, {
                onExport: exportImage,
                canExport: Boolean(cy),
                stats: stats,
                isCyclic: parsed.ok ? parsed.meta.isCyclic : undefined,
                semanticIssues: parsed.ok ? parsed.semantic : undefined,
                containerRef: containerRef
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/features/workspace/components/Workspace.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/jsonflow-web/features/workspace/components/Workspace.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=jsonflow-web_fd2980c1._.js.map