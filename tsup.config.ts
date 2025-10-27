import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  treeshake: true,
  external: ["react", "react-dom"],
  minify: false,
  outExtension({ format }) {
    if (format === "esm") {
      return { js: ".mjs" };
    }
    return { js: ".cjs" };
  },
});
