"use client";

import Editor, { type OnMount } from "@monaco-editor/react";
import { useTheme } from "@/contexts/ThemeContext";
import type { EditorInterfaceProps } from "@/types/ui";

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
          id: { type: "string" },
          label: { type: "string" },
          type: { type: "string" },
          kind: {
            enum: ["actor", "lifeline", "message", "activity", "state", "class"],
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
          from: { type: "string" },
          to: { type: "string" },
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
  onChange,
  onRender,
}: EditorInterfaceProps) {
  const { theme } = useTheme();

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>JSON Editor</h2>
          <span className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            Monaco
          </span>
        </div>
        <div className="flex items-center gap-2">
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
            title={status === "ok" ? "Schema valid" : errorMessage ?? "Schema error"}
          >
            {status === "ok" ? "Schema OK" : "Schema Error"}
          </span>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border pt-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }}>
        <Editor
          height="520px"
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
          className="rounded-full px-5 py-2 text-sm font-semibold"
          style={{
            backgroundColor: '#f59e0b',
            color: '#78350f'
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
