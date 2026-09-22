# Plan: universal-ai-orchestrator

> Status: done
> Planned by: Codex on 2026-09-22
> Source prompt: Convertir AI Helpers en un orquestador universal que refine cualquier pedido, use memoria, aclare solo lo bloqueante, derive planificación al modelo capaz, ejecución al modelo económico, detecte tareas repetidas y respete variantes regionales del español.

## Objective

Transformar el repositorio en un paquete portable de instrucciones, memoria y skills que las plataformas compatibles puedan descubrir automáticamente, con adaptadores claros para las plataformas web y una prueba manual reproducible dentro de este repositorio.

## Decisions made (do not re-litigate)

- `AGENTS.md` será el orquestador breve y permanente; los procedimientos extensos vivirán en skills para no saturar contexto.
- `.agents/skills/` será la fuente canónica porque Codex, Pi y Copilot la descubren y el formato Agent Skills puede importarse en Claude; los adaptadores web explicarán el paso de instalación que cada plataforma todavía requiere.
- Todo pedido accionable pasará por `refine-prompt`; saludos y preguntas conversacionales simples quedan fuera. Solo se hará una ronda concisa de aclaración cuando falte información bloqueante.
- Las rutas serán `direct`, `execute`, `plan-first` y `plan-first + review`. Refinar y ejecutar favorecen un modelo rápido/económico; planificar favorece el modelo más capaz disponible.
- Ninguna plataforma puede cambiar de modelo de forma universal: el sistema recomendará el cambio y esperará al usuario cuando la interfaz no pueda hacerlo.
- El producto tendrá tres capas: motor universal, perfiles profesionales opcionales y memoria personal. El onboarding permitirá elegir un perfil principal y varios secundarios.
- Los perfiles actuales se convertirán en skills especializados: PM, diseño, desarrollo, contabilidad y psicología. Se activarán por combinación de perfil configurado y relevancia de la tarea, nunca por identidad solamente.
- Una persona podrá hacer tareas fuera de su perfil: un contador que pide un viaje usará el motor universal sin contaminar la respuesta con reglas contables; las reglas de diseño solo se cargarán para trabajo de diseño.
- La memoria separará preferencias personales, aprendizajes aprobados y patrones repetidos. Nunca publicará ni actualizará memoria sensible sin aprobación.
- La preferencia lingüística incluirá idioma, variante regional, tratamiento, formalidad, vocabulario preferido y términos a evitar. Predeterminado: español neutro claro hasta que el usuario configure otra variante.
- Tras dos ejecuciones similares exitosas, `workflow-detector` podrá proponer empaquetar el patrón; `workflow-builder` solo lo creará con aprobación.
- Un workflow determinista tendrá preferencia sobre un agente; un agente se reservará para decisiones adaptativas. Acciones externas, financieras, clínicas, legales o irreversibles exigirán revisión humana.
- La contribución comunitaria será una capacidad avanzada y optativa: primero generalizar y anonimizar, luego mostrar el contenido exacto, y solo publicar con autorización.

## Files in scope

- `README.md`, `recursos-compartidos/PLATAFORMAS.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md` — entrada, arquitectura e instalación.
- `memory/USER.md`, `memory/LEARNINGS.md`, `memory/WORKFLOWS.md` — preferencias, aprendizaje y repetición.
- `.agents/skills/onboard-user/SKILL.md` — configuración inicial de idioma y estilo.
- `.agents/skills/refine-prompt/SKILL.md`, `.agents/skills/refine-prompt/assets/refined-prompt.template.md` — refinamiento y routing universal.
- `.agents/skills/plan/SKILL.md`, `.agents/skills/plan/assets/PLAN.template.md` — planificación universal no limitada a código.
- `.agents/skills/execute/SKILL.md` — ejecución disciplinada de planes generales.
- `.agents/skills/token-lint/SKILL.md`, `.agents/skills/token-lint/scripts/token-lint.mjs` — auditoría determinista de instrucciones.
- `.agents/skills/workflow-detector/SKILL.md`, `.agents/skills/workflow-builder/SKILL.md` — detección y creación aprobada de automatizaciones.
- `.agents/skills/contribute/SKILL.md` — contribución avanzada y segura.
- `.agents/skills/profile-pm/SKILL.md`, `.agents/skills/profile-design/SKILL.md`, `.agents/skills/profile-developer/SKILL.md`, `.agents/skills/profile-accounting/SKILL.md`, `.agents/skills/profile-psychology/SKILL.md` — módulos profesionales.
- `adapters/claude/ai-helpers/skill.md`, `adapters/gemini/INSTRUCTIONS.md`, `adapters/universal/START-HERE.md` — adaptadores web y fallback portable.
- `plugins/ai-helpers/.codex-plugin/plugin.json`, `.agents/plugins/marketplace.json`, `package.json` — plugin ChatGPT/Codex y paquete Pi.
- `scripts/build-packages.sh`, `dist/claude/ai-helpers-{general,pm,diseno,desarrollo,contabilidad,psicologia}.zip`, `dist/gemini/ai-helpers-{general,pm,diseno,desarrollo,contabilidad,psicologia}.zip`, `dist/universal/ai-helpers-{general,pm,diseno,desarrollo,contabilidad,psicologia}.zip` — paquetes descargables por perfil.
- `INSTALAR.md` — pasos por plataforma y prueba de carga.
- `CONTRIBUTING.md`, `.github/ISSUE_TEMPLATE/nuevo-workflow.yml`, `.github/ISSUE_TEMPLATE/reportar-problema.yml`, `.github/PULL_REQUEST_TEMPLATE.md` — contribución comunitaria.
- `tests/SCENARIOS.md`, `scripts/validate-pack.mjs` — pruebas conductuales y estructurales.
- `/Users/gabrielazifferman/.pi/agent/skills/refine-prompt/SKILL.md`, `/Users/gabrielazifferman/.pi/agent/skills/refine-prompt/assets/refined-prompt.template.md` — fuentes de solo lectura.
- `/Users/gabrielazifferman/.pi/agent/skills/plan/SKILL.md`, `/Users/gabrielazifferman/.pi/agent/skills/plan/assets/PLAN.template.md` — fuentes de solo lectura.
- `/Users/gabrielazifferman/.pi/agent/skills/execute/SKILL.md`, `/Users/gabrielazifferman/.pi/agent/skills/token-lint/SKILL.md`, `/Users/gabrielazifferman/.pi/agent/skills/token-lint/scripts/token-lint.mjs` — fuentes de solo lectura.
- `/Users/gabrielazifferman/.codex/skills/.system/plugin-creator/scripts/create_basic_plugin.py`, `/Users/gabrielazifferman/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py` — herramientas de solo lectura para empaquetar y validar OpenAI.

## Steps

- [x] 1. Crear `memory/USER.md` con perfil principal, perfiles secundarios y campos editables para idioma, variante (`es-AR`, `es-MX`, `es-ES`, `es-neutral` y libre), tú/vos/usted, formalidad, tono, extensión, vocabulario y privacidad; definir perfil general y español neutro como fallback.
- [x] 2. Crear `memory/LEARNINGS.md` para reglas aprobadas y `memory/WORKFLOWS.md` para firmas de tareas, contador de repeticiones, resultado y estado propuesto/aprobado/rechazado.
- [x] 3. Crear `AGENTS.md` con el router obligatorio: leer memoria, refinar pedidos accionables, preguntar solo lo bloqueante, elegir ruta, aplicar revisión humana, respetar idioma, detectar repetición y no asumir autorización externa.
- [x] 4. Crear `onboard-user/SKILL.md` para elegir perfil principal/secundarios e idioma/variante mediante una sola conversación breve, permitir “ningún perfil”, y mostrar el cambio antes de guardarlo.
- [x] 5. Adaptar `refine-prompt/SKILL.md` y su plantilla a tareas generales; eliminar supuestos de repositorio, conservar objetivo/contexto/supuestos/restricciones/aceptación/fuera de alcance y emitir ruta + nivel de modelo + siguiente acción.
- [x] 6. Adaptar `plan/SKILL.md` y `PLAN.template.md` para código, documentos, investigación, diseño y tareas personales; incluir entradas, entregables, decisiones, aprobaciones, pasos atómicos, verificación, recuperación y fuentes cuando correspondan.
- [x] 7. Adaptar `execute/SKILL.md` para aceptar un plan en archivo o conversación, ejecutar sin redecidir, detenerse ante discrepancias y pedir aprobación justo antes de efectos externos o de alto riesgo.
- [x] 8. Copiar y documentar `token-lint` bajo `.agents/skills/`, preservando el script determinista y verificando sus rutas relativas.
- [x] 9. Crear `workflow-detector/SKILL.md` con umbral de dos tareas similares exitosas, clasificación skill/workflow/agente/automatización/script y propuesta sin creación automática.
- [x] 10. Crear `workflow-builder/SKILL.md` para generar un Agent Skill portable con trigger, entradas, pasos, decisiones, herramientas, aprobaciones, salida, validación y fallos; preferir workflow determinista sobre agente.
- [x] 11. Crear `contribute/SKILL.md` para separar memoria privada de mejoras generales, anonimizar, detectar duplicados, preparar Issue/PR y requerir vista previa y aprobación antes de publicar.
- [x] 12. Crear los cinco `profile-*/SKILL.md`: PM prioriza discovery/decisiones; diseño activa el enfoque anti-promedio; desarrollo aplica verificación técnica; contabilidad aplica jurisdicción/privacidad/revisión; psicología aplica privacidad/límites clínicos. Mantener cada skill autocontenido.
- [x] 13. Crear `adapters/claude/ai-helpers/skill.md` como meta-skill de Claude: activar motor y perfil relevante con lenguaje natural, usar español neutro por defecto y aplicar inmediatamente cualquier variante regional solicitada.
- [x] 14. Crear `plugins/ai-helpers/` con el scaffold oficial, manifest válido y copias generadas de los skills canónicos; crear `.agents/plugins/marketplace.json` para instalar el mismo plugin en ChatGPT web/desktop y Codex compatibles, sin MCP ni hooks.
- [x] 15. Crear `package.json` para que Pi descubra los skills canónicos al instalar el repositorio desde Git y documentar también la alternativa de copiar `.agents/skills`.
- [x] 16. Crear `adapters/gemini/INSTRUCTIONS.md` para un Gem y `adapters/universal/START-HERE.md` para plataformas sin importador; ambos deben dirigir al motor, memoria y perfil seleccionado sin prometer activación automática inexistente.
- [x] 17. Crear `scripts/build-packages.sh` para ensamblar seis ediciones por plataforma: general con todos los perfiles, y PM/diseño/desarrollo/contabilidad/psicología con motor universal más un perfil. También sincronizar todos los skills dentro del plugin OpenAI.
- [x] 18. Generar 18 ZIP bajo `dist/`; verificar que cada Claude ZIP tenga una única carpeta raíz con `skill.md`, y que Gemini/universal incluyan instrucciones, memoria, core y solo los perfiles declarados.
- [x] 19. Crear `CLAUDE.md`, `GEMINI.md` y `.github/copilot-instructions.md` como adaptadores cortos que apunten al orquestador, memoria y skills canónicos sin duplicar su contenido.
- [x] 20. Crear `INSTALAR.md` con una selección inicial por perfil y caminos concretos para: plugin en ChatGPT web/desktop y Codex; skill ZIP en Claude web/desktop; Gem en Gemini web y uso posterior móvil; GitHub Copilot; Pi; y ZIP universal. Distinguir instalación automática, importación única y copia manual.
- [x] 21. Reescribir `README.md` para presentar las tres capas, selector de perfil, flujo universal, niveles de modelo, configuración regional del español y límites de automatización.
- [x] 22. Actualizar `recursos-compartidos/PLATAFORMAS.md` para evitar duplicación y enlazar `INSTALAR.md`, manteniendo una tabla breve de carga automática frente a instalación manual.
- [x] 23. Crear `CONTRIBUTING.md`, dos formularios de Issues y la plantilla de PR con controles de privacidad, prueba reproducible, perfil/plataforma afectados y prohibición de datos personales.
- [x] 24. Crear `tests/SCENARIOS.md` con siete pruebas: viaje ambiguo, balance contable, diseño, tarea directa, repetición, cambio `es-MX`/`es-AR` y aislamiento de perfiles; especificar decisión observable sin exigir redacción literal.
- [x] 25. Crear `scripts/validate-pack.mjs` para comprobar archivos obligatorios, frontmatter/name de cada skill, ausencia de marcadores, campos regionales, cuatro rutas, reglas de aprobación, cinco perfiles, manifest/marketplace OpenAI y contenido de los 18 ZIP.
- [x] 26. Ejecutar `scripts/build-packages.sh`, validar el plugin OpenAI, ejecutar `node scripts/validate-pack.mjs` y token-lint sobre `AGENTS.md`; corregir solo fallos dentro del alcance y marcar el plan `done` cuando todos salgan 0.

## Acceptance criteria (run all at the end)

- [x] `node scripts/validate-pack.mjs` exits 0.
- [x] Los seis ZIP de `dist/claude/` muestran una única carpeta raíz con `skill.md`; los doce ZIP de Gemini/universal muestran instrucciones, memoria, core y el perfil correcto.
- [x] `python3 /Users/gabrielazifferman/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/ai-helpers` exits 0.
- [x] `node .agents/skills/token-lint/scripts/token-lint.mjs AGENTS.md` exits 0 sin veredicto `trim`.
- [x] `rg -n "es-AR|es-MX|es-ES|es-neutral|vos|usted" memory/USER.md` demuestra configuración regional.
- [x] `rg -n "direct|execute|plan-first|plan-first \+ review" .agents/skills/refine-prompt/SKILL.md` demuestra routing completo.
- [x] `rg -n "ChatGPT|Claude|Gemini|Copilot|Pi|Codex" INSTALAR.md` devuelve las seis plataformas.
- [x] Revisión de `tests/SCENARIOS.md`: las siete pruebas tienen entrada, comportamiento esperado, punto de aprobación y criterio observable; la prueba de aislamiento impide activar reglas profesionales en tareas ajenas al perfil.

## Out of scope

- Publicar o hacer push al repositorio, instalar skills en cuentas de terceros o cambiar planes de suscripción.
- Ejecutar reservas, movimientos contables, decisiones clínicas, pagos, publicaciones o cambios externos reales.
- Implementar MCP, conectores, cambio automático de modelo o un servicio de sincronización de memoria.
- Borrar los cinco perfiles existentes; seguirán disponibles como conocimiento opcional.

## Executor protocol

- Execute steps in order. Check each box as you complete it (edit this file).
- Do not read files outside **Files in scope**. Do not improvise.
- If a step doesn't match reality (file missing, code differs from described), STOP. Report the mismatch in a `## Blocked` section of this file and end the turn.
- Output discipline: diffs and short status lines only. No narration.
