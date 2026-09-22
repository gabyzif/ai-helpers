---
name: token-lint
description: Audit a prompt, plan, or instruction file for filler, oversized pasted blocks, vague acceptance criteria, repetition, and missing structure.
---

# Token lint

Run the bundled zero-dependency script:

```bash
node .agents/skills/token-lint/scripts/token-lint.mjs path/to/file.md
node .agents/skills/token-lint/scripts/token-lint.mjs path/to/file.md --json
```

Use the estimate only for relative comparison, not billing. If the verdict is `trim`, remove filler while preserving meaning. If `missingSections` appears, send the prompt through `refine-prompt` instead of guessing a structure.
