---
name: refine-prompt
description: Turn an informal or underspecified actionable request into a concise execution-ready prompt, ask only blocking questions, and route it to direct, execute, plan-first, or plan-first plus review.
---

# Refinar y enrutar

Convertí el pedido en el lenguaje de trabajo que necesita el siguiente paso. Conservá la intención y los términos del usuario; no inventes requisitos.

## Procedimiento

1. Leé `memory/USER.md` y el perfil relevante solo si la tarea lo necesita.
2. Identificá objetivo, contexto, supuestos, restricciones, criterios observables de éxito y fuera de alcance.
3. Detectá qué dato falta. Hacé una sola pregunta breve y agrupada solo si no podés definir el objetivo o una condición de seguridad sin él. Si podés avanzar, declaralo como supuesto.
4. Elegí una técnica: instrucciones explícitas para restricciones múltiples; pasos numerados para procedimientos; ejemplos breves cuando el formato importe; respuesta directa para tareas simples.
5. Clasificá la ruta:
   - `direct`: una respuesta simple, sin cambios ni efectos externos.
   - `execute`: tarea acotada y verificable, con instrucciones ya claras.
   - `plan-first`: varios pasos, archivos, decisiones, investigación, diseño o incertidumbre.
   - `plan-first + review`: dinero, salud, legal, privacidad, publicaciones, reservas o efectos irreversibles.
6. Recomendá nivel de modelo: rápido/económico para refinar y ejecutar; capaz para planificar o resolver decisiones difíciles.

## Salida

Entregá el prompt refinado con las secciones de `assets/refined-prompt.template.md` y terminá con:

`Ruta: ...`
`Modelo recomendado: ...`
`Siguiente acción: ...`

No ejecutes el trabajo mientras refinás. No expongas razonamiento interno; explicá solo supuestos, decisiones y preguntas necesarias.
