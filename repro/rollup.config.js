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
      format: "umd",
    },
    plugins: [
      nodeResolve(),
      cjs({
        // Doesn't work with dynamic require targets enforced either, but it
        // does eliminate the circular dependency warnings.
        //dynamicRequireTargets: ["node_modules/@opentelemetry/api/**/*.js"],
      }),
    ],
  },
];
