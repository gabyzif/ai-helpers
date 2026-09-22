#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD="$ROOT/dist/.build"
CORE_SKILLS=(onboard-user refine-prompt plan execute token-lint workflow-detector workflow-builder contribute)
PROFILE_SKILLS=(profile-pm profile-design profile-developer profile-accounting profile-psychology)
PROFILES=(general pm diseno desarrollo contabilidad psicologia)

rm -rf "$BUILD"
mkdir -p "$BUILD" "$ROOT/dist/claude" "$ROOT/dist/gemini" "$ROOT/dist/universal"
rm -f "$ROOT"/dist/claude/*.zip "$ROOT"/dist/gemini/*.zip "$ROOT"/dist/universal/*.zip

copy_skills() {
  local dest="$1"
  mkdir -p "$dest"
  for skill in "${CORE_SKILLS[@]}"; do
    cp -R "$ROOT/.agents/skills/$skill" "$dest/"
  done
  local profile="${2:-general}"
  if [[ "$profile" == "general" ]]; then
    for skill in "${PROFILE_SKILLS[@]}"; do cp -R "$ROOT/.agents/skills/$skill" "$dest/"; done
  else
    local skill_name
    case "$profile" in
      diseno) skill_name="profile-design" ;;
      desarrollo) skill_name="profile-developer" ;;
      contabilidad) skill_name="profile-accounting" ;;
      psicologia) skill_name="profile-psychology" ;;
      pm) skill_name="profile-pm" ;;
      *) echo "Unknown profile: $profile" >&2; exit 1 ;;
    esac
    cp -R "$ROOT/.agents/skills/$skill_name" "$dest/"
  fi
}

make_zip() {
  local platform="$1"
  local profile="$2"
  local folder="ai-helpers-$profile"
  local stage="$BUILD/$platform/$folder"
  local output="$ROOT/dist/$platform/$folder.zip"
  mkdir -p "$stage"

  case "$platform" in
    claude)
      cp "$ROOT/adapters/claude/ai-helpers/skill.md" "$stage/skill.md"
      ;;
    gemini)
      cp "$ROOT/adapters/gemini/INSTRUCTIONS.md" "$stage/INSTRUCTIONS.md"
      ;;
    universal)
      cp "$ROOT/adapters/universal/START-HERE.md" "$stage/START-HERE.md"
      ;;
  esac

  cp -R "$ROOT/memory" "$stage/memory"
  copy_skills "$stage/references/skills" "$profile"
  cp "$ROOT/README.md" "$ROOT/INSTALAR.md" "$stage/" 2>/dev/null || true

  local parent
  parent="$(dirname "$stage")"
  (cd "$parent" && zip -qr "$output" "$folder")
}

rm -rf "$ROOT/plugins/ai-helpers/skills"
mkdir -p "$ROOT/plugins/ai-helpers/skills"
copy_skills "$ROOT/plugins/ai-helpers/skills" general

for profile in "${PROFILES[@]}"; do
  make_zip claude "$profile"
  make_zip gemini "$profile"
  make_zip universal "$profile"
done

rm -rf "$BUILD"
echo "Built ${#PROFILES[@]} profile editions for Claude, Gemini, and universal import, plus the ChatGPT/Codex plugin skills."
