# JSONFLOW Client

Frontend playground for editing JSON and rendering Cytoscape graphs.

Live: https://json-flow-client.vercel.app/

## Features

- Monaco editor with schema hints
- Cytoscape preview
- PNG export
- Docs route (`/docs`)

## Install

```bash
pnpm -C client install
```

## Run

```bash
pnpm -C client dev
```

## Build

```bash
pnpm -C client build
```

## Notes

- The client uses the engine source via a workspace alias during development.
- For deployment, bundle the client as a static site.
