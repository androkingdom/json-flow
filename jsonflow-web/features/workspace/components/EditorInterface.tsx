"use client";

import Editor, { type OnMount } from "@monaco-editor/react";
import { useTheme } from "@/contexts/ThemeContext";
import type { EditorInterfaceProps } from "@/features/workspace/types/ui";

const jsonSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  required: ["nodes", "edges"],
  additionalProperties: false,
  properties: {
    type: { enum: ["graph", "sequence", "flow"], default: "flow" },
    layout: {
      type: "object",
      additionalProperties: false,
      properties: {
        direction: { enum: ["LR", "RL", "TB", "BT"], default: "LR" },
      },
    },
    nodes: {
      type: "array",
      items: {
        type: "object",
        required: ["id"],
        additionalProperties: false,
        properties: {
          id: { type: "string", minLength: 1 },
          label: { type: "string" },
          type: { type: "string" },
          kind: {
            enum: ["actor", "lifeline", "message", "activity", "state", "class"],
          },
          shape: {
            enum: [
              "ellipse",
              "rectangle",
              "round-rectangle",
              "diamond",
              "hexagon",
              "triangle",
            ],
          },
          properties: { type: "object", additionalProperties: true },
        },
      },
    },
    edges: {
      type: "array",
      items: {
        type: "object",
        required: ["from", "to"],
        additionalProperties: false,
        properties: {
          from: { type: "string", minLength: 1 },
          to: { type: "string", minLength: 1 },
          label: { type: "string" },
          kind: {
            enum: [
              "next",
              "call",
              "return",
              "async",
              "transition",
              "inherit",
              "association",
            ],
          },
          link_type: {
            enum: ["solid", "dash", "dot", "double", "bold", "arrow", "open-arrow"],
          },
        },
      },
    },
  },
} as const;

const handleEditorMount: OnMount = (editor, monaco) => {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    allowComments: false,
    schemas: [
      {
        uri: "jsonflow-schema.json",
        fileMatch: ["*"],
        schema: jsonSchema,
      },
    ],
  });

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    const event = new CustomEvent("jsonflow:render");
    window.dispatchEvent(event);
  });
};

export default function EditorInterface({
  value,
  status,
  errorMessage,
  semanticIssues,
  onChange,
  onRender,
}: EditorInterfaceProps) {
  const { theme } = useTheme();
  const issues = semanticIssues ?? [];
  const issueDetail =
    issues.length === 0
      ? null
      : issues[0].type === "edge-missing-node"
        ? `Missing node "${issues[0].missing}" referenced by edge ${issues[0].edge.from} → ${issues[0].edge.to}.`
        : `Unreachable node "${issues[0].nodeId}".`;

  return (
    <section className="relative flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>JSON Editor</h2>
            <span className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              Monaco
            </span>
          </div>
          <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            {status === "ok" ? "Schema valid" : errorMessage ?? "Schema error"}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${
              status === "ok"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
            style={{
              borderColor: status === "ok"
                ? 'var(--accent)'
                : 'var(--border)',
              backgroundColor: status === "ok"
                ? 'var(--bg-tertiary)'
                : 'var(--bg-tertiary)',
              color: status === "ok"
                ? '#059669'
                : '#dc2626'
            }}
            title={
              status === "ok"
                ? issueDetail ?? "Schema valid"
                : errorMessage ?? "Schema error"
            }
          >
            {status === "ok" ? "Schema OK" : "Schema Error"}
          </span>
        </div>
      </div>

      <div
        className="absolute right-6 top-20 z-10 rounded-xl border px-3 py-2 text-xs text-left shadow-sm"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>Semantic</span>
          <span className="rounded-full px-2 py-0.5" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
            {issues.length === 0 ? "None" : `${issues.length} issue${issues.length === 1 ? "" : "s"}`}
          </span>
        </div>
        {issues.length === 0 ? (
          <div className="mt-2">No semantic issues detected.</div>
        ) : (
          <div className="mt-2">
            {issueDetail}
          </div>
        )}
      </div>

      <div className="mt-4 flex-1 min-h-[520px] overflow-hidden rounded-xl border pt-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }}>
        <Editor
          height="100%"
          defaultLanguage="json"
          value={value}
          onChange={(nextValue) => onChange(nextValue ?? "")}
          onMount={handleEditorMount}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "JetBrains Mono",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
          }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
        <button
          className="cursor-pointer rounded-full px-5 py-2 text-sm font-semibold"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--bg-primary)'
          }}
          onClick={onRender}
          type="button"
        >
          Render Now
        </button>
        <span>Press Ctrl / Cmd + Enter to render.</span>
      </div>
    </section>
  );
}
