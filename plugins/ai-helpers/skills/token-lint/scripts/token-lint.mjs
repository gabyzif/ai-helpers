#!/usr/bin/env node
/**
 * token-lint — estimate token cost and flag prompt bloat.
 * Zero dependencies; ~4 characters per token is a relative heuristic.
 */
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const jsonOut = args.includes("--json");
const fileArg = args.find((a) => !a.startsWith("--"));
const text = fileArg ? readFileSync(fileArg, "utf8") : readFileSync(0, "utf8");
const estTokens = (s) => Math.ceil(s.length / 4);

const checks = {
  filler: {
    label: "Filler phrases",
    run: (t) => {
      const fillers = [
        /please note that/gi,
        /it'?s (important|worth noting)/gi,
        /as (an ai|you (may )?know)/gi,
        /i would like you to/gi,
        /make sure to (be careful|do a good job)/gi,
        /por favor (ten[eé] en cuenta|asegurate de hacerlo bien)/gi,
        /como sab[eé]s/gi,
        /\bbasically\b/gi,
        /\bbásicamente\b/gi,
      ];
      const hits = fillers.flatMap((re) => t.match(re) ?? []);
      return hits.length ? { hits, advice: "Delete filler and state requirements directly." } : null;
    },
  },
  giantCodeBlocks: {
    label: "Pasted code blocks over 30 lines",
    run: (t) => {
      const blocks = [...t.matchAll(/```[\s\S]*?```/g)].map((m) => m[0]).filter((b) => b.split("\n").length > 30);
      return blocks.length ? { hits: blocks.map((b) => `${b.split("\n").length} lines (~${estTokens(b)} tokens)`), advice: "Reference a file and symbol instead of pasting large code." } : null;
    },
  },
  vagueCriteria: {
    label: "Unverifiable acceptance language",
    run: (t) => {
      const vague = [/\b(clean|nice|good|proper|robust|elegant) (code|solution)\b/gi, /\bworks (well|correctly|fine)\b/gi, /\bque (funcione bien|quede limpio|quede prolijo)\b/gi];
      const hits = vague.flatMap((re) => t.match(re) ?? []);
      return hits.length ? { hits, advice: "Replace with a command, test, or observable behavior." } : null;
    },
  },
  duplicateLines: {
    label: "Repeated non-trivial lines",
    run: (t) => {
      const seen = new Map();
      for (const line of t.split("\n")) {
        const norm = line.trim();
        if (norm.length >= 25) seen.set(norm, (seen.get(norm) ?? 0) + 1);
      }
      const dups = [...seen.entries()].filter(([, n]) => n > 1);
      return dups.length ? { hits: dups.map(([l, n]) => `${n}x: ${l.slice(0, 60)}…`), advice: "Say each rule once." } : null;
    },
  },
  missingSections: {
    label: "Missing prompt structure",
    run: (t) => {
      if (estTokens(t) <= 400) return null;
      const lower = t.toLowerCase();
      const missing = ["objective", "constraint", "acceptance", "out of scope"].filter((s) => !lower.includes(s));
      return missing.length ? { hits: missing, advice: "Run long prompts through refine-prompt." } : null;
    },
  },
};

const findings = Object.entries(checks).map(([id, { label, run }]) => {
  const result = run(text);
  return result ? { id, label, ...result } : null;
}).filter(Boolean);
const report = { estimatedTokens: estTokens(text), lines: text.split("\n").length, findings, verdict: findings.length ? "trim" : "lean" };

if (jsonOut) console.log(JSON.stringify(report));
else {
  console.log(`~${report.estimatedTokens} tokens, ${report.lines} lines → ${report.verdict.toUpperCase()}`);
  for (const f of findings) {
    console.log(`\n[${f.id}] ${f.label}`);
    for (const h of f.hits.slice(0, 5)) console.log(`  - ${h}`);
    console.log(`  → ${f.advice}`);
  }
}
