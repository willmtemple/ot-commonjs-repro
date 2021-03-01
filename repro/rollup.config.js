import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";

import nodeBuiltins from "builtin-modules";

const pkg = require("./package.json");

export default [
  {
    // Use the package's module field if it has one
    input: "dist-esm/src/index.js",
    external: [
      ...nodeBuiltins,
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.devDependencies),
    ],
    output: {file: "dist/index.js", format: "cjs", sourcemap: true},
    plugins: [nodeResolve(), cjs()],
  },
  {
    input: "dist-esm/src/index.js",
    output: {
      file: `dist/index.browser.js`,
      format: "umd", // "iife" renders no improvement
    },
    plugins: [
      nodeResolve(),
      cjs({
        // This doesn't fix the problem
        // dynamicRequireTargets: ["**/typeonly/**/*.js"],
      }),
    ],
  },
];
