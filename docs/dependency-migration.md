# Dependency migration — 2026-10-21

All direct development dependencies were updated to the latest stable registry
release published at least 48 hours ago, except TypeScript (see below). The lockfile also refreshes compatible
transitive dependencies. No prereleases are selected.

| Area      | Migration                                                                          |
| --------- | ---------------------------------------------------------------------------------- |
| Sui       | `@mysten/sui.js` 0.51 → `@mysten/sui` 2.36.0; gRPC Core API replaces JSON-RPC      |
| Build     | Remove tsup and direct esbuild; tsdown 0.23.1 bundles all 12 existing entries      |
| React     | 18 → 19.3.1 for development; React 18/19 remain consumer peers                     |
| API       | Fastify 4 → 5.12.7, matching CORS/compression plugins and TypeBox 1.4.2            |
| Storybook | 8 → 10.6.2, Vite 8.3.4; obsolete essentials/interactions/blocks packages removed   |
| Styles    | Tailwind 3 → 4.3.3; dedicated PostCSS plugin, automatic prefixing/source discovery |
| Tooling   | TypeScript 6.0.3, tsx 4.23.15, Prettier 3.9.10, current React/Node types           |

## Compatibility decisions

- TypeScript 7.0.2 is available, but `@0no-co/graphqlsp` (included through the Sui
  SDK's GraphQL tooling) declares TypeScript `^5 || ^6`. Stay on the latest
  compatible 6.0.3 until that peer range supports 7; do not suppress peer errors.
- Use Node 22.23.3 and pnpm 11.25.0 for reproducibility. tsdown requires Node
  `^22.18 || ^24.11 || >=26`; the SVG loader uses Node's `registerHooks` API.
- React stays external to the library. Existing ESM `.mjs` and `.d.ts` subpaths
  remain intact. TypeScript emits declarations separately to preserve their paths;
  tsdown handles the JavaScript, shared chunks, and hashed SVG assets.
- SVGs retain their existing two-decimal geometry optimization. Four regenerated
  assets change internal clip IDs because React 19 changed `useId` formatting.
- The API uses gRPC JSON object content and paginated dynamic-object fields.
  Missing/deleted objects use the SDK's typed `ObjectError`. A native Node SVG
  loader embeds imported artwork as data URLs when running the API directly.
- Tailwind's changed shadow, blur and radius utility names are migrated to retain
  the existing story presentation. Tailwind only styles Storybook; it is not
  bundled into the public renderer entries.
- Remove unused direct `@mysten/bcs` and `fastify-plugin` dependencies. Replace
  obsolete Storybook addons with core functionality and `addon-docs`.
- Targeted pnpm overrides keep resolved Rollup/YAML dependencies and AJV's fast-uri on
  patched versions within their supported major ranges. Installs enforce a 48-hour
  minimum release age without exclusions, disable automatic peer installation,
  block exotic transitive sources, and deny the listed dependency build scripts.

## Sources consulted

- [Sui 1.0 migration](https://sdk.mystenlabs.com/sui/migrations/sui-1.0),
  [Sui 2.0 migration](https://sdk.mystenlabs.com/sui/migrations/sui-2.0),
  [query API](https://sdk.mystenlabs.com/sui/clients/querying),
  [SDK changelog](https://github.com/MystenLabs/ts-sdks/blob/main/packages/sui/CHANGELOG.md).
- [tsdown migration](https://tsdown.dev/guide/migrate-from-tsup),
  [0.23.1 release](https://github.com/rolldown/tsdown/releases/tag/v0.23.1).
- [Fastify 5 migration](https://fastify.dev/docs/latest/Guides/Migration-Guide-V5/),
  [releases](https://github.com/fastify/fastify/releases),
  [TypeBox provider compatibility](https://github.com/fastify/fastify-type-provider-typebox).
- [React 19 upgrade](https://react.dev/blog/2024/04/25/react-19-upgrade-guide),
  [changelog](https://github.com/facebook/react/blob/main/CHANGELOG.md).
- [Storybook 9 migration](https://storybook.js.org/docs/9/releases/migration-guide),
  [10 migration](https://storybook.js.org/docs/releases/migration-guide),
  [changelog](https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md).
- [Tailwind 4 upgrade](https://tailwindcss.com/docs/upgrade-guide),
  [changelog](https://github.com/tailwindlabs/tailwindcss/blob/main/CHANGELOG.md).
- [TypeScript 6 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html).

- [Vite 8 migration](https://vite.dev/guide/migration),
  [8.3.4 release](https://github.com/vitejs/vite/releases/tag/v8.3.4).
- Additional release notes: [CORS](https://github.com/fastify/fastify-cors/releases),
  [compression](https://github.com/fastify/fastify-compress/releases),
  [TypeBox provider](https://github.com/fastify/fastify-type-provider-typebox/releases),
  [tsx](https://github.com/privatenumber/tsx/releases),
  [Prettier](https://github.com/prettier/prettier/releases),
  [Chromatic addon](https://github.com/chromaui/addon-visual-tests/releases).

## Validation

Run `pnpm typecheck`, `pnpm test`, `pnpm build:storybook`, `pnpm peers check`,
and `pnpm audit`. Tests cover public exports and declarations, both renderer
families, custom kits on both species and sides, emitted SVG files, HTTP status
codes, CORS, gRPC JSON attributes and accessory pagination. The live read-only
mainnet smoke check uses a SuiFren already referenced in the README.

Verified locally with Node 22.23.3 / pnpm 11.25.0:

- Typecheck and all five regression tests pass; library and Storybook builds pass.
- The packed tarball installs in a clean React 18.3.1 consumer; SSR, strict
  declaration checking with React 18 types, and its Vite production build pass.
- A live mainnet read returns attributes and the equipped cowboy hat for the
  README's `0xbe52f4fb87bcd73e0e900aff827480d93707185670ea292ee0b71f1939c4f31f`.
- No peer dependency conflicts; `pnpm audit` reports zero vulnerabilities.
- Storybook and the consumer build still report large-chunk warnings; no bundle
  size optimization is included in this dependency migration.
