import { atom } from "jotai";
import type { LayoutDirection } from "@/libs/renders/cytoscape";
import type { SemanticIssue } from "@/features/workspace/types/ui";
import type { RendererId } from "@/libs/renders/types";

export const starterJson = `{
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

export type ParsedState =
  | {
      ok: true;
      graph: { layout?: { direction?: LayoutDirection } };
      engineGraph: { nodes: { id: string }[]; edges: { from: string; to: string }[] };
      meta: { isCyclic: boolean };
      semantic: SemanticIssue[];
    }
  | { ok: false; error: unknown };

export const rawAtom = atom(starterJson);
export const debouncedRawAtom = atom(starterJson);
export const parsedAtom = atom<ParsedState>({ ok: false, error: null });
export const parsedSourceAtom = atom(starterJson);
export const errorAtom = atom<string | null>(null);
export const errorTypeAtom = atom<"json" | "schema" | null>(null);
export const rendererIdAtom = atom<RendererId>("cytoscape");
