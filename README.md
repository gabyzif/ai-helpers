# AI Helpers

AI Helpers es un orquestador portable para que distintas IAs trabajen con un mismo método. La persona escribe una intención normal; el motor consulta su memoria, activa el perfil relevante, refina el pedido, pregunta solo lo bloqueante, arma un plan cuando hace falta y ejecuta con revisión proporcional.

## Las tres capas

1. **Motor universal:** `.agents/skills/` contiene onboarding, refinamiento, planificación, ejecución, auditoría de tokens y detección de workflows.
2. **Perfiles opcionales:** PM, diseño, desarrollo, contabilidad y psicología se activan por relevancia, no por identidad. Un contador que pide un viaje no recibe reglas contables.
3. **Memoria personal:** `memory/USER.md`, `LEARNINGS.md` y `WORKFLOWS.md` guardan preferencias, aprendizajes aprobados y patrones repetidos. Editá una copia privada.

## Empezar sin saber qué es planning

Descargá una edición de `dist/` y seguí [INSTALAR.md](INSTALAR.md). Luego escribí, por ejemplo, “quiero diseñar una pantalla”, “quiero arreglar un balance contable” o “quiero buscar un viaje”. El sistema elige `direct`, `execute`, `plan-first` o `plan-first + review`, recomienda un modelo capaz para decisiones y uno rápido/económico para tareas ya claras. Ninguna plataforma cambia de modelo sola cuando su interfaz no lo permite: la instrucción se muestra explícitamente.

Podés decir “Hablame en español mexicano”, “Usá español argentino y voseo” o “tratame de usted”. La preferencia se aplica y solo se guarda con aprobación.

## Paquetes y plataformas

- `dist/chatgpt/`: Markdown autocontenido para pegar en Custom Instructions globales de ChatGPT; la edición `general` es la recomendada. Dentro de Projects, copiá la edición elegida en las instrucciones del Project porque estas reemplazan las globales.
- `dist/claude/`: skills ZIP para Claude web/desktop.
- `dist/gemini/`: ediciones para importar como conocimiento de un Gem.
- `dist/universal/`: fallback para cualquier IA con instrucciones y archivos.
- `plugins/ai-helpers/`: scaffold del plugin local para Codex compatibles, no para ChatGPT web.
- `package.json` + `.agents/skills/`: descubrimiento en Pi y repositorios de trabajo.
- `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` y `.github/copilot-instructions.md`: adaptadores breves.

## Colaborar

La fuente canónica está en `.agents/skills/`, `memory/` y `adapters/`; `dist/` se genera. Leé [CONTRIBUTING.md](CONTRIBUTING.md), ejecutá `node scripts/validate-pack.mjs` y abrí un PR sin datos personales. Las carpetas numéricas históricas siguen disponibles como material humano opcional: [PM](01-pms/README.md), [diseño](02-diseno-producto/README.md), [desarrollo](03-desarrolladores/README.md), [contabilidad](04-contabilidad/README.md) y [psicología](05-psicologia/README.md).

## Seguridad

Esto es una base editable, no asesoramiento profesional ni una autorización para reservar, pagar, publicar, diagnosticar o modificar información sensible. Las acciones externas, financieras, clínicas, legales e irreversibles requieren aprobación humana.
# ai-helpers
