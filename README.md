## SuiFrens Display System

Welcome to the documentation for the SuiFrens display system! This repository provides a collection of React components for rendering SuiFren characters, as well as a simple backend API to demonstrate how you can these construct and serve these characters based on dynamic on-chain data. We hope this repository serves as inspiration for new character types, accessories, and much more. Happy adventuring in the SuiFrens universe!

<p align="center">
<img src="https://api-mainnet.suifrens.sui.io/suifrens/0xbe52f4fb87bcd73e0e900aff827480d93707185670ea292ee0b71f1939c4f31f/svg" width="180" height="180" alt="Cowboy Capy" />

<img src="https://api-mainnet.suifrens.sui.io/suifrens/0xc74b8a4f8c424a9073e60e65bbd283027483a1c87d7481d365914ce1d763fcdf/svg" width="180" height="180" alt="Angry Capy" />

<img src="https://api-mainnet.suifrens.sui.io/suifrens/0xccca7914bb7bae704bd9bfc6c41526863ea6d70620c891aad5a06acfb5631d4e/svg" width="180" height="180" alt="Swimmer Bullshark" />
</p>

### Prerequisites

- Node 24.22.1 LTS (see `.node-version`)
- pnpm 12.15.0 (see `packageManager` in `package.json`)

### Overview

SuiFren characters are composed of numerous SVG assets layered in a way that allows us to customize each character with various patterns, characteristics, and accessories. The quickest way to start exploring how the display system works in more detail is to play around with the Storybook for the project:

```
pnpm i
pnpm run storybook
```

We have also provided a backend built using Fastify that can generate SuiFren character images based on live on-chain data. For this functionality, we take advantage of ReactDOM to statically render SuiFren image components into valid SVG assets. To get the backend running:

```
pnpm run dev
```

We can now test out the `/suifrens/:suiFrenId/svg` API by visiting this [URL](http://localhost:3000/suifrens/0xbe79e1415bb4fd7d0d83b325110086d7604ffeaf526dabb30380fe7ae3c51e19/svg) which returns a Capy image based on a mainnet SuiFren object.

### Installing a compiled release

Install the exact versioned GitHub Release archive:

```sh
pnpm add https://github.com/Suigar-Gaming/suifrens-display-system/releases/download/v1.0.3/suigar-suifrens-display-system-1.0.3.tgz
```

The release contains compiled ESM, declarations and SVG assets. Only React and React DOM are peer dependencies; consumers do not install this repository's build tools, run Husky or compile sources. Commit the consuming lockfile to pin archive integrity. See [the release process](.changeset/README.md).

### Recommended imports

For the smallest consumer bundles, prefer subpath imports for runtime values instead of the root entry:

```ts
import { accessories } from '@suigar/suifrens-display-system/accessories';
import { earGeneToEarShape } from '@suigar/suifrens-display-system/attributes';
import { colors } from '@suigar/suifrens-display-system/colors';
import {
	POSITIVE_CAPY_EXPRESSIONS,
	NEGATIVE_BULLSHARK_EXPRESSIONS,
} from '@suigar/suifrens-display-system/expressions';
import { SuiFrenImage } from '@suigar/suifrens-display-system/image';
```

The `/image` entry uses cacheable external SVG assets for accessories. If you need fully self-contained SVG markup (for example, for server-side SVG export), use the compatibility entry:

```ts
import { SuiFrenImage } from '@suigar/suifrens-display-system/image-inline';
```

The root package entry still works, but it intentionally exposes the full public API and is heavier for bundlers to analyze.

### Quality checks

`pnpm lint` runs Oxlint and Oxfmt, `pnpm typecheck` checks the library and Storybook, and `pnpm test` runs Vitest. Run `pnpm build` before the complete test suite because package tests use compiled exports; `pnpm test:unit` runs source tests without a build. `pnpm release:pack` builds and creates the release archive. Use `pnpm lint:fix` to apply lint/format fixes. `prepare` only installs the Husky pre-commit hook during `pnpm install`; lint-staged checks and formats staged authored files before each commit.

Versioning and release notes use [Changesets](.changeset/README.md). See [CHANGELOG.md](CHANGELOG.md) for prepared release notes and [.changeset/README.md](.changeset/README.md) for the GitHub archive workflow.
