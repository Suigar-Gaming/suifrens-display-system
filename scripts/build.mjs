import { spawnSync } from "node:child_process";
import { readFile, rm } from "node:fs/promises";
import { build } from "esbuild";

const entryPoints = {
  index: "src/index.ts",
  image: "src/image.ts",
  "image-assets": "src/image-assets.ts",
  accessories: "src/accessories.ts",
  colors: "src/colors.ts",
  attributes: "src/attributes.ts",
  expressions: "src/expressions.ts",
  "vip-crowns": "src/vip-crowns.ts",
  animation: "src/animation.ts",
  battle: "src/battle.ts",
  types: "src/types.ts",
};

function formatSvgNumber(value) {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  const rounded = value.toFixed(2);
  return rounded
    .replace(/\.0+$/, "")
    .replace(/(\.\d*?)0+$/, "$1")
    .replace(/^-0$/, "0")
    .replace(/^-0\./, "-.")
    .replace(/^0\./, ".");
}

function minifySvg(markup) {
  return markup
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/-?\d+\.\d+/g, (match) => formatSvgNumber(Number(match)))
    .trim();
}

const svgFilePlugin = {
  name: "svg-file-minifier",
  setup(build) {
    build.onLoad({ filter: /\.svg$/ }, async (args) => ({
      contents: minifySvg(await readFile(args.path, "utf8")),
      loader: "file",
    }));
  },
};

const assetResult = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["tsx", "./scripts/generate-accessory-assets.tsx"],
  { stdio: "inherit" }
);

if (assetResult.status !== 0) {
  process.exit(assetResult.status ?? 1);
}

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
  plugins: [svgFilePlugin],
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
