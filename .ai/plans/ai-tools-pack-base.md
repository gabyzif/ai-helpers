# Plan: ai-tools-pack-base

> Status: done
> Planned by: Codex on 2026-09-22
> Source prompt: Crear un pack base de herramientas/prompts de IA, organizado por perfiles, con una memoria Markdown por perfil y documentación para usarla en ChatGPT, Claude, Gemini, Copilot, Pi y Codex.

## Objective

Crear un repositorio Markdown listo para publicar en GitHub y copiar a Google Drive, que permita a cada perfil reutilizar una memoria de trabajo en distintas plataformas de IA.

## Decisions made (do not re-litigate)

- Usar un único repositorio con carpetas numéricas por perfil para que sea navegable por orden y fácil de fotografiar.
- Nombrar cada memoria `MEMORIA.md` y mantenerla como fuente de verdad portable; no depender de la memoria automática de ninguna IA.
- Incluir en cada perfil un `PROMPT-MAESTRO.md` y un `COMO-USARLA.md`; estos archivos serán intencionalmente breves y de base.
- Incluir una carpeta de recursos compartidos para el mapa de plataformas y una plantilla que todos puedan copiar.
- Crear una guía de instalación separada para las seis plataformas, indicando dónde cargar o pegar la memoria y cuándo se aplica automáticamente.
- El perfil de diseño usará el marco anti-promedio solicitado y pedirá un `concepto_creativo` visible, nunca razonamiento interno.
- Los perfiles de contabilidad y psicología tendrán límites explícitos de privacidad y no sustitución de criterio profesional.

## Files in scope

- `README.md` — portada, propósito y navegación del pack.
- `01-pms/README.md` — índice del perfil PM.
- `01-pms/MEMORIA.md` — memoria base de PM.
- `01-pms/PROMPT-MAESTRO.md` — prompt de planificación y producto.
- `01-pms/COMO-USARLA.md` — uso rápido del perfil.
- `02-diseno-producto/README.md` — índice del perfil de diseño.
- `02-diseno-producto/MEMORIA.md` — memoria base de diseño y registro de estilos aprobados.
- `02-diseno-producto/PROMPT-MAESTRO.md` — prompt anti-promedio de diseño.
- `02-diseno-producto/COMO-USARLA.md` — uso rápido del perfil.
- `03-desarrolladores/README.md` — índice del perfil de desarrollo.
- `03-desarrolladores/MEMORIA.md` — memoria base de desarrollo.
- `03-desarrolladores/PROMPT-MAESTRO.md` — prompt para ejecución técnica segura.
- `03-desarrolladores/COMO-USARLA.md` — uso rápido del perfil.
- `04-contabilidad/README.md` — índice del perfil de contabilidad.
- `04-contabilidad/MEMORIA.md` — memoria base de contabilidad con privacidad.
- `04-contabilidad/PROMPT-MAESTRO.md` — prompt de análisis y explicación contable.
- `04-contabilidad/COMO-USARLA.md` — uso rápido del perfil.
- `05-psicologia/README.md` — índice del perfil de psicología.
- `05-psicologia/MEMORIA.md` — memoria base de psicología con límites éticos.
- `05-psicologia/PROMPT-MAESTRO.md` — prompt para materiales y apoyo profesional no clínico automatizado.
- `05-psicologia/COMO-USARLA.md` — uso rápido del perfil.
- `recursos-compartidos/PLATAFORMAS.md` — mapa de instalación para ChatGPT, Claude, Gemini, Copilot, Pi y Codex.
- `recursos-compartidos/PLANTILLA-MEMORIA.md` — plantilla neutral de memoria.
- `recursos-compartidos/ACTUALIZAR-MEMORIA.md` — protocolo para registrar aprendizajes aprobados.
- `.gitignore` — excluir archivos de sistema y datos privados locales.

## Steps

- [x] 1. Crear `README.md` con una explicación de que el pack es de base, un índice enlazado a los cinco perfiles y el aviso de no incluir datos privados antes de publicar. Verificar visualmente que todos los enlaces internos apunten a archivos incluidos en este plan.
- [x] 2. Crear `01-pms/` y sus cuatro archivos. Definir memoria para objetivos, stakeholders, tono, entregables, decisiones y aprendizajes; crear un prompt maestro para discovery, priorización y comunicación. Verificar que `README.md` enlace los tres recursos.
- [x] 3. Crear `02-diseno-producto/` y sus cuatro archivos. Incluir en `MEMORIA.md` los apartados de estilo aprobado, paleta, tipografía, anti-patrones, accesibilidad y aprendizajes; en el prompt maestro usar exactamente las secciones `contexto`, `reglas_de_diseno_anti_promedio`, `concepto_creativo`, `detalles_del_producto` y `memoria_de_diseno`. Verificar que no solicite cadena de pensamiento ni pasos internos.
- [x] 4. Crear `03-desarrolladores/` y sus cuatro archivos. Definir memoria de stack, comandos seguros, convenciones, pruebas, restricciones y lecciones; crear un prompt maestro que exija confirmar alcance y verificar cambios. Verificar que el contenido no incluya credenciales ni comandos destructivos.
- [x] 5. Crear `04-contabilidad/` y sus cuatro archivos. Definir memoria de país/normativa, cliente ficticio, formato de salida, datos prohibidos y aprendizaje; crear prompt maestro que pida tablas, supuestos y revisión humana. Verificar que advierta no subir información personal o fiscal identificable.
- [x] 6. Crear `05-psicologia/` y sus cuatro archivos. Definir memoria de enfoque, audiencia, tono, límites, privacidad y aprendizaje; crear prompt maestro para educación, materiales y organización profesional. Verificar que prohíba diagnósticos, intervenciones de crisis o sustitución de atención profesional.
- [x] 7. Crear `recursos-compartidos/PLATAFORMAS.md`. Documentar: Proyecto + archivo + instrucciones para ChatGPT; Project Knowledge + Project Instructions para Claude; Gem + instrucciones/conocimiento para Gemini; `.github/copilot-instructions.md` o `AGENTS.md` para Copilot; `~/.pi/agent/AGENTS.md` global y `AGENTS.md` de proyecto para Pi; `AGENTS.md` en el proyecto para Codex. Indicar que adjuntar un archivo a un chat normal no lo conserva para chats nuevos.
- [x] 8. Crear `PLANTILLA-MEMORIA.md` y `ACTUALIZAR-MEMORIA.md`. La plantilla tendrá secciones de identidad, reglas, formato, datos a evitar, ejemplos aprobados y aprendizajes; el protocolo tendrá cinco pasos manuales para actualizarla tras un resultado exitoso. Verificar que ambos sean aplicables a los cinco perfiles.
- [x] 9. Crear `.gitignore` para `.DS_Store`, archivos `.env`, exportaciones privadas y directorios de copias locales. Verificar con `git status --short` que no se añadieron archivos ajenos.
- [x] 10. Ejecutar `find . -type f | sort` y revisar que estén los 25 archivos de contenido previstos más el plan y `.gitignore`; ejecutar `rg -n "TODO|<.*>" README.md 0*-*/ recursos-compartidos/` y confirmar que no queden marcadores de plantilla sin explicar.

## Acceptance criteria (run all at the end)

- [x] `find . -type f | sort` lista `README.md`, los cuatro archivos en cada una de las cinco carpetas de perfil y los tres recursos compartidos.
- [x] `rg -n "MEMORIA|PROMPT-MAESTRO|COMO-USARLA" README.md 0*-*/README.md` devuelve referencias para los cinco perfiles.
- [x] `rg -n "ChatGPT|Claude|Gemini|Copilot|Pi|Codex" recursos-compartidos/PLATAFORMAS.md` devuelve las seis plataformas.
- [x] Una revisión visual confirma que cada archivo se identifica como “base” y no contiene datos personales, secretos o consejos profesionales presentados como definitivos.

## Out of scope

- Publicar el repositorio, crear una cuenta o alterar la visibilidad de GitHub.
- Subir archivos a Google Drive o generar un ZIP.
- Instalar aplicaciones, extensiones, modelos o conectores.
- Incluir datos reales de clientes, pacientes, impuestos, credenciales o información médica.
- Crear automatizaciones para sincronizar memorias entre servicios.

## Executor protocol

- Execute steps in order. Check each box as you complete it (edit this file).
- Do not read files outside **Files in scope**. Do not improvise.
- If a step doesn't match reality (file missing, code differs from described), STOP. Report the mismatch in a `## Blocked` section of this file and end the turn.
- Output discipline: diffs and short status lines only. No narration.
