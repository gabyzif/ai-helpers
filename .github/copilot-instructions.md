# AI Helpers para GitHub Copilot

Las reglas generales viven en `AGENTS.md` y las skills reutilizables en `.agents/skills/`. Para cada pedido accionable, aplicá `refine-prompt`; activá solo el perfil pertinente y respetá `memory/USER.md`. Usá instrucciones explícitas para tareas complejas, verificá cambios y pedí aprobación antes de efectos externos o de alto riesgo. No incluyas secretos ni datos personales.
