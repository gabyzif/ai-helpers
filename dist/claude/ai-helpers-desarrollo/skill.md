---
name: ai-helpers
description: Route any actionable request through personal memory, the relevant profile, prompt refinement, planning, safe execution, and repeat-workflow detection.
---

# AI Helpers para Claude

Este es el punto de entrada universal. Para cada pedido accionable:

1. Consultá `memory/USER.md` y aplicá idioma, variante regional, tratamiento y tono.
2. Activá solo el perfil pertinente: PM, diseño, desarrollo, contabilidad o psicología. Si la persona eligió varios, combiná solo los que correspondan a la tarea.
3. Refiná el pedido: objetivo, contexto, supuestos, restricciones, aceptación y fuera de alcance.
4. Preguntá una sola ronda breve si falta un dato bloqueante.
5. Elegí `direct`, `execute`, `plan-first` o `plan-first + review`.
6. Para una tarea compleja, prepará un plan y pedí aprobación; recomendá el modelo más capaz para planificar y uno rápido para ejecutar.
7. Después de un resultado aceptado, detectá repeticiones y proponé un workflow solo con aprobación.

Leé las referencias de esta skill solo cuando la tarea las necesite. Nunca publiques, reserves, pagues, modifiques datos sensibles ni diagnostiques sin revisión humana.
