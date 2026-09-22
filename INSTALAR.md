# Instalar AI Helpers

Elegí una edición: `general` incluye todos los perfiles; `pm`, `diseno`, `desarrollo`, `contabilidad` y `psicologia` incluyen el motor más un perfil. Para una persona con varias actividades, empezá por `general` y configurá el perfil principal en `memory/USER.md`.

## Antes de importar

1. Descargá la edición de `dist/` que corresponda a tu plataforma o cloná el repositorio completo.
2. Editá una copia local de `memory/USER.md`: no subas nombres, credenciales, historias clínicas ni información fiscal identificable.
3. Elegí idioma y variante: `es-neutral`, `es-AR`, `es-MX`, `es-ES` o una instrucción propia como “tratame de vos”.
4. Probá con una tarea pequeña: “Quiero buscar un viaje”. El sistema debe pedir solo los datos que bloquean la tarea, refinarla y explicar si conviene responder, planificar o ejecutar.

## Tabla rápida

| Plataforma | Qué se carga | ¿Queda disponible en chats nuevos? |
| --- | --- | --- |
| ChatGPT web / desktop | Pegar `dist/chatgpt/ai-helpers-general.md` en Custom Instructions | Sí en chats normales; los Projects usan sus propias instrucciones |
| Codex | Repositorio con `AGENTS.md` y `.agents/skills/`, o el plugin local `plugins/ai-helpers` | Sí en ese repositorio/proyecto |
| Claude web / desktop | Un ZIP de `dist/claude/` en Customize > Skills | Sí cuando la skill está habilitada; Project Knowledge es un contexto separado |
| Gemini web | Crear un Gem, pegar `adapters/gemini/INSTRUCTIONS.md` y subir el ZIP elegido como conocimiento | Sí dentro del Gem |
| Gemini móvil | Usar el Gem configurado en la web, si la cuenta/interfaz lo ofrece | Hereda el Gem; no crear otro prompt largo en cada chat |
| GitHub Copilot | Clonar el repo y conservar `.github/copilot-instructions.md` y `AGENTS.md` | Sí en ese repositorio, según el cliente de Copilot |
| Pi consola | Clonar el repo, instalar/usar `.agents/skills/` y colocar `AGENTS.md` en el proyecto o en `~/.pi/agent/AGENTS.md`; reiniciar o `/reload` | Sí en el contexto donde estén los archivos |
| Otra IA | Subir `dist/universal/` y pegar `adapters/universal/START-HERE.md` como instrucciones | Depende de su espacio persistente |

## ChatGPT web y desktop

1. Elegí `dist/chatgpt/ai-helpers-general.md`; es la recomendada para personas con varias actividades. Las otras cinco ediciones fijan solo el perfil base.
2. Abrí Settings > Personalization > Custom Instructions, activá la personalización y pegá el contenido completo. Está generado como Markdown directo, no es un ZIP ni un plugin.
3. Usalo en chats normales: el adapter aplica preferencias que indiques, detecta perfiles y no necesita acceso posterior al repositorio.

Las Custom Instructions son globales para chats normales, pero las instrucciones de un Project son un contexto distinto y las reemplazan dentro de ese Project. Si querés AI Helpers en un Project, pegá la misma edición en Project settings > Instructions y luego agregá solo las reglas de ese Project. Archivos como `USER.md`, `LEARNINGS.md` o `WORKFLOWS.md` no se sincronizan ni se actualizan solos: si los necesitás, subí una copia privada al Project. No pongas datos sensibles en Custom Instructions ni en un Project compartido. Consultá la guía oficial de [Custom Instructions](https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt) y [Projects](https://help.openai.com/en/articles/10169521-projects-in-chatgpt).

`plugins/ai-helpers/` **no es un plugin de ChatGPT web**: es el scaffold local del plugin para Codex. Tampoco cambia de modelo automáticamente; el motor solo recomienda cuándo conviene uno capaz o rápido.

## Codex

Para Codex, usá el repositorio con `AGENTS.md` y `.agents/skills/`, o el plugin local `plugins/ai-helpers/` desde un marketplace personal compatible. Esa instalación queda asociada al repositorio/proyecto de Codex, no a la configuración global de ChatGPT.

## Claude

Descargá un ZIP de `dist/claude/` y cargalo desde Customize > Skills; contiene una única carpeta raíz con `skill.md`. Activá la skill y probá una tarea natural: Claude puede activarla cuando sea relevante. En Claude web o desktop, habilitá Code execution and file creation si la cuenta lo requiere para Skills.

La Skill habilitada está disponible en la cuenta, mientras que Project Knowledge e instrucciones de Project aplican solo a ese Project. `memory/` dentro del ZIP es una plantilla estática: no es memoria que Claude actualice o comparta automáticamente. Para trabajo persistente, cargá una copia privada y actualizada como conocimiento del Project. Consultá [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude) y [Projects de Claude](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects).

## Gemini

Creá un Gem desde la web. Pegá `adapters/gemini/INSTRUCTIONS.md` en sus instrucciones y añadí el ZIP de `dist/gemini/` como conocimiento. Después probalo desde web o móvil usando ese Gem. Si tu cuenta muestra una función de Skills/Spark, podés importarlo allí; si no, el Gem es el camino portable.

## Copilot y Pi

En Copilot, abrí el repositorio con `.github/copilot-instructions.md` y `AGENTS.md`; no pegues la memoria privada en un repositorio público. En Pi, el paquete se descubre desde `package.json` o podés copiar `.agents/skills/` al proyecto. Reiniciá la consola después de cambiar skills.

## Cómo usarlo

Decí la intención en lenguaje normal. Ejemplos: “quiero arreglar un balance contable”, “quiero diseñar una pantalla” o “quiero buscar un viaje”. El motor lee la memoria, activa solo el perfil relevante, refina el pedido y elige una ruta: `direct`, `execute`, `plan-first` o `plan-first + review`. Si es complejo, mostrará un plan simple y esperará aprobación. Si se repite dos veces con éxito, propondrá un workflow, skill, agente o automatización; nunca lo creará solo.

Para cambiar de español: “Hablame en español mexicano y tratame de tú desde ahora” o “Usá español argentino y voseo”. La IA lo aplica para la conversación y puede proponerte guardarlo en `memory/USER.md`.

## Si querés colaborar

Cloná el repositorio completo, leé `CONTRIBUTING.md`, trabajá en una rama y ejecutá `node scripts/validate-pack.mjs` antes de abrir un PR. Los ZIP de `dist/` son artefactos generados; la fuente está en `.agents/skills/`, `memory/` y `adapters/`.
