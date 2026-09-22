#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(new URL("..", import.meta.url).pathname);
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const read = (relative) => {
  const path = join(root, relative);
  check(existsSync(path), `missing: ${relative}`);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
};

for (const file of [
  "README.md", "INSTALAR.md", "AGENTS.md", "CLAUDE.md", "GEMINI.md",
  ".github/copilot-instructions.md", "CONTRIBUTING.md", "memory/USER.md",
  "memory/LEARNINGS.md", "memory/WORKFLOWS.md", "package.json",
  "adapters/claude/ai-helpers/skill.md", "adapters/gemini/INSTRUCTIONS.md",
  "adapters/universal/START-HERE.md", "adapters/chatgpt/CUSTOM-INSTRUCTIONS.md",
  "plugins/ai-helpers/.codex-plugin/plugin.json",
  ".agents/plugins/marketplace.json", "tests/SCENARIOS.md",
  "scripts/build-packages.sh"
]) read(file);

const user = read("memory/USER.md");
for (const field of ["es-neutral", "es-AR", "es-MX", "es-ES", "vos", "usted"]) {
  check(user.includes(field), `memory/USER.md lacks ${field}`);
}
const refine = read(".agents/skills/refine-prompt/SKILL.md");
for (const route of ["direct", "execute", "plan-first", "plan-first + review"]) {
  check(refine.includes(route), `refine skill lacks route ${route}`);
}
const instalar = read("INSTALAR.md");
for (const platform of ["ChatGPT", "Claude", "Gemini", "Copilot", "Pi", "Codex"]) {
  check(instalar.includes(platform), `INSTALAR.md lacks ${platform}`);
}

const skillRoot = join(root, ".agents/skills");
for (const skill of readdirSync(skillRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
  const file = join(skillRoot, skill.name, "SKILL.md");
  check(existsSync(file), `${skill.name} lacks SKILL.md`);
  if (existsSync(file)) {
    const text = readFileSync(file, "utf8");
    check(/^---\s*[\s\S]*?^name:\s*\S+/m.test(text), `${skill.name} lacks frontmatter name`);
    check(/^---\s*[\s\S]*?^description:\s*.+/m.test(text), `${skill.name} lacks frontmatter description`);
  }
}

for (const file of ["AGENTS.md", "INSTALAR.md", ".agents/skills/refine-prompt/SKILL.md", "adapters/gemini/INSTRUCTIONS.md", "adapters/universal/START-HERE.md"]) {
  const text = read(file);
  check(!/TODO|TBD|FIXME/.test(text), `${file} contains unresolved marker`);
}
const scenarios = read("tests/SCENARIOS.md");
check((scenarios.match(/^## /gm) || []).length >= 7, "tests/SCENARIOS.md needs seven scenarios");

const profiles = ["general", "pm", "diseno", "desarrollo", "contabilidad", "psicologia"];
const profileSkill = {
  general: ["profile-pm", "profile-design", "profile-developer", "profile-accounting", "profile-psychology"],
  pm: ["profile-pm"], diseno: ["profile-design"], desarrollo: ["profile-developer"],
  contabilidad: ["profile-accounting"], psicologia: ["profile-psychology"]
};
const listZip = (path) => execFileSync("unzip", ["-Z1", path], { encoding: "utf8" }).trim().split("\n").filter(Boolean);

const chatgptDir = join(root, "dist/chatgpt");
check(existsSync(chatgptDir), "missing dist/chatgpt");
if (existsSync(chatgptDir)) {
  check(!readdirSync(chatgptDir).some((file) => file.endsWith(".zip")), "dist/chatgpt must not contain ZIP files");
  for (const profile of profiles) {
    const file = join(chatgptDir, `ai-helpers-${profile}.md`);
    check(existsSync(file), `missing ChatGPT instructions: dist/chatgpt/ai-helpers-${profile}.md`);
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    check(text.length <= 1500, `${file} exceeds the 1,500-character Custom Instructions limit`);
    check(!text.includes("memory/USER.md"), `${file} must not require repository memory`);
    for (const required of [
      "Perfil base:", "Preferencias:", "direct", "execute", "plan-first", "plan-first + review",
      "diseño + desarrollo", "PM:", "Diseño:", "Desarrollo:", "Contabilidad:", "Psicología:"
    ]) check(text.includes(required), `${file} lacks ${required}`);
  }
}

for (const platform of ["claude", "gemini", "universal"]) {
  for (const profile of profiles) {
    const zip = join(root, "dist", platform, `ai-helpers-${profile}.zip`);
    check(existsSync(zip), `missing ZIP: dist/${platform}/ai-helpers-${profile}.zip`);
    if (!existsSync(zip)) continue;
    const entries = listZip(zip);
    const prefix = `ai-helpers-${profile}/`;
    check(entries.every((entry) => entry.startsWith(prefix)), `${zip} has more than one root folder`);
    if (platform === "claude") check(entries.includes(`${prefix}skill.md`), `${zip} lacks skill.md`);
    if (platform === "gemini") check(entries.includes(`${prefix}INSTRUCTIONS.md`), `${zip} lacks INSTRUCTIONS.md`);
    if (platform === "universal") check(entries.includes(`${prefix}START-HERE.md`), `${zip} lacks START-HERE.md`);
    for (const file of ["memory/USER.md", "memory/LEARNINGS.md", "memory/WORKFLOWS.md"]) {
      check(entries.includes(`${prefix}${file}`), `${zip} lacks ${file}`);
    }
    for (const skill of ["refine-prompt", "plan", "execute"]) {
      check(entries.includes(`${prefix}references/skills/${skill}/SKILL.md`), `${zip} lacks core ${skill}`);
    }
    for (const skill of profileSkill[profile]) {
      check(entries.includes(`${prefix}references/skills/${skill}/SKILL.md`), `${zip} lacks profile ${skill}`);
    }
  }
}

if (errors.length) {
  console.error(`Validation failed (${errors.length} issue${errors.length === 1 ? "" : "s"}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Pack validation passed: source files, skills, adapters, plugin metadata, and 18 ZIPs are coherent.");
