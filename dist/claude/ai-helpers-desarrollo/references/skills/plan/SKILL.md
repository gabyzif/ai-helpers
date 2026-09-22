---
name: plan
description: Create a written plan before complex work across code, documents, research, design, travel, finance, or other multi-step tasks; route decisions to an appropriate capable model.
---

# Planificar antes de ejecutar

Usá esta skill para convertir un prompt refinado en un plan que otro modelo pueda seguir sin volver a decidir el enfoque.

## El plan debe fijar

- Objetivo y resultado final.
- Entradas disponibles y datos faltantes.
- Supuestos y decisiones tomadas.
- Entregables, pasos atómicos y dependencias.
- Puntos de aprobación humana.
- Verificaciones y criterio para detenerse.
- Privacidad, riesgos, fuentes y fuera de alcance.

No asumas que la tarea es de código. Puede producir un documento, investigación, diseño, itinerario, análisis o una modificación técnica. Usá `assets/PLAN.template.md` y guardá el plan en `.ai/plans/` si la plataforma tiene filesystem; si no, devolvelo como documento o bloque estructurado.

El planificador debe ser el modelo más capaz disponible. No ejecutés el trabajo durante esta skill. Si la tarea implica efectos externos, el plan debe marcar exactamente dónde hace falta aprobación.
