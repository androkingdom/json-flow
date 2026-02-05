import { Engine } from "@andro.dev/jsonflow-engine";
import type { ParsedState } from "@/features/workspace/state/workspace-atoms";

const engine = new Engine();

export type ParseGraphResult = {
  parsed: ParsedState;
  error: string | null;
  errorType: "json" | "schema" | null;
};

export const parseGraphRaw = (raw: string): ParseGraphResult => {
  try {
    const json = JSON.parse(raw);
    const result = engine.parse(json);
    if (!result.ok) {
      const issues = (result.error as { issues?: { path: (string | number)[]; message: string }[] }).issues;
      if (issues && issues.length > 0) {
        const first = issues[0];
        const path = first.path.length > 0 ? first.path.join(".") : "root";
        return {
          parsed: result,
          errorType: "schema",
          error: `Schema error at ${path}: ${first.message}`,
        };
      }
      return {
        parsed: result,
        errorType: "schema",
        error: "Schema validation failed.",
      };
    }
    return { parsed: result, errorType: null, error: null };
  } catch (parseError) {
    const message = parseError instanceof Error ? parseError.message : "Invalid JSON";
    return {
      parsed: { ok: false, error: parseError },
      errorType: "json",
      error: `JSON parse error: ${message}`,
    };
  }
};
