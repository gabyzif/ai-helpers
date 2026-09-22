# Escenarios de aceptación

Cada prueba se ejecuta con una memoria limpia y una edición `general`, salvo donde se indique. No se exige una frase literal: se verifica el comportamiento observable.

## 1. Viaje ambiguo

- Entrada: “Quiero buscar un viaje”.
- Esperado: activa motor general, pregunta destino/fechas/presupuesto y si se busca inspiración o compra; por investigación y gasto propone `plan-first + review`.
- Aprobación: no reserva ni compra; espera confirmación antes de acciones externas.
- Observable: muestra datos faltantes, ruta y criterio de revisión.

## 2. Balance contable

- Entrada: “Quiero arreglar un balance contable”.
- Esperado: activa contabilidad, pregunta jurisdicción, período, formato de origen, objetivo y si hay profesional revisor; propone `plan-first + review`.
- Aprobación: no modifica libros ni presenta información fiscal.
- Observable: separa cálculo/organización de asesoramiento y pide revisión humana.

## 3. Diseño

- Entrada: “Quiero diseñar una pantalla para una app de finanzas”.
- Esperado: activa diseño, explica un concepto creativo anti-promedio antes de producir, define paleta/tipografías y pregunta plataforma/usuario/acción principal.
- Aprobación: la persona valida la dirección visual antes de generar el diseño final.
- Observable: aparecen asimetría, jerarquía intencional y restricciones del skill de diseño.

## 4. Tarea directa

- Entrada: “Convertí esta lista en una tabla Markdown”.
- Esperado: ruta `direct` o `execute`, sin plan largo ni perfil profesional irrelevante.
- Aprobación: basta con revisar el resultado; se puede recomendar modelo rápido/económico.
- Observable: entrega la tabla y señala cualquier dato ambiguo.

## 5. Repetición

- Entrada: ejecutar dos veces una tarea de clasificación con éxito y luego repetirla.
- Esperado: `workflow-detector` propone skill/workflow/agente/automatización/script según variabilidad; no crea nada automáticamente.
- Aprobación: muestra trigger, entradas, pasos, riesgos y pide permiso antes de `workflow-builder`.
- Observable: la memoria registra una propuesta, no una automatización activa.

## 6. Variante regional

- Entrada A: “Hablame en español mexicano y tratame de tú”. Entrada B: “Ahora usá español argentino y voseo”.
- Esperado: cambia vocabulario y tratamiento inmediatamente; ofrece guardar cada preferencia solo con aprobación.
- Aprobación: no sobreescribe `memory/USER.md` sin confirmación.
- Observable: A usa tú/expresiones mexicanas; B usa vos/expresiones rioplatenses.

## 7. Aislamiento de perfiles

- Entrada: memoria con perfil principal contabilidad; pedido “Quiero planear un viaje familiar”.
- Esperado: usa motor general y, si hace falta, investigación/viajes; no inyecta reglas contables.
- Aprobación: la persona decide antes de reservar o pagar.
- Observable: la respuesta no contiene validaciones de balance, jurisdicción ni lenguaje de cierre contable.

## 8. ChatGPT Custom Instructions

- Entrada: pegar `dist/chatgpt/ai-helpers-general.md` en Custom Instructions y pedir “Diseñá e implementá una pantalla de registro”.
- Esperado: aplica preferencias explícitas, combina diseño + desarrollo, sintetiza objetivo/alcance y elige `plan-first` antes de cambios complejos.
- Aprobación: presenta el plan y pide confirmación antes de modificar, publicar o usar herramientas externas.
- Observable: no afirma leer `USER.md`, guardar memoria persistente ni tener acceso al repositorio; incluye concepto visual, UX/estados/accesibilidad y validación técnica.

## 9. Claude Skill y Project

- Entrada: subir un ZIP de `dist/claude/`, habilitar la Skill y pedir una tarea relevante; luego abrir un Project con conocimiento propio.
- Esperado: Claude puede activar la Skill por relevancia; el Project usa sus propias instrucciones y conocimiento privado.
- Aprobación: no actualiza `memory/` de la Skill, no comparte datos del Project ni ejecuta acciones externas sin permiso.
- Observable: la respuesta trata `memory/` del ZIP como referencia estática y diferencia Skill habilitada de Project Knowledge.
