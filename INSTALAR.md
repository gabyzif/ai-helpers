# Instalar AI Helpers

Elegí una edición: `general` incluye todos los perfiles; `pm`, `diseno`, `desarrollo`, `contabilidad` y `psicologia` incluyen el motor más un perfil. Para una persona con varias actividades, empezá por `general` y configurá el perfil principal en `memory/USER.md`.

## Antes de importar

1. Descargá un ZIP de `dist/` o cloná el repositorio completo.
2. Editá una copia local de `memory/USER.md`: no subas nombres, credenciales, historias clínicas ni información fiscal identificable.
3. Elegí idioma y variante: `es-neutral`, `es-AR`, `es-MX`, `es-ES` o una instrucción propia como “tratame de vos”.
4. Probá con una tarea pequeña: “Quiero buscar un viaje”. El sistema debe pedir solo los datos que bloquean la tarea, refinarla y explicar si conviene responder, planificar o ejecutar.

## Tabla rápida

| Plataforma | Qué se carga | ¿Queda disponible en chats nuevos? |
| --- | --- | --- |
| ChatGPT web / desktop | Plugin de `plugins/ai-helpers` o `AGENTS.md` dentro de un Proyecto | Sí dentro del Proyecto/plugin; un adjunto de chat común no alcanza |
| Codex | Repositorio con `AGENTS.md` y `.agents/skills/`, o plugin compatible | Sí en ese repositorio/proyecto |
| Claude web / desktop | Un ZIP de `dist/claude/` en Customize > Skills, o Project Knowledge + instrucciones | Sí cuando la skill está habilitada; no por adjuntarla a un chat común |
| Gemini web | Crear un Gem, pegar `adapters/gemini/INSTRUCTIONS.md` y subir el ZIP elegido como conocimiento | Sí dentro del Gem |
| Gemini móvil | Usar el Gem configurado en la web, si la cuenta/interfaz lo ofrece | Hereda el Gem; no crear otro prompt largo en cada chat |
| GitHub Copilot | Clonar el repo y conservar `.github/copilot-instructions.md` y `AGENTS.md` | Sí en ese repositorio, según el cliente de Copilot |
| Pi consola | Clonar el repo, instalar/usar `.agents/skills/` y colocar `AGENTS.md` en el proyecto o en `~/.pi/agent/AGENTS.md`; reiniciar o `/reload` | Sí en el contexto donde estén los archivos |
| Otra IA | Subir `dist/universal/` y pegar `adapters/universal/START-HERE.md` como instrucciones | Depende de su espacio persistente |

## ChatGPT web, desktop y Codex

Para una instalación colaborativa, usá el plugin de `plugins/ai-helpers/` desde el marketplace personal compatible. Si todavía no está publicado o tu interfaz no muestra plugins, creá un Proyecto/repositorio, subí `memory/USER.md` y agregá `AGENTS.md` en las instrucciones. El plugin no cambia el modelo automáticamente: recomienda un modelo capaz para decidir y uno rápido/económico para ejecutar.

## Claude

Descargá un ZIP de `dist/claude/`, descomprimilo solo si la interfaz lo pide y cargalo desde Customize > Skills. El ZIP contiene una única carpeta raíz con `skill.md`. Activá la skill y probá una tarea. En Claude web o desktop, habilitá ejecución de código y creación de archivos solo si realmente las necesitás. Para tareas persistentes por proyecto, también podés usar Project Knowledge e instrucciones del proyecto.

## Gemini

Creá un Gem desde la web. Pegá `adapters/gemini/INSTRUCTIONS.md` en sus instrucciones y añadí el ZIP de `dist/gemini/` como conocimiento. Después probalo desde web o móvil usando ese Gem. Si tu cuenta muestra una función de Skills/Spark, podés importarlo allí; si no, el Gem es el camino portable.

## Copilot y Pi

En Copilot, abrí el repositorio con `.github/copilot-instructions.md` y `AGENTS.md`; no pegues la memoria privada en un repositorio público. En Pi, el paquete se descubre desde `package.json` o podés copiar `.agents/skills/` al proyecto. Reiniciá la consola después de cambiar skills.

## Cómo usarlo

Decí la intención en lenguaje normal. Ejemplos: “quiero arreglar un balance contable”, “quiero diseñar una pantalla” o “quiero buscar un viaje”. El motor lee la memoria, activa solo el perfil relevante, refina el pedido y elige una ruta: `direct`, `execute`, `plan-first` o `plan-first + review`. Si es complejo, mostrará un plan simple y esperará aprobación. Si se repite dos veces con éxito, propondrá un workflow, skill, agente o automatización; nunca lo creará solo.

Para cambiar de español: “Hablame en español mexicano y tratame de tú desde ahora” o “Usá español argentino y voseo”. La IA lo aplica para la conversación y puede proponerte guardarlo en `memory/USER.md`.

## Si querés colaborar

Cloná el repositorio completo, leé `CONTRIBUTING.md`, trabajá en una rama y ejecutá `node scripts/validate-pack.mjs` antes de abrir un PR. Los ZIP de `dist/` son artefactos generados; la fuente está en `.agents/skills/`, `memory/` y `adapters/`.
