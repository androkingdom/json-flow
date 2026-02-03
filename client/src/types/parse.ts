import type { Engine } from "@andro.dev/jsonflow-engine";

export type ParseResult =
  | ReturnType<Engine["parse"]>
  | { ok: false; error: unknown };
