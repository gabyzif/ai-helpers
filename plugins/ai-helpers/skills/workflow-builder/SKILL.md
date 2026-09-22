---
name: workflow-builder
description: Package an approved repeated task as a portable Agent Skill, workflow, agent, automation, or script with triggers, inputs, approvals, validation, and failure handling.
---

# Construir una capacidad reutilizable

Solo activá esta skill después de que la persona apruebe la propuesta de `workflow-detector`.

1. Elegí el formato mínimo: workflow si los pasos son fijos; skill si predominan instrucciones; agente si requiere decisiones adaptativas; automatización si tiene horario/disparador; script si es determinista.
2. Definí nombre, descripción de activación, entradas, salidas, pasos, decisiones, herramientas, límites y fallos.
3. Marcá qué pasos requieren aprobación humana. Ninguna capacidad nueva puede publicar, pagar, reservar, borrar, modificar información sensible o enviar mensajes sin aprobación.
4. Creá un `SKILL.md` con frontmatter `name` y `description` cuando el resultado sea un Agent Skill. Mantené referencias, scripts y assets dentro de su carpeta.
5. Generá también una explicación portable para plataformas que no soporten skills.
6. Mostrá los archivos y diffs antes de activarlos. Actualizá `memory/WORKFLOWS.md` a `aprobado` solo después de la confirmación.

No conviertas una observación aislada en automatización y no agregues conexiones externas sin una solicitud separada.
