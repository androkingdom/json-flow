import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  debouncedRawAtom,
  errorAtom,
  errorTypeAtom,
  parsedAtom,
  parsedSourceAtom,
  rawAtom,
} from "@/features/workspace/state/workspace-atoms";
import { parseGraphRaw } from "@/features/workspace/state/parse-graph";

export const useWorkspaceParse = () => {
  const [raw] = useAtom(rawAtom);
  const [debouncedRaw, setDebouncedRaw] = useAtom(debouncedRawAtom);
  const [, setError] = useAtom(errorAtom);
  const [, setErrorType] = useAtom(errorTypeAtom);
  const [, setParsed] = useAtom(parsedAtom);
  const [, setParsedSource] = useAtom(parsedSourceAtom);

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedRaw(raw), 250);
    return () => clearTimeout(handle);
  }, [raw, setDebouncedRaw]);

  useEffect(() => {
    const result = parseGraphRaw(debouncedRaw);
    setError(result.error);
    setErrorType(result.errorType);
    setParsed(result.parsed);
    setParsedSource(debouncedRaw);
  }, [debouncedRaw, setError, setErrorType, setParsed, setParsedSource]);
};
