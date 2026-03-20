import { spawnSync } from "node:child_process";
import { rm } from "node:fs/promises";
import { build } from "esbuild";

const entryPoints = {
  index: "src/index.ts",
  image: "src/image.ts",
  accessories: "src/accessories.ts",
  colors: "src/colors.ts",
  attributes: "src/attributes.ts",
  expressions: "src/expressions.ts",
  "vip-crowns": "src/vip-crowns.ts",
  animation: "src/animation.ts",
  battle: "src/battle.ts",
  types: "src/types.ts",
};

await rm("dist", { recursive: true, force: true });

await build({
  entryPoints,
  outdir: "dist",
  entryNames: "[name]",
  chunkNames: "chunks/[name]-[hash]",
  assetNames: "assets/[name]-[hash]",
  bundle: true,
  splitting: true,
  format: "esm",
  target: ["es2020"],
  platform: "browser",
  sourcemap: false,
  minify: true,
  treeShaking: true,
  legalComments: "none",
  jsx: "automatic",
  loader: {
    ".svg": "file",
  },
  outExtension: {
    ".js": ".mjs",
  },
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
  ],
});

const tscResult = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["tsc", "-p", "tsconfig.build.json"],
  { stdio: "inherit" }
);

if (tscResult.status !== 0) {
  process.exit(tscResult.status ?? 1);
}
