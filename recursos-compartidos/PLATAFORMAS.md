# Plataformas y memoria

La guía completa está en [INSTALAR.md](../INSTALAR.md). Esta página resume qué se descubre automáticamente y qué requiere una importación inicial.

La memoria se aplica automáticamente solo cuando está dentro del espacio persistente correcto. Adjuntar un archivo a un chat normal no garantiza que aparezca en chats nuevos.

| Plataforma | Carga automática | Importación necesaria |
| --- | --- | --- |
| ChatGPT / Codex | `AGENTS.md`, skills y plugin dentro del Proyecto/repo | Crear Proyecto o instalar plugin compatible |
| Claude | Skill habilitada en Claude | Subir un ZIP en Customize > Skills o usar Project Knowledge |
| Gemini | Instrucciones y conocimiento del Gem | Crear Gem y añadir archivos |
| Copilot | `.github/copilot-instructions.md` en el repo | Abrir el repo con Copilot |
| Pi | `AGENTS.md` y `.agents/skills/` en el contexto | Clonar/copiar y reiniciar o `/reload` |
| Otra IA | Ninguna por defecto | Pegar `START-HERE.md` y subir la edición universal |

Adjuntar un archivo a un chat normal no garantiza memoria en chats futuros. Usá el espacio persistente equivalente de cada plataforma.

## ChatGPT

Creá un Proyecto. Subí la `MEMORIA.md` como archivo y agregá en las instrucciones del Proyecto: “Usá `MEMORIA.md` como fuente de verdad para este perfil; aplicá sus reglas y proponé actualizaciones cuando corresponda”. Los chats nuevos dentro de ese Proyecto comparten sus archivos e instrucciones.

## Claude

Creá un Project. Subí la memoria a Project Knowledge y pegá en Project Instructions las reglas centrales y la indicación de consultar el archivo. La configuración aplica a los chats de ese Project, no a todos los chats de la cuenta.

## Gemini

Creá un Gem para el perfil. Pegá el prompt maestro y las reglas esenciales en las instrucciones del Gem; añadí la memoria como archivo de conocimiento si la interfaz lo permite. Usá ese Gem en lugar de un chat común.

## GitHub Copilot

Para un repositorio, guardá instrucciones generales en `.github/copilot-instructions.md`. Para agentes o proyectos que lo admitan, `AGENTS.md` puede contener o referenciar la memoria. La configuración se aplica al contexto de ese repositorio; Copilot puede no seguir una instrucción de forma perfecta en todos los casos.

## Pi

Pi carga archivos de contexto al iniciar. Para todos tus proyectos de Pi, usá `~/.pi/agent/AGENTS.md`. Para un proyecto específico, poné `AGENTS.md` en su carpeta raíz. Después de editar, reiniciá Pi o ejecutá `/reload`.

## Codex

En un repositorio de trabajo, poné `AGENTS.md` en la raíz y referenciá desde allí la memoria del perfil. Mantené la memoria breve y específica del proyecto; cargá la versión completa solo cuando sea necesaria.

## Regla de mantenimiento

La memoria no se modifica sola de manera confiable. Cuando apruebes un resultado, agregá manualmente la nueva regla o aprendizaje a `MEMORIA.md` y sincronizá el archivo en GitHub o Drive.

## Flujo de modelos para principiantes

La palabra “plan” significa simplemente **acordar los pasos antes de hacer el trabajo**. No hace falta conocer herramientas de planificación ni escribir un documento formal.

1. Para una tarea nueva, compleja o importante, elegí el modelo más capaz que tengas.
2. Pedile primero un plan corto en lenguaje común: objetivo, pasos, datos faltantes, riesgos y resultado esperado.
3. Revisá el plan y respondé “aprobado”, o corregí lo que no te convenza.
4. Para ejecutar una tarea repetitiva con reglas claras, cambiá a un modelo rápido o barato.
5. Si aparecen dudas, errores o decisiones nuevas, volvé al modelo capaz y llevá el resumen de lo ocurrido.

Una frase reutilizable es: “Primero explicame qué vas a hacer y esperá mi aprobación. Después ejecutá el trabajo. Si es una tarea repetitiva y clara, usá un modelo rápido; si requiere criterio o decisiones, recomendame uno capaz”.

Para instalar por perfil, elegí `general` si la persona combina roles o una edición específica si quiere un contexto más acotado. Los adaptadores no prometen activación automática donde la plataforma no la ofrece.
