# Suifrens Display System

This repository owns the source, generated SVG assets and compiled releases of `@suigar/suifrens-display-system`. Read `.changeset/README.md` before changing the package version or its distribution.

## Working tree and scope

- Check the branch and working tree before editing. Preserve unrelated work. `main` is the default working and release branch; direct commits to `main` are allowed when committing is part of the user-authorized task. A feature branch is optional; use a `codex/` prefix when creating one. Do not switch or merge an existing working branch merely to enforce this default.
- Follow the user's current release scope. Preparing a release does not authorize committing, pushing, creating a tag or publishing. A request to keep a release local remains in effect until the user changes it.
- Do not modify a consumer repository unless the requested task includes it.

## Automatic version and changelog preparation

For each consumer-visible change, add or update a `.changeset/*.md` entry without waiting for a separate request. Describe the consumer impact and select the appropriate stable bump:

- Patch: compatible bug fixes, rendering corrections, asset corrections or packaging fixes.
- Minor: new compatible public exports, accessories, team assets or features.
- Major: removed/renamed exports, incompatible props/types, peer support dropped or other breaking consumer behavior. Document the migration. If this exceeds the user's requested scope, preserve compatibility or clarify before proceeding.
- Documentation-only, test-only, agent-instruction and internal CI/workflow refactoring changes do not require a version bump unless they change the distributed package or its consumer-visible behavior. Development dependency updates alone do not require one; assess generated output, consumer requirements and compatibility before deciding.

For changes that require a version bump, create or update the changeset file as part of implementation, before handing off. Keep one changeset per task or feature branch by default, reusing that task's file for follow-up changes and selecting the highest required bump. On `main`, create a new file for a new task; do not modify pending changesets inherited from earlier work. Notes must describe this package's consumer-visible behavior, not unrelated workspace maintenance. Use a readable unique filename and this frontmatter:

```md
---
'@suigar/suifrens-display-system': patch
---

Describe the consumer-visible change.
```

Use the highest appropriate bump for the change. Do not manually edit the version or changelog, consume changesets with `changeset version`, or create release tags during routine feature work. The workflow on `main` creates a version PR, and merging that PR publishes the GitHub archive. Changesets aggregates pending entries into one version. Never invent historical release notes or edit a published release.

The package is private to prevent npm publication. Do not run `changeset publish`. Keep required changesets in the same change as the implementation. Release tooling fixes require a changeset only when they correct a consumer-visible distribution issue, such as incorrect archive contents, broken installation or missing release assets. Renaming workflows, merging jobs, extracting YAML anchors and refactoring release-plan detection with equivalent publication conditions do not require a changeset. Before adding an entry, identify the concrete consumer-visible effect; touching release tooling alone is not sufficient. If the final scope has no such effect, remove any changeset created for this task, preserving entries from other tasks.

## Build, style and compatibility

- Use the pnpm version in `packageManager` and the Node version pinned by CI. Keep runtime pins and workflow setup aligned when changing the toolchain. Use `pnpm/setup` for the GitHub Actions runtime and package-manager setup, matching the Suigar SDK convention; read pnpm from `packageManager` and keep the Node runtime pinned explicitly. Support only released LTS lines starting at Node 24; do not allow Node 22, odd-numbered Current lines or future non-LTS lines through an open-ended engine range. Add a newer major only after its LTS status and compatibility have been verified.
- Use tsdown for bundling, Vitest for tests, Oxlint for linting and Oxfmt for formatting. Keep Husky/lint-staged consistent with the existing setup.
- Always use braces for `if`/`else` bodies, including single statements.
- When updating dependencies, consult their official changelogs and migration guides, preserve peer compatibility and verify affected behavior.
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
pnpm build
pnpm test
pnpm build:storybook
```

`prepare` only installs Husky hooks; dependency installation must not compile the library. `pnpm test` runs Vitest without rebuilding. Run `pnpm build` first for the complete suite, since package tests exercise compiled exports; `pnpm test:unit` needs no build. `pnpm release:pack` builds and packages an already versioned release. Routine feature checks use `pnpm build` and tests while changesets are pending; CI packs only when no changesets remain. Add focused regression coverage when behavior or compatibility changes. Documentation-only changes need formatting and diff checks, not the full build/test suite. Validate workflow changes with actionlint and finish with `git diff --check`. Report failed or skipped checks accurately.

Use the single `release:pack` script; do not distribute the raw source checkout or an ordinary source tarball as the compiled package. Keep archives and their checksums in ignored `artifacts/`. Check the release manifest has the expected exports/types/peers, and no development dependencies or lifecycle scripts. The latest changelog heading must match the package version and all changesets must be consumed before packaging. The archive includes `CHANGELOG.md`, and GitHub release notes come from that version's section. `BUILD_INFO.json` must accurately identify the source commit and dirty state. A dirty local review artifact is acceptable; do not describe it as a published release. After changing packaged contents, repack, verify and refresh any local consumer archive integrity before handing off.

When consumer integration is in scope, install the archive and validate package mode explicitly with `SUIGAR_DISPLAY_SYSTEM_LOCAL=false`; a sibling-source dev server alone does not prove the archive works. Run the consumer's relevant rendering tests, typecheck and production build, following its own `AGENTS.md`. A relative `file:` archive is for local review only and needs the sibling archive. Use an exact versioned GitHub Release asset URL and its lockfile integrity for CI.

## Automated releases

Changes merged into `main` with changeset entries produce a version PR automatically. Merging the version PR publishes a compiled GitHub Release archive after validation. No manual tag or npm publish is needed. GitHub Actions must be allowed to create PRs in the repository settings. A manual workflow run on `main` retries an unpublished release; branch runs only validate. Never replace an existing release asset or force-move a tag. Verify the resulting workflow and asset availability before updating an authorized consumer dependency.
