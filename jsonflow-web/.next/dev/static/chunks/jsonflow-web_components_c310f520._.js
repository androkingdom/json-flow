(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/jsonflow-web/components/EditorInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditorInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.2_9d8d1bf7a8807769963b5151bd760c41/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$monaco$2d$editor$2b$react$40$4$2e$7$2e$0_$5f$6f17d4086c97620ae2e134f42f327fe9$2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@monaco-editor+react@4.7.0__6f17d4086c97620ae2e134f42f327fe9/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/contexts/ThemeContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
                        type: "string"
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
                        type: "string"
                    },
                    to: {
                        type: "string"
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
function EditorInterface({ value, status, errorMessage, onChange, onRender }) {
    _s();
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-2xl border bg-white p-5 shadow-sm",
        style: {
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-primary)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold",
                                style: {
                                    color: 'var(--text-primary)'
                                },
                                children: "JSON Editor"
                            }, void 0, false, {
                                fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]",
                                style: {
                                    borderColor: 'var(--border)',
                                    color: 'var(--text-muted)'
                                },
                                children: "Monaco"
                            }, void 0, false, {
                                fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${status === "ok" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`,
                            style: {
                                borderColor: status === "ok" ? 'var(--accent)' : 'var(--border)',
                                backgroundColor: status === "ok" ? 'var(--bg-tertiary)' : 'var(--bg-tertiary)',
                                color: status === "ok" ? '#059669' : '#dc2626'
                            },
                            title: status === "ok" ? "Schema valid" : errorMessage ?? "Schema error",
                            children: status === "ok" ? "Schema OK" : "Schema Error"
                        }, void 0, false, {
                            fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 overflow-hidden rounded-xl border pt-3",
                style: {
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-primary)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$monaco$2d$editor$2b$react$40$4$2e$7$2e$0_$5f$6f17d4086c97620ae2e134f42f327fe9$2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
                    height: "520px",
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
                    fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-wrap items-center gap-3 text-sm",
                style: {
                    color: 'var(--text-muted)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "rounded-full px-5 py-2 text-sm font-semibold",
                        style: {
                            backgroundColor: '#f59e0b',
                            color: '#78350f'
                        },
                        onClick: onRender,
                        type: "button",
                        children: "Render Now"
                    }, void 0, false, {
                        fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Press Ctrl / Cmd + Enter to render."
                    }, void 0, false, {
                        fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/jsonflow-web/components/EditorInterface.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s(EditorInterface, "JkSxfi8+JQlqgIgDOc3wQN+nVIw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = EditorInterface;
var _c;
__turbopack_context__.k.register(_c, "EditorInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/jsonflow-web/components/VisualInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VisualInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.2_9d8d1bf7a8807769963b5151bd760c41/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function VisualInterface({ onExport, canExport, stats, containerRef }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-2xl border bg-white p-5 shadow-sm",
        style: {
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-primary)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold",
                                style: {
                                    color: 'var(--text-primary)'
                                },
                                children: "Graph Preview"
                            }, void 0, false, {
                                fileName: "[project]/jsonflow-web/components/VisualInterface.tsx",
                                lineNumber: 15,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]",
                                style: {
                                    borderColor: 'var(--border)',
                                    color: 'var(--text-muted)'
                                },
                                children: "Cytoscape"
                            }, void 0, false, {
                                fileName: "[project]/jsonflow-web/components/VisualInterface.tsx",
                                lineNumber: 16,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/jsonflow-web/components/VisualInterface.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white",
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
                        fileName: "[project]/jsonflow-web/components/VisualInterface.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/jsonflow-web/components/VisualInterface.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "mt-4 h-130 rounded-xl border",
                style: {
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-primary)'
                }
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/components/VisualInterface.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-wrap gap-2 text-xs",
                style: {
                    color: 'var(--text-muted)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        fileName: "[project]/jsonflow-web/components/VisualInterface.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        fileName: "[project]/jsonflow-web/components/VisualInterface.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/jsonflow-web/components/VisualInterface.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/jsonflow-web/components/VisualInterface.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = VisualInterface;
var _c;
__turbopack_context__.k.register(_c, "VisualInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/jsonflow-web/components/Workspace.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Workspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.2_9d8d1bf7a8807769963b5151bd760c41/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_@babel+core@7.2_9d8d1bf7a8807769963b5151bd760c41/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$cytoscape$40$3$2e$33$2e$1$2f$node_modules$2f$cytoscape$2f$dist$2f$cytoscape$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/cytoscape@3.33.1/node_modules/cytoscape/dist/cytoscape.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$andro$2e$dev$2b$jsonflow$2d$engine$40$1$2e$0$2e$0$2f$node_modules$2f40$andro$2e$dev$2f$jsonflow$2d$engine$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@andro.dev+jsonflow-engine@1.0.0/node_modules/@andro.dev/jsonflow-engine/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/contexts/ThemeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$components$2f$EditorInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/components/EditorInterface.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$components$2f$VisualInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/jsonflow-web/components/VisualInterface.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
const engine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$andro$2e$dev$2b$jsonflow$2d$engine$40$1$2e$0$2e$0$2f$node_modules$2f40$andro$2e$dev$2f$jsonflow$2d$engine$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Engine"]();
const styles = [
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
function Workspace() {
    _s();
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [raw, setRaw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(starterJson);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cy, setCy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const downloadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Workspace.useMemo[parsed]": ()=>{
            try {
                return engine.parse(JSON.parse(raw));
            } catch (parseError) {
                return {
                    ok: false,
                    error: parseError
                };
            }
        }
    }["Workspace.useMemo[parsed]"], [
        raw
    ]);
    const status = parsed.ok ? "ok" : "error";
    const stats = parsed.ok ? {
        nodes: parsed.cytoscape.nodes.length,
        edges: parsed.cytoscape.edges.length
    } : {
        nodes: 0,
        edges: 0
    };
    const renderGraph = ()=>{
        if (!containerRef.current) {
            return;
        }
        if (!parsed.ok) {
            setError("Invalid JSON or schema validation failed.");
            return;
        }
        setError(null);
        if (cy) {
            cy.destroy();
        }
        const nextCy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$cytoscape$40$3$2e$33$2e$1$2f$node_modules$2f$cytoscape$2f$dist$2f$cytoscape$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
            container: containerRef.current,
            elements: [
                ...parsed.cytoscape.nodes,
                ...parsed.cytoscape.edges
            ],
            style: styles,
            layout: {
                name: "breadthfirst",
                directed: true,
                padding: 24
            }
        });
        const direction = parsed.graph.layout?.direction ?? "LR";
        nextCy.ready(()=>applyLayoutDirection(nextCy, direction));
        setCy(nextCy);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Workspace.useEffect": ()=>{
            const handler = {
                "Workspace.useEffect.handler": ()=>renderGraph()
            }["Workspace.useEffect.handler"];
            window.addEventListener("jsonflow:render", handler);
            return ({
                "Workspace.useEffect": ()=>window.removeEventListener("jsonflow:render", handler)
            })["Workspace.useEffect"];
        }
    }["Workspace.useEffect"], [
        parsed.ok,
        raw
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "grid w-full gap-6 px-6 py-8 md:grid-cols-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                ref: downloadRef,
                className: "hidden"
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/components/Workspace.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$components$2f$EditorInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                value: raw,
                status: status,
                errorMessage: error,
                onChange: setRaw,
                onRender: renderGraph
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/components/Workspace.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$2_9d8d1bf7a8807769963b5151bd760c41$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$components$2f$VisualInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onExport: exportImage,
                canExport: Boolean(cy),
                stats: stats,
                containerRef: containerRef
            }, void 0, false, {
                fileName: "[project]/jsonflow-web/components/Workspace.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/jsonflow-web/components/Workspace.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, this);
}
_s(Workspace, "yp+fw1v/CceqkvH9Xbbhk2oq1/Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$jsonflow$2d$web$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = Workspace;
var _c;
__turbopack_context__.k.register(_c, "Workspace");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=jsonflow-web_components_c310f520._.js.map