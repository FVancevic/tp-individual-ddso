# Registro de decisiones

Cada decisión de diseño o desarrollo, para poder recordarla y explicarla en el video de entrega.
Formato: **Contexto → Alternativas → Decisión → Motivo**. Las decisiones no se borran: si cambian,
se agrega una nueva que reemplaza a la anterior y se marca la vieja como *reemplazada*.

## Índice

- [D-001: Forma de trabajo y documentación](#d-001-forma-de-trabajo-y-documentación)

---

## D-001: Forma de trabajo y documentación

- **Fecha:** 2026-10-27
- **Contexto:** El TP evalúa el criterio y la capacidad de justificar decisiones, no solo el resultado. El
  autor no tiene experiencia previa con ninguna de las tecnologías.
- **Alternativas:** (a) generar todo de una vez y estudiarlo después; (b) construir por pasos chicos con
  explicación previa.
- **Decisión:** (b), con commits chicos, y dos documentos vivos: `APRENDIZAJE.md` (conceptos) y
  `DECISIONES.md` (este archivo). Las reglas quedan en `CLAUDE.md` para que persistan entre sesiones.
- **Motivo:** Permite entender cada pieza antes de apoyarse en ella y llegar al video con material para
  explicar el proceso y la reflexión crítica sobre el uso de IA.

---

## D-002: JavaScript puro, sin TypeScript

- **Fecha:** 2026-10-27
- **Contexto:** El enunciado pide Node + Express y React Native, sin mencionar TypeScript. El autor no
  conoce JavaScript.
- **Alternativas:** (a) JavaScript; (b) TypeScript (tipos estáticos, más parecido a un lenguaje de clases).
- **Decisión:** JavaScript.
- **Motivo:** Es una capa menos para aprender. Con tantas tecnologías nuevas a la vez, conviene reducir
  la superficie. Contra: no hay chequeo de tipos, así que los errores aparecen al ejecutar; lo compensamos
  con validaciones explícitas en el Back-End. Se podría migrar a TypeScript más adelante.

## D-003: Cómo ejecutar la app mobile (pendiente)

- **Fecha:** 2026-10-27
- **Estado:** pospuesta hasta empezar el Front-End.
- **Opciones:** Expo Go en celular físico (opción más simple y gratuita) o emulador de Android.

---

## D-004: ES Modules (`import`/`export`) en vez de CommonJS

- **Fecha:** 2026-10-27
- **Contexto:** Node soporta dos sistemas de módulos: CommonJS (`require`) y ES Modules (`import`).
- **Alternativas:** (a) CommonJS, el default histórico de Node; (b) ES Modules.
- **Decisión:** ES Modules, con `"type": "module"` en el `package.json` del Back-End.
- **Motivo:** Es el estándar actual de JavaScript, se parece al `import` de Java y es la misma sintaxis que
  usa React Native, así que se aprende una sola vez. Costo: hay que escribir la extensión `.js` en los imports.
