# Simple Demonstration of rollup/plugins#743

This demonstrates plugin-commonjs's inability to handle type-only modules in at least some circumstances.

## How to reproduce the error

1. Build the module in the `deps/typeonly` folder (`npm i; npm run build`). This TypeScript module uses `export * from "..."` delcarations, and TypeScript is configured to emit ES6+CommonJS as well as declaration files.

2. Go to the `repro` directory in the root of the repository and build it (again, `npm i; npm run build`). **The build should succeed without any error or warning messages.**

3. Attempt to run the browser tests using karma (still within the `repro` directory). Run `npm run test`. **The browser tests should print an error similar to the following**:

```
Chrome Headless 88.0.4298.0 (Linux x86_64) ERROR
  Uncaught ReferenceError: exports is not defined
  at dist/index.browser.js:28:24

  ReferenceError: exports is not defined
      at dist/index.browser.js:28:24
      at dist/index.browser.js:3:2
      at dist/index.browser.js:4:2
```

This error occurs because the browser bundle is invalid, as the use of `exports` on line 28 is not properly wrapped in a CommonJS shim.

## Findings

1. The error is induced by the type-only module `deps/typeonly/src/types.ts`. When plugin-commonjs inlines this module, it does not include a shim (`function (module, exports) { ... }`) for it, resulting in an invalid bundle. If this module is removed from the module graph (by removing `export * from "./types";` from `deps/typeonly/src/index.ts`), then the resulting browser bundle will not throw an error. (You will get an error about a missing karma adapter, but this is unrelated to the bundle's integrity.)

2. Adding `**/typeonly/**/*.js` as a `dynamicRequireTarget` doesn't make anything better.

3. Using `format: "iife"` does not work any better than `format: "umd"`.

