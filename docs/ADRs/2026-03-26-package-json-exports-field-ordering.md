# `package.json` Conditional Exports Field Ordering

## Status

Accepted

## Context

ADR `2026-03-26-v12-esm-dual-package.md` documents the high-level decision to ship dual ESM + CJS via Rollup. This ADR captures the **specific `package.json` field shape** that was load-bearing — and got the v12 beta into trouble (DX-602).

During the v12 beta, webpack consumers reported that their builds were resolving the unminified browser UMD bundle instead of the ESM/CJS conditional exports. Root cause: webpack honors the legacy top-level `browser` field over the modern `exports` field under certain config combinations, and the field ordering interacted badly with `module` and `main`.

History on this is messy:

- PR #1315 (`fix: add browser field to package.json`) — added `browser`
- A later PR removed `browser` to enable tree-shaking
- DX-602 — webpack-resolution bug during v12 beta

The decision needs to be pinned so future maintainers don't undo it on instinct.

## Decision

The v12 `package.json` uses this shape, in this order:

```json
{
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "require": "./dist/cjs/index.cjs",
      "import": "./dist/esm/index.mjs",
      "default": "./dist/esm/index.mjs"
    },
    "./types": {
      "types": "./dist/types/index.d.ts"
    }
  },
  "main": "./dist/cjs/index.cjs",
  "module": "./dist/esm/index.mjs",
  "jsdelivr": "./dist/browser/index.min.js",
  "unpkg": "./dist/browser/index.min.js",
  "types": "./dist/types/index.d.ts"
}
```

Rules:

- `exports` is the source of truth for any modern bundler/runtime that honors it
- Inside `exports`, **`types` must come first** in each conditional block, then `require`, then `import`, then `default`
- `main` (CJS) and `module` (ESM) remain as legacy fallbacks for tooling that doesn't honor `exports`
- **No `browser` field at the top level** — the browser UMD bundle is reachable only via `jsdelivr`/`unpkg` for `<script>` tag CDN usage
- `types` at the top level remains for older TypeScript versions

## Consequences

- **Enables:** webpack, Vite, esbuild, Rollup, and Node.js native ESM all resolve the correct entry; no CDN consumers broken
- **Prevents:** webpack from picking up the browser UMD bundle in app builds (DX-602 regression)
- **Trade-off:** any future field addition must preserve the order; `package.json` lint rule recommended
- **Invariant:** `types` first in conditional `exports` — TypeScript's resolver is sensitive to ordering even though Node.js is not

Source: DX-602, PR #1315, commit `c136e4754` (browser field removal), `package.json` exports config, v12 release notes.
