# Suifrens Display System

This repository owns the source, generated SVG assets and compiled releases of `@suigar/suifrens-display-system`. Read `.changeset/README.md` before changing the package version or its distribution. Read `docs/dependency-migration.md` when updating the toolchain or dependencies.

## Working tree and scope

- Check the branch, working tree and existing version changes before editing. Preserve unrelated work. Use a `codex/` prefix when creating a feature branch.
- Follow the user's current release scope. Preparing a release does not authorize committing, pushing, creating a tag or publishing. A request to keep a release local remains in effect until the user changes it.
- Do not modify a consumer repository unless the requested task includes it.

## Automatic version and changelog preparation

For each consumer-visible change, add or update a `.changeset/*.md` entry without waiting for a separate request. Describe the consumer impact and select the appropriate stable bump:

- Patch: compatible bug fixes, rendering corrections, asset corrections or packaging fixes.
- Minor: new compatible public exports, accessories, team assets or features.
- Major: removed/renamed exports, incompatible props/types, peer support dropped or other breaking consumer behavior. Document the migration. If this exceeds the user's requested scope, preserve compatibility or clarify before proceeding.
- Documentation-only, test-only and agent-instruction changes do not require a version bump unless they change the distributed package or its behavior. Development dependency updates alone do not require one; assess generated output, consumer requirements and compatibility before deciding.

Determine the release baseline from existing tags and the pending release diff; do not infer publication merely from `package.json`. Use stable `X.Y.Z` versions, never prerelease versions by default. Bump once per pending release, considering all accumulated changes. Reuse an already prepared, unpublished version when it covers the required bump; do not increment for every edit, follow-up or rebuild. Never reuse a published version for changed contents. If publication history cannot be established, report the uncertainty instead of assuming a version is available. An explicit user version takes precedence.

Use Changesets as the source of truth: `pnpm changeset` records intent and `pnpm release:status` reviews the plan. At release preparation, run `pnpm release:version` once to consume pending changesets and update `package.json` and `CHANGELOG.md` together. Do not manually increment versions or invent historical changelog entries. Multiple pending changesets are aggregated using the highest required bump. For follow-ups to an already prepared local release, update its unreleased changelog entry instead of applying another bump unnecessarily. Never edit an already published changelog entry.

The package is private to prevent npm publication; `.changeset/config.json` enables versioning private packages with `commit: false` and tagging disabled. Do not run `changeset publish` or `changeset git-tag` for local preparation. Keep any lockfile root version metadata in sync if present; avoid unrelated dependency resolution changes. Update applicable release documentation and archive references to the selected version, but preserve explicitly historical comparisons. Summarize the version decision and consumer-visible changes in the handoff.

## Build, style and compatibility

- Use the pnpm version in `packageManager` and the Node version pinned by CI. Keep runtime pins and workflow setup aligned when changing the toolchain. Use `pnpm/setup` for the GitHub Actions runtime and package-manager setup, matching the Suigar SDK convention; read pnpm from `packageManager` and keep the Node runtime pinned explicitly.
- Use tsdown for bundling, Vitest for tests, Oxlint for linting and Oxfmt for formatting. Keep Husky/lint-staged consistent with the existing setup.
- Always use braces for `if`/`else` bodies, including single statements.
- Prefer stable dependency versions and stable React peer ranges, without prerelease suffixes. Preserve dependency installation safeguards; do not add release-age exclusions or enable dependency build scripts to bypass failures.
- Treat package exports, declarations, refs, animation behavior, inline/external SVG rendering and emitted asset URLs as public compatibility concerns. Preserve historical root exports such as `CapyImage` and `BullsharkImage`.
- Edit authored sources and regenerate derived accessory assets through the build script. Do not hand-edit `dist` or copy compiled files into consumers.
- Name club SVGs with readable club names/slugs. Keep game team identifiers separate from visual identity metadata. Verify both species and home/away colors when changing football rendering.
- Before starting Storybook or another server, check for an existing instance. Clean up processes started for validation unless asked to keep them running.

## Release validation and artifacts

For package/output changes, run the following with the pinned runtime:

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build:storybook
pnpm release:pack
```

`pnpm test` builds the package before running Vitest. Add focused regression coverage when behavior or compatibility changes. Documentation-only changes need formatting and diff checks, not the full build/test suite. Validate workflow changes with actionlint and finish with `git diff --check`. Report failed or skipped checks accurately.

Use the single `release:pack` script; do not distribute the raw source checkout or an ordinary source tarball as the compiled package. Keep archives and their checksums in ignored `artifacts/`. Check the release manifest has the expected exports/types/peers, and no development dependencies or lifecycle scripts. The latest changelog heading must match the package version and all changesets must be consumed before packaging. The archive includes `CHANGELOG.md`, and GitHub release notes come from that version's section. `BUILD_INFO.json` must accurately identify the source commit and dirty state. A dirty local review artifact is acceptable; do not describe it as a published release. After changing packaged contents, repack, verify and refresh any local consumer archive integrity before handing off.

When consumer integration is in scope, install the archive and validate package mode explicitly with `SUIGAR_DISPLAY_SYSTEM_LOCAL=false`; a sibling-source dev server alone does not prove the archive works. Run the consumer's relevant rendering tests, typecheck and production build, following its own `AGENTS.md`. A relative `file:` archive is for local review only and needs the sibling archive. Use an exact versioned GitHub Release asset URL and its lockfile integrity for CI.

## Publishing an authorized release

Once publication is explicitly authorized and validations pass, commit the final sources and version, follow the repository's integration flow, then create/push `vX.Y.Z` matching `package.json`. The release workflow builds and publishes the compiled archive and checksum. Never replace an existing release asset or force move a release tag. Verify workflow success and asset availability before moving an authorized consumer to the release URL. Commit/push consumer changes only when that is also within the user's scope.

`workflow_dispatch` validates and uploads a workflow artifact without publishing a GitHub Release. An `AGENTS.md` guides agent actions; it is not a background scheduler. Do not claim that versioning or publication runs without an agent or CI invocation.
