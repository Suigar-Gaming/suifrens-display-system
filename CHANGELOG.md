# @suigar/suifrens-display-system

## 1.1.0

### Minor Changes

- ffcfed5: Add configurable runner singlets with numbered bibs, shorts, headbands and running shoes for capys and bullsharks. Export buildRunnerAccessories with validated kit colors, bib numbers and optional mirrored bib compensation. Both inline and asset renderers preserve native animated joint registration.

## 1.0.7

### Patch Changes

- 2e4f6f6: Restore the original avatar body placement and facial alignment with or without a crown. Keep the native SVG canvas unchanged and allow complete crown artwork to overflow for unframed characters; framed avatars retain their established crop. This also corrects Capy eyes and other nested SVG artwork that were scaled by the enlarged crown canvas in v1.0.6.

## 1.0.6

### Patch Changes

- 02a8bea: Display complete VIP crowns, including tall tips and side ornaments, on Capy and Bullshark. Remove export masks that cut through crown artwork, preserve crown size and placement with matching padded image bounds, and give crowned portraits room for head-bound motion in both renderers.

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
