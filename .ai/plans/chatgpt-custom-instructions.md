# Plan: chatgpt-custom-instructions

> Status: done
> Planned by: Codex on 2026-09-22
> Source prompt: Añadir soporte nativo y global de AI Helpers para ChatGPT mediante Custom Instructions, sin reutilizar los paquetes de Claude o Universal; comprobar y aclarar el flujo de Claude.

## Objective

Generar instrucciones autocontenidas, públicas y pegables para ChatGPT, con variantes por perfil, y documentar con precisión sus límites frente a Projects y Claude Skills.

## Decisions made (do not re-litigate)

- `adapters/chatgpt/CUSTOM-INSTRUCTIONS.md` será la fuente canónica de una edición `general`, compacta y autocontenida; no leerá archivos ni prometerá memoria persistente.
- Tendrá un límite de 1.500 caracteres para que sea pegable también en cuentas Free/Go según la ayuda oficial de ChatGPT. El build sustituirá solo el texto `Perfil base: general.` para crear las cinco ediciones específicas, sin leer ni incorporar `memory/USER.md`.
- La edición general condensará las reglas de los cinco profile skills. Las variantes cambian el perfil base, no eliminan las reglas de aislamiento ni la combinación justificada de perfiles; Design Engineering activa diseño + desarrollo.
- ChatGPT Custom Instructions no será presentado como plugin ni como sustituto de instrucciones de Project: la ayuda oficial indica que las instrucciones del Project las reemplazan dentro de ese Project. `INSTALAR.md` indicará pegar la misma edición en Project settings cuando se necesite dentro de Projects.
- Claude conserva su ZIP de Skill; se aclarará que una Skill habilitada está disponible en la cuenta, pero `memory/` incluida es una plantilla/referencia estática y no aprendizaje persistente. Project Knowledge/instrucciones de Claude son específicos de cada Project.
- No se crea ZIP para ChatGPT: `dist/chatgpt/*.md` se genera directamente desde el adapter. Se mantienen los seis nombres de perfiles para una experiencia consistente.

## Files in scope

- `adapters/chatgpt/CUSTOM-INSTRUCTIONS.md` — adapter compacto y autocontenido para Custom Instructions globales.
- `adapters/claude/ai-helpers/skill.md` — límite explícito de memoria estática y persistencia.
- `scripts/build-packages.sh` — crear seis Markdown de ChatGPT sin ZIP ni lectura de memoria privada.
- `scripts/validate-pack.mjs` — comprobar adapter y seis Markdown seguros para ChatGPT, además de los artefactos existentes.
- `INSTALAR.md` — corregir ChatGPT/Codex, explicar Projects y actualizar Claude con enlaces oficiales.
- `README.md` — enumerar el paquete de ChatGPT y su limitación de Projects.
- `tests/SCENARIOS.md` — añadir escenarios observables de ChatGPT y Claude.
- `.ai/plans/chatgpt-custom-instructions.md` — registrar ejecución y resultado.

## Steps

- [x] 1. Crear `adapters/chatgpt/CUSTOM-INSTRUCTIONS.md` con el perfil base `general`, preferencias disponibles, refinamiento interno, una ronda de aclaración, cuatro rutas, planificación/aprobaciones, no persistencia inventada y reglas condensadas de PM, diseño, desarrollo, contabilidad y psicología. Verificar que tenga 1.500 caracteres o menos y que no contenga datos de `memory/USER.md`.
- [x] 2. Actualizar `adapters/claude/ai-helpers/skill.md`: conservar el router existente y añadir que los archivos de `memory/` son referencias estáticas del paquete, no memoria que Claude actualice o comparta automáticamente. Verificar que el frontmatter `name` y `description` continúen presentes.
- [x] 3. Actualizar `scripts/build-packages.sh`: crear y limpiar solo `dist/chatgpt/*.md`; para cada perfil copiar el adapter a `ai-helpers-{perfil}.md`, sustituyendo exactamente `Perfil base: general.` por el perfil correspondiente, sin copiar `memory/`. Mantener intactos los tres ZIP existentes y la sincronización del plugin Codex. Verificar seis Markdown y cero ZIP bajo `dist/chatgpt/`.
- [x] 4. Actualizar `scripts/validate-pack.mjs`: requerir el adapter de ChatGPT y los seis Markdown; verificar que cada Markdown contenga las cuatro rutas, perfiles esenciales, placeholders seguros de preferencias, la regla `diseño + desarrollo`, no referencias a `memory/USER.md`, un máximo de 1.500 caracteres y que no haya ZIP de ChatGPT. Mantener las validaciones de Claude/Gemini/Universal.
- [x] 5. Reescribir la sección de ChatGPT en `INSTALAR.md`: indicar Settings > Personalization > Custom Instructions, copiar `dist/chatgpt/ai-helpers-general.md`, explicar disponibilidad global para chats fuera de Projects y que Project instructions reemplazan las globales; dar el paso de copiar la misma edición a Project settings cuando se quiera AI Helpers allí. Identificar `plugins/ai-helpers` exclusivamente como plugin local de Codex. Añadir sección Claude con ZIP de Skill, activación, code execution y límite de memoria estática/Project Knowledge. Enlazar las ayudas oficiales pertinentes.
- [x] 6. Actualizar `README.md` para incluir `dist/chatgpt/` como Markdown de Custom Instructions y resumir que Projects necesitan sus propias instrucciones; no cambiar la fuente canónica ni los perfiles.
- [x] 7. Añadir a `tests/SCENARIOS.md` un escenario ChatGPT (preferencias explícitas, Design Engineering, ruta y aprobación sin afirmar persistencia) y uno Claude (Skill habilitada, memoria de paquete estática, conocimiento de Project separado). Verificar que cada uno incluya entrada, esperado, aprobación y observable.
- [x] 8. Ejecutar `scripts/build-packages.sh`; confirmar seis `.md`, ningún `.zip` de ChatGPT, el límite de 1.500 caracteres, `node scripts/validate-pack.mjs`, token-lint de los dos adapters y validación del plugin Codex. Marcar plan `done` solo si todo sale 0.

## Acceptance criteria (run all at the end)

- [x] `test -f dist/chatgpt/ai-helpers-general.md` y los otros cinco perfiles existen; `find dist/chatgpt -name '*.zip'` no devuelve archivos.
- [x] `wc -m < dist/chatgpt/ai-helpers-general.md` es menor o igual a 1500 y el archivo no contiene `memory/USER.md` ni datos personales.
- [x] `node scripts/validate-pack.mjs` exits 0.
- [x] `node .agents/skills/token-lint/scripts/token-lint.mjs adapters/chatgpt/CUSTOM-INSTRUCTIONS.md` y el mismo comando sobre `adapters/claude/ai-helpers/skill.md` no devuelven `trim`.
- [x] `python3 /Users/gabrielazifferman/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/ai-helpers` exits 0.
- [x] `INSTALAR.md` nombra ChatGPT, Custom Instructions, Projects, Codex y Claude, y no atribuye el plugin de Codex a ChatGPT web.

## Out of scope

- Instalar instrucciones en cuentas de ChatGPT o Claude, publicar el plugin, o crear una Custom GPT.
- Importar o publicar datos de `memory/USER.md`, crear una sincronización de memoria, o alterar los ZIP de Gemini/Universal.

## Executor protocol

- Execute steps in order. Check each box as you complete it (edit this file).
- Do not read files outside **Files in scope**. Do not improvise.
- If a step doesn't match reality (file missing, code differs from described), STOP. Report the mismatch in a `## Blocked` section of this file and end the turn.
- Output discipline: diffs and short status lines only. No narration.
