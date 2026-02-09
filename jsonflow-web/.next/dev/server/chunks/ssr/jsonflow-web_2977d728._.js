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
    },
    {
        selector: 'edge[loop = "true"]',
        css: {
            "curve-style": "unbundled-bezier",
            "control-point-distance": 60,
            "control-point-weight": 0.5
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
const detectBackEdges = (nodeIds, edges)=>{
    const state = new Map();
    const outgoing = new Map();
    const backEdgeIndexes = new Set();
    nodeIds.forEach((id)=>{
        state.set(id, 0);
        outgoing.set(id, []);
    });
    edges.forEach((edge, index)=>{
        const list = outgoing.get(edge.data.source);
        if (list) {
            list.push(index);
        }
    });
    const dfs = (nodeId)=>{
        state.set(nodeId, 1);
        const edgeIndexes = outgoing.get(nodeId) ?? [];
        edgeIndexes.forEach((edgeIndex)=>{
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
    nodeIds.forEach((id)=>{
        if ((state.get(id) ?? 0) === 0) {
            dfs(id);
        }
    });
    return backEdgeIndexes;
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
    const orderedNodeIds = elements.nodes.map((node)=>node.data.id);
    const backEdgeIndexes = detectBackEdges(orderedNodeIds, filteredEdges);
    const renderedEdges = filteredEdges.map((edge, index)=>{
        if (!backEdgeIndexes.has(index)) {
            return edge;
        }
        return {
            data: {
                ...edge.data,
                loop: "true"
            }
        };
    });
    if (input.existingCy) {
        input.existingCy.destroy();
    }
    const nextCy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$cytoscape$40$3$2e$33$2e$1$2f$node_modules$2f$cytoscape$2f$dist$2f$cytoscape$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        container: input.container,
        elements: [
            ...elements.nodes,
            ...renderedEdges
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
"[project]/jsonflow-web/libs/renders/registry.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RENDERERS",
    ()=>RENDERERS,
    "getRenderer",
    ()=>getRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$libs$2f$renders$2f$cytoscape$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/libs/renders/cytoscape.ts [app-ssr] (ecmascript)");
;
const RENDERERS = {
    cytoscape: {
        id: "cytoscape",
        label: "Cytoscape",
        render: __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$libs$2f$renders$2f$cytoscape$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderCytoscape"]
    }
};
const getRenderer = (id)=>RENDERERS[id];
}),
"[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditorInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.2_9d8d1bf7a8807769963b5151bd760c41/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$monaco$2d$editor$2b$react$40$4$2e$7$2e$0_$5f$6f17d4086c97620ae2e134f42f327fe9$2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@monaco-editor+react@4.7.0__6f17d4086c97620ae2e134f42f327fe9/node_modules/@monaco-editor/react/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/contexts/ThemeContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const jsonSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    required: [
        "nodes",
        "edges"
    ],
    additionalProperties: false,
    properties: {
        type: {
            enum: [
                "graph",
                "sequence",
                "flow"
            ],
            default: "flow"
        },
        layout: {
            type: "object",
            additionalProperties: false,
            properties: {
                direction: {
                    enum: [
                        "LR",
                        "RL",
                        "TB",
                        "BT"
                    ],
                    default: "LR"
                }
            }
        },
        nodes: {
            type: "array",
            items: {
                type: "object",
                required: [
                    "id"
                ],
                additionalProperties: false,
                properties: {
                    id: {
                        type: "string",
                        minLength: 1
                    },
                    label: {
                        type: "string"
                    },
                    type: {
                        type: "string"
                    },
                    kind: {
                        enum: [
                            "actor",
                            "lifeline",
                            "message",
                            "activity",
                            "state",
                            "class"
                        ]
                    },
                    shape: {
                        enum: [
                            "ellipse",
                            "rectangle",
                            "round-rectangle",
                            "diamond",
                            "hexagon",
                            "triangle"
                        ]
                    },
                    properties: {
                        type: "object",
                        additionalProperties: true
                    }
                }
            }
        },
        edges: {
            type: "array",
            items: {
                type: "object",
                required: [
                    "from",
                    "to"
                ],
                additionalProperties: false,
                properties: {
                    from: {
                        type: "string",
                        minLength: 1
                    },
                    to: {
                        type: "string",
                        minLength: 1
                    },
                    label: {
                        type: "string"
                    },
                    kind: {
                        enum: [
                            "next",
                            "call",
                            "return",
                            "async",
                            "transition",
                            "inherit",
                            "association"
                        ]
                    },
                    link_type: {
                        enum: [
                            "solid",
                            "dash",
                            "dot",
                            "double",
                            "bold",
                            "arrow",
                            "open-arrow"
                        ]
                    }
                }
            }
        }
    }
};
const handleEditorMount = (editor, monaco)=>{
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        allowComments: false,
        schemas: [
            {
                uri: "jsonflow-schema.json",
                fileMatch: [
                    "*"
                ],
                schema: jsonSchema
            }
        ]
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, ()=>{
        const event = new CustomEvent("jsonflow:render");
        window.dispatchEvent(event);
    });
};
function EditorInterface({ value, status, errorMessage, semanticIssues, onChange, onRender }) {
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const issues = semanticIssues ?? [];
    const issueDetail = issues.length === 0 ? null : issues[0].type === "edge-missing-node" ? `Missing node "${issues[0].missing}" referenced by edge ${issues[0].edge.from} → ${issues[0].edge.to}.` : `Unreachable node "${issues[0].nodeId}".`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm",
        style: {
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-primary)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-start justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold",
                                        style: {
                                            color: 'var(--text-primary)'
                                        },
                                        children: "JSON Editor"
                                    }, void 0, false, {
                                        fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]",
                                        style: {
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-muted)'
                                        },
                                        children: "Monaco"
                                    }, void 0, false, {
                                        fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 text-xs",
                                style: {
                                    color: 'var(--text-muted)'
                                },
                                children: status === "ok" ? "Schema valid" : errorMessage ?? "Schema error"
                            }, void 0, false, {
                                fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-end gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${status === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`,
                            style: {
                                borderColor: status === "ok" ? 'var(--accent)' : 'var(--border)',
                                backgroundColor: status === "ok" ? 'var(--bg-tertiary)' : 'var(--bg-tertiary)',
                                color: status === "ok" ? '#059669' : '#dc2626'
                            },
                            title: status === "ok" ? issueDetail ?? "Schema valid" : errorMessage ?? "Schema error",
                            children: status === "ok" ? "Schema OK" : "Schema Error"
                        }, void 0, false, {
                            fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-6 top-20 z-10 rounded-xl border px-3 py-2 text-xs text-left shadow-sm",
                style: {
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] uppercase tracking-[0.3em]",
                                style: {
                                    color: 'var(--text-muted)'
                                },
                                children: "Semantic"
                            }, void 0, false, {
                                fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full px-2 py-0.5",
                                style: {
                                    backgroundColor: 'var(--bg-tertiary)',
                                    color: 'var(--text-secondary)'
                                },
                                children: issues.length === 0 ? "None" : `${issues.length} issue${issues.length === 1 ? "" : "s"}`
                            }, void 0, false, {
                                fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    issues.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: "No semantic issues detected."
                    }, void 0, false, {
                        fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2",
                        children: issueDetail
                    }, void 0, false, {
                        fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex-1 min-h-[520px] overflow-hidden rounded-xl border pt-3",
                style: {
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-primary)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$monaco$2d$editor$2b$react$40$4$2e$7$2e$0_$5f$6f17d4086c97620ae2e134f42f327fe9$2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
                    height: "100%",
                    defaultLanguage: "json",
                    value: value,
                    onChange: (nextValue)=>onChange(nextValue ?? ""),
                    onMount: handleEditorMount,
                    theme: theme === 'dark' ? 'vs-dark' : 'light',
                    options: {
                        minimap: {
                            enabled: false
                        },
                        fontSize: 14,
                        fontFamily: "JetBrains Mono",
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        quickSuggestions: true,
                        suggestOnTriggerCharacters: true
                    }
                }, void 0, false, {
                    fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                    lineNumber: 177,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-wrap items-center gap-3 text-sm",
                style: {
                    color: 'var(--text-muted)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "cursor-pointer rounded-full px-5 py-2 text-sm font-semibold",
                        style: {
                            backgroundColor: 'var(--accent)',
                            color: 'var(--bg-primary)'
                        },
                        onClick: onRender,
                        type: "button",
                        children: "Render Now"
                    }, void 0, false, {
                        fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Press Ctrl / Cmd + Enter to render."
                    }, void 0, false, {
                        fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
}),
"[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VisualInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.2_9d8d1bf7a8807769963b5151bd760c41/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function VisualInterface({ onExport, canExport, stats, isCyclic, containerRef }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm",
        style: {
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-primary)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold",
                                style: {
                                    color: 'var(--text-primary)'
                                },
                                children: "Graph Preview"
                            }, void 0, false, {
                                fileName: "[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx",
                                lineNumber: 16,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]",
                                style: {
                                    borderColor: 'var(--border)',
                                    color: 'var(--text-muted)'
                                },
                                children: "Cytoscape"
                            }, void 0, false, {
                                fileName: "[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this),
                            isCyclic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]",
                                style: {
                                    borderColor: 'var(--border)',
                                    color: 'var(--accent)'
                                },
                                title: "Cycle detected in graph",
                                children: "Cyclic"
                            }, void 0, false, {
                                fileName: "[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx",
                                lineNumber: 21,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "cursor-pointer rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white",
                        style: {
                            backgroundColor: 'var(--accent)',
                            color: 'var(--bg-primary)',
                            opacity: canExport ? 1 : 0.5,
                            cursor: canExport ? 'pointer' : 'not-allowed'
                        },
                        onClick: onExport,
                        disabled: !canExport,
                        type: "button",
                        children: "Export PNG"
                    }, void 0, false, {
                        fileName: "[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "mt-4 min-h-[520px] flex-1 rounded-xl border",
                style: {
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-primary)'
                }
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-wrap gap-2 text-xs",
                style: {
                    color: 'var(--text-muted)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full px-3 py-1",
                        style: {
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-secondary)'
                        },
                        children: [
                            "nodes: ",
                            stats.nodes
                        ]
                    }, void 0, true, {
                        fileName: "[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full px-3 py-1",
                        style: {
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-secondary)'
                        },
                        children: [
                            "edges: ",
                            stats.edges
                        ]
                    }, void 0, true, {
                        fileName: "[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/jsonflow-web/features/workspace/state/workspace-atoms.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "debouncedRawAtom",
    ()=>debouncedRawAtom,
    "errorAtom",
    ()=>errorAtom,
    "errorTypeAtom",
    ()=>errorTypeAtom,
    "parsedAtom",
    ()=>parsedAtom,
    "parsedSourceAtom",
    ()=>parsedSourceAtom,
    "rawAtom",
    ()=>rawAtom,
    "rendererIdAtom",
    ()=>rendererIdAtom,
    "starterJson",
    ()=>starterJson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jotai@2.17.1_@babel+core@7._d478365f0a8b85c7717ee3b28e78d0e7/node_modules/jotai/esm/vanilla.mjs [app-ssr] (ecmascript)");
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
const rawAtom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])(starterJson);
const debouncedRawAtom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])(starterJson);
const parsedAtom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])({
    ok: false,
    error: null
});
const parsedSourceAtom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])(starterJson);
const errorAtom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])(null);
const errorTypeAtom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])(null);
const rendererIdAtom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])("cytoscape");
}),
"[project]/jsonflow-web/features/workspace/state/parse-graph.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseGraphRaw",
    ()=>parseGraphRaw
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$andro$2e$dev$2b$jsonflow$2d$engine$40$1$2e$1$2e$0$2f$node_modules$2f40$andro$2e$dev$2f$jsonflow$2d$engine$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@andro.dev+jsonflow-engine@1.1.0/node_modules/@andro.dev/jsonflow-engine/dist/index.mjs [app-ssr] (ecmascript)");
;
const engine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$andro$2e$dev$2b$jsonflow$2d$engine$40$1$2e$1$2e$0$2f$node_modules$2f40$andro$2e$dev$2f$jsonflow$2d$engine$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Engine"]();
const parseGraphRaw = (raw)=>{
    try {
        const json = JSON.parse(raw);
        const result = engine.parse(json);
        if (!result.ok) {
            const issues = result.error.issues;
            if (issues && issues.length > 0) {
                const first = issues[0];
                const path = first.path.length > 0 ? first.path.join(".") : "root";
                return {
                    parsed: result,
                    errorType: "schema",
                    error: `Schema error at ${path}: ${first.message}`
                };
            }
            return {
                parsed: result,
                errorType: "schema",
                error: "Schema validation failed."
            };
        }
        return {
            parsed: result,
            errorType: null,
            error: null
        };
    } catch (parseError) {
        const message = parseError instanceof Error ? parseError.message : "Invalid JSON";
        return {
            parsed: {
                ok: false,
                error: parseError
            },
            errorType: "json",
            error: `JSON parse error: ${message}`
        };
    }
};
}),
"[project]/jsonflow-web/features/workspace/state/use-workspace-parse.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWorkspaceParse",
    ()=>useWorkspaceParse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.2_9d8d1bf7a8807769963b5151bd760c41/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jotai@2.17.1_@babel+core@7._d478365f0a8b85c7717ee3b28e78d0e7/node_modules/jotai/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/features/workspace/state/workspace-atoms.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$parse$2d$graph$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/features/workspace/state/parse-graph.ts [app-ssr] (ecmascript)");
;
;
;
;
const useWorkspaceParse = ()=>{
    const [raw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rawAtom"]);
    const [debouncedRaw, setDebouncedRaw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["debouncedRawAtom"]);
    const [, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["errorAtom"]);
    const [, setErrorType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["errorTypeAtom"]);
    const [, setParsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parsedAtom"]);
    const [, setParsedSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parsedSourceAtom"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handle = setTimeout(()=>setDebouncedRaw(raw), 250);
        return ()=>clearTimeout(handle);
    }, [
        raw,
        setDebouncedRaw
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$parse$2d$graph$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseGraphRaw"])(debouncedRaw);
        setError(result.error);
        setErrorType(result.errorType);
        setParsed(result.parsed);
        setParsedSource(debouncedRaw);
    }, [
        debouncedRaw,
        setError,
        setErrorType,
        setParsed,
        setParsedSource
    ]);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jotai@2.17.1_@babel+core@7._d478365f0a8b85c7717ee3b28e78d0e7/node_modules/jotai/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/contexts/ThemeContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$libs$2f$renders$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/libs/renders/registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$components$2f$EditorInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/features/workspace/components/EditorInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$components$2f$VisualInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/features/workspace/components/VisualInterface.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/features/workspace/state/workspace-atoms.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$use$2d$workspace$2d$parse$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/features/workspace/state/use-workspace-parse.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$parse$2d$graph$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/features/workspace/state/parse-graph.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
function Workspace() {
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    const [raw, setRaw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rawAtom"]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["errorAtom"]);
    const [errorType, setErrorType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["errorTypeAtom"]);
    const [parsed, setParsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parsedAtom"]);
    const [parsedSource, setParsedSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parsedSourceAtom"]);
    const [rendererId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jotai$40$2$2e$17$2e$1_$40$babel$2b$core$40$7$2e$_d478365f0a8b85c7717ee3b28e78d0e7$2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$workspace$2d$atoms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rendererIdAtom"]);
    const [cy, setCy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const downloadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$use$2d$workspace$2d$parse$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkspaceParse"])();
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
        let currentParsed = parsed;
        let currentError = error;
        let currentErrorType = errorType;
        if (raw !== parsedSource) {
            const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$state$2f$parse$2d$graph$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseGraphRaw"])(raw);
            currentParsed = next.parsed;
            currentError = next.error;
            currentErrorType = next.errorType;
            setError(next.error);
            setErrorType(next.errorType);
            setParsed(next.parsed);
            setParsedSource(raw);
        }
        if (!currentParsed.ok) {
            if (currentErrorType === "json") {
                setError(currentError ?? "JSON parse error.");
            } else if (currentErrorType === "schema") {
                setError(currentError ?? "Schema validation failed.");
            } else {
                setError("Invalid JSON or schema validation failed.");
            }
            return;
        }
        setError(null);
        if (currentParsed.semantic.length > 0) {
            const missing = currentParsed.semantic.find((issue)=>issue.type === "edge-missing-node");
            if (missing && missing.type === "edge-missing-node") {
                setError(`Edge ${missing.edge.from} → ${missing.edge.to} references missing node "${missing.missing}".`);
                return;
            }
        }
        if (cy) {
            cy.destroy();
        }
        const renderer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$libs$2f$renders$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRenderer"])(rendererId);
        const result = renderer.render({
            container: containerRef.current,
            graph: currentParsed.graph,
            engineGraph: currentParsed.engineGraph,
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
        className: "grid w-full flex-1 items-stretch gap-4 px-3 py-3 md:grid-cols-2 md:px-4 md:py-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                ref: downloadRef,
                className: "hidden"
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/features/workspace/components/Workspace.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$components$2f$EditorInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                value: raw,
                status: status,
                errorMessage: error,
                semanticIssues: parsed.ok ? parsed.semantic : undefined,
                onChange: setRaw,
                onRender: renderGraph
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/features/workspace/components/Workspace.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$features$2f$workspace$2f$components$2f$VisualInterface$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onExport: exportImage,
                canExport: Boolean(cy),
                stats: stats,
                isCyclic: parsed.ok ? parsed.meta.isCyclic : undefined,
                containerRef: containerRef
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/features/workspace/components/Workspace.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/jsonflow-web/features/workspace/components/Workspace.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=jsonflow-web_2977d728._.js.map