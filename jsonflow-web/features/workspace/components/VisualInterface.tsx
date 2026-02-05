"use client";

import type { VisualInterfaceProps } from "@/features/workspace/types/ui";

export default function VisualInterface({
  onExport,
  canExport,
  stats,
  isCyclic,
  containerRef,
}: VisualInterfaceProps) {
  return (
    <section className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Graph Preview</h2>
          <span className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            Cytoscape
          </span>
          {isCyclic ? (
            <span
              className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em]"
              style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
              title="Cycle detected in graph"
            >
              Cyclic
            </span>
          ) : null}
        </div>
        <button
          className="cursor-pointer rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--bg-primary)',
            opacity: canExport ? 1 : 0.5,
            cursor: canExport ? 'pointer' : 'not-allowed'
          }}
          onClick={onExport}
          disabled={!canExport}
          type="button"
        >
          Export PNG
        </button>
      </div>

      <div
        ref={containerRef}
        className="mt-4 min-h-[520px] flex-1 rounded-xl border"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }}
      />

      <div className="mt-4 flex flex-wrap gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
        <span className="rounded-full px-3 py-1" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
          nodes: {stats.nodes}
        </span>
        <span className="rounded-full px-3 py-1" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
          edges: {stats.edges}
        </span>
      </div>
    </section>
  );
}
