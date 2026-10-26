# Changesets and GitHub releases

Include a `.changeset/*.md` file with each consumer-visible change. Choose the appropriate patch/minor/major bump and describe the consumer impact:

```sh
pnpm changeset --patch @suigar/suifrens-display-system --message "Fix accessory rendering."
```

Changes can be committed directly to `main` with their changeset; feature PRs are optional. The automated version PR remains the release review step.

The workflow reads pending changesets with `pnpm changeset status --output <file>`. `changedFilePatterns: []` keeps status focused on existing changesets, allowing documentation-only changes and version PRs with consumed changesets to pass without adding an empty changeset. Consumer-visible changes still require a changeset as described above. Publication uses the current manifest version and compares it with the manifest at the push event's previous commit; edits to other manifest fields do not trigger a release.

The [workflow](../.github/workflows/build-and-release.yaml) has two jobs: `validate` runs the checks and prepares the archive; `release` runs after validation on `main` and either manages the version PR or publishes the validated archive. After changesets reach `main`, it opens or updates a version PR that runs `changeset version` and updates `package.json` and `CHANGELOG.md`. Version PR checks are dispatched explicitly because PRs created with `GITHUB_TOKEN` do not trigger normal pull-request workflows. Enable **Allow GitHub Actions to create and approve pull requests** in the repository's Actions settings.

Merge the version PR to publish the compiled `.tgz` and checksum on GitHub, using that version's changelog notes. No npm publication, npm token, manual version bump or manual tag is needed. The package is private; Changesets is configured to version private packages without publishing them.

For local validation, run `pnpm build` then `pnpm test`. After versioning, `pnpm release:pack` builds the archive in `artifacts/`; pending changesets must be consumed and the latest changelog version must match the manifest. A manual workflow run on `main` can retry a release; runs on other branches only validate. Existing releases are never overwritten.
