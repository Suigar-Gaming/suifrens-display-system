# Git publication identities

Git author, committer and tagger fields are public. Commit and annotated-tag messages, pull-request titles and bodies can also become public squash messages. Use a publication identity from `.github/publication-identities.json`; approval applies to the exact name/email pair. Add another contributor only after the owner approves their publication identity. Never put private name/email values in this policy, tests or diagnostics.

The pre-commit hook checks the effective author and committer, including environment overrides. The commit-msg hook rejects unsafe attributions and emails before a local commit. The pre-push hook checks every incoming commit plus annotated tags. The `Publication privacy` workflow checks incoming author/committer metadata, structured attribution trailers, email addresses in messages and PR title/body metadata, including metadata-only PR edits. It emits no rejected values.

Before merging, use the same approved identity in the final squash title/message. GitHub can generate attribution during the merge; the workflow cannot read a future edited squash message, so a maintainer must review that final message. Make `publication-privacy` a required status check if branch rules allow it. Do not bypass it for release automation.

This gate prevents new checked metadata from being published. It does not erase existing objects, PR refs, fork copies, old patches or provider caches, and it does not detect arbitrary private prose without an email or attribution marker. Historical cleanup and cache removal require separate verification.

Validation:

```sh
node --test scripts/validate-git-identities.test.mjs
node scripts/validate-git-identities.mjs --config
```

This change affects development hooks and CI only, not the compiled library or release archive, so no package version or changeset is required.
