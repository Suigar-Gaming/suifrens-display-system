import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { ACCESSORY_RENDERERS } from "../src/components/accessories/inlineRegistry.js";
import type { AccessoryRendererProps } from "../src/components/accessories/AccessorySlot.js";
import type { AccessoryMetadata } from "../src/utils/accessoryUtils.js";

const OUTPUT_DIR = "src/generated/accessory-assets";
const MANIFEST_PATH = "src/generated/accessoryAssetManifest.ts";

const VARIANTS = [
  { key: "default", props: {} },
  { key: "body", props: { body: true } },
  { key: "left", props: { lor: "left" as const } },
  { key: "right", props: { lor: "right" as const } },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function minifySvg(markup: string) {
  let svg = markup
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s?data-reactroot=\"\"/g, "")
    .trim();

  if (svg.startsWith("<svg") && !svg.includes("xmlns=")) {
    svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  return svg;
}

function importName(accessoryName: string, variant: string) {
  const parts = `${accessoryName}-${variant}`
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/);
  const name = parts
    .map((part, index) =>
      index === 0
        ? part.charAt(0).toLowerCase() + part.slice(1)
        : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join("");
  return /^[0-9]/.test(name) ? `asset${name}` : name;
}

function makeAccessory(name: string): AccessoryMetadata {
  return {
    name,
    type: "generated",
    category: "generated",
    renderOptions: {},
    price: 0,
    quantity: null,
    description: "",
    collection: "",
  };
}

await rm(OUTPUT_DIR, { recursive: true, force: true });
await mkdir(OUTPUT_DIR, { recursive: true });
await mkdir("src/generated", { recursive: true });

const imports: string[] = [];
const manifestEntries: string[] = [];

for (const [name, renderer] of Object.entries(ACCESSORY_RENDERERS).sort(
  ([left], [right]) => left.localeCompare(right)
)) {
  const variants: string[] = [];

  for (const variant of VARIANTS) {
    const props: AccessoryRendererProps = {
      accessory: makeAccessory(name),
      species: "capy",
      ...variant.props,
    };
    const svg = minifySvg(renderToStaticMarkup(renderer(props)));
    const filename = `${slugify(name)}-${variant.key}.svg`;
    const importId = importName(name, variant.key);

    await writeFile(join(OUTPUT_DIR, filename), svg);
    imports.push(`import ${importId} from "./accessory-assets/${filename}";`);
    variants.push(
      `${JSON.stringify(
        variant.key
      )}: new URL(${importId}, import.meta.url).href`
    );
  }

  manifestEntries.push(`${JSON.stringify(name)}: { ${variants.join(", ")} }`);
}

const manifest = `${imports.join("\n")}

export type AccessoryAssetVariant = "default" | "body" | "left" | "right";

export const ACCESSORY_ASSET_MANIFEST = {
  ${manifestEntries.join(",\n  ")}
} as const satisfies Record<string, Partial<Record<AccessoryAssetVariant, string>>>;
`;

await writeFile(MANIFEST_PATH, manifest);
