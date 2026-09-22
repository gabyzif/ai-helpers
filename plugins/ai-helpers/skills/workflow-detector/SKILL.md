---
name: workflow-detector
description: Detect repeated successful tasks and propose packaging them as a skill, deterministic workflow, adaptive agent, automation, or script.
---

# Detectar repetición

Usá `memory/WORKFLOWS.md` y el resultado actual. Contá como patrón solo tareas con la misma firma general que aparecieron al menos dos veces y tuvieron un resultado aceptado, o cuando la persona pida explícitamente empaquetarlas.

Para cada candidato informá:

- Firma de entrada y qué partes cambian.
- Pasos estables y decisiones variables.
- Herramientas y permisos requeridos.
- Riesgos y puntos de aprobación.
- Tipo recomendado: workflow determinista para pasos fijos; skill para instrucciones reutilizables; agente para decisiones adaptativas; automatización para una frecuencia/disparador; script para una transformación determinista.

No crees archivos, agentes, automatizaciones ni conexiones todavía. Presentá una propuesta corta y pedí aprobación; registrá el patrón como `propuesto`.
