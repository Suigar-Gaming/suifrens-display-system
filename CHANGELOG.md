# @suigar/suifrens-display-system

## 1.0.5

### Patch Changes

- 3018e9f: Fix individual goth boots to render only the selected boot without clipping. Correct bullshark fin animation registration and its attachment pivot, detect transformed accessory roots, and deduplicate fallback registrations. Rebuild animation registrations when switching between capy and bullshark in both inline and asset renderers.

## 1.0.4

### Patch Changes

- ebd68e1: Prepare release versions and changelogs through automated Changesets pull requests, and publish the compiled GitHub archive after the version pull request is merged. Validate feature changes with pending changesets without requiring release packing.
- 5033892: Fix automated GitHub release preparation by invoking Changesets versioning without shell operators being forwarded as command arguments.

## 1.0.3

### Patch Changes

- Distribute compiled ESM entry points, TypeScript declarations and SVG assets as a versioned GitHub Release archive, without consumer build scripts or development dependencies. Restore the historical `CapyImage` and `BullsharkImage` root exports when replacing Suigar's copied distribution with the source build. That source build uses thicker clothing outlines and arm animation markers; team palettes and native geometry remain unchanged.

  Track subsequent releases with Changesets-generated versions and changelog entries, and include the changelog in the release archive.
