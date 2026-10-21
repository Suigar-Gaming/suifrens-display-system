# Changesets without npm publication

Add a changeset for each consumer-visible change with `pnpm changeset`. Choose patch, minor or major and describe the consumer impact. A noninteractive example:

```sh
pnpm changeset --patch @suigar/suifrens-display-system --message "Fix accessory rendering."
```

Use `pnpm changeset status` to review the accumulated plan. At release preparation, run `pnpm changeset version` once: it consumes pending changesets and updates `package.json` and `CHANGELOG.md` together. This does not commit, tag or publish. Do not manually increment package versions. Do not run `changeset publish`.

The root package is private to prevent npm publication; Changesets is configured to version private packages without creating tags. Distribution uses compiled GitHub Release archives. See [AGENTS.md](../AGENTS.md) for validation and compatibility requirements.

After versioning, run the validation commands in `AGENTS.md`: lint, typecheck, `pnpm release:pack`, `pnpm test`, then `pnpm build:storybook`. The pack command builds once and creates the compiled archive, checksum and current release notes in `artifacts/`; the tests then verify that build without recompiling. Packing requires all changesets to be consumed and the latest changelog version to match `package.json`.

When publication is authorized, push a `vX.Y.Z` tag matching the manifest. The [release workflow](../.github/workflows/release.yml) validates, builds and attaches the archive/checksum to a GitHub Release using the current changelog notes. `workflow_dispatch` produces a workflow artifact without publishing. Never replace a published archive or move a release tag.

The prepared 1.0.3 release is currently local for review. Do not commit, push, tag or publish until the user changes that scope. Changesets v3 may report no changesets after versioning while that release diff is still uncommitted; do not add a second changeset just to silence `pnpm changeset status`.
