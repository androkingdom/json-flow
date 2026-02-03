# JSONFLOW

A **JSONFLOW** Schema-Aware Logic Visualization Engine.

## 1. Build Commands

### Engine Package (engine/)
- `pnpm build` - Build engine with tsup (outputs CJS + ESM + DTS)
- `pnpm dev` - Watch mode development build
- `pnpm test` - Tests (not implemented yet)

### Project Structure Commands
- Use `pnpm` as package manager (version 10.28.1)
- Each subdirectory (engine/, client/, server/) has its own package.json
- Engine builds to `dist/` with both CommonJS and ES modules

## 2. Code Style Guidelines

### TypeScript Configuration
- **Target:** ES2020 with NodeNext module resolution
- **Strict Mode:** Enabled with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`
- **Module Syntax:** `verbatimModuleSyntax: true` (use explicit extensions)
- **Imports:** Use `import type` for type-only imports

### Naming Conventions
- **Files:** kebab-case for files, PascalCase for React components (when implemented)
- **Variables/Functions:** camelCase
- **Types/Interfaces:** PascalCase
- **Constants:** UPPER_SNAKE_CASE for exported constants
- **Enums:** PascalCase with enum members in UPPER_SNAKE_CASE

### Code Organization
- **Engine:** Core logic with Zod schemas and Cytoscape processing
- **Schema Definition:** All Zod schemas should be in dedicated schema files
- **Error Handling:** Use Zod's built-in validation, provide clear error messages
- **Type Safety:** Leverage TypeScript's strict mode and Zod for runtime validation

### Import Style
```typescript
// Type imports
import type { NodeSchema, EdgeSchema } from './types';
// Value imports
import { z } from 'zod';
import { defineConfig } from 'tsup';
```

### API Design Patterns
- Export classes for core engine functionality
- Use Zod schemas for all JSON validation
- Provide clear typing for all public APIs
- Follow functional programming patterns where applicable

## 3. Technical Stack

### Core Dependencies
- **Validation:** Zod for schema validation
- **Build:** tsup for TypeScript compilation
- **Visualization:** Cytoscape.js (planned)
- **Layout:** cytoscape-dagre (planned)

### Development Tools
- **Package Manager:** pnpm (required, version locked)
- **TypeScript:** 5.9.3 with strict configuration
- **Testing Framework:** To be implemented (likely vitest)

## 4. Data Flow Architecture

1. **Input Layer:** JSON data enters the system
2. **Validation Layer:** Zod schemas validate and transform data
3. **Processing Layer:** Engine processes validated data according to graph type
4. **Output Layer:** Cytoscape-compatible format for visualization

## 5. Schema Definitions

### Core Data Structures
```typescript
const NodeSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
  type: z.string().optional(),
  kind: z.enum(["actor", "lifeline", "message", "activity", "state", "class"]).optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
});

const EdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  label: z.string().optional(),
  kind: z.enum(["next", "call", "return", "async", "transition", "inherit", "association"]).optional(),
  link_type: z.enum(["solid", "dash", "dot", "double", "bold", "arrow", "open-arrow"]).optional(),
});

const GraphSchema = z.object({
  type: z.enum(["graph", "sequence", "flow"]).default("flow"),
  layout: z.object({ direction: z.enum(["LR", "RL", "TB", "BT"]).default("LR") }).optional(),
  nodes: z.array(NodeSchema),
  edges: z.array(EdgeSchema),
});
```

## 6. Project Structure

- `engine/`: Core processing engine with Zod validation
- `client/`: Frontend React application (planned)
- `server/`: Backend server (planned)
- `docs/`: Project documentation and specifications
- `AGENTS.md`: This file for agentic coding guidelines

## 7. Development Workflow

- All engine changes should maintain TypeScript strict mode compliance
- Test validation logic with sample JSON data
- Ensure schema changes are backwards compatible when possible
- Update documentation when adding new graph types or link styles
