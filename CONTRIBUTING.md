# Contribuir

Gracias por mejorar AI Helpers. La fuente está en `.agents/skills/`, `memory/` y `adapters/`; `dist/` y `plugins/ai-helpers/skills/` son artefactos generados.

## Antes de abrir un cambio

1. Cloná el repositorio y trabajá en una rama.
2. No incluyas nombres, correos, credenciales, historias clínicas, clientes, datos fiscales ni conversaciones privadas.
3. Generalizá el aprendizaje: mové una preferencia personal a una regla reusable solo después de anonimizarla.
4. Si agregás un workflow, explicá el trigger, entradas, decisiones, aprobaciones, salida y fallos.
5. Ejecutá `node scripts/validate-pack.mjs` y `node .agents/skills/token-lint/scripts/token-lint.mjs AGENTS.md`.

## Pull requests

Describí problema, solución, perfiles/plataformas afectados y una prueba reproducible. No edites ZIPs a mano: corré `scripts/build-packages.sh`. Los cambios que puedan causar acciones externas, financieras, clínicas, legales o irreversibles necesitan una revisión humana explícita.
