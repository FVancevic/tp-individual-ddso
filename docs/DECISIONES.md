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
- **Motivo:** Es el estándar actual de JavaScript, es la sintaxis que se usa en la cátedra, se parece al `import` de Java y es la misma que
  usa React Native, así que se aprende una sola vez. Costo: hay que escribir la extensión `.js` en los imports.

---

## D-005: Estructura plana con `backend/` y `frontend/` en la raíz

- **Fecha:** 2026-10-27
- **Contexto:** El repo tendrá dos aplicaciones Node distintas: el servidor (Express) y la app mobile (React Native).
- **Alternativas:** (a) un único `package.json` común; (b) npm workspaces con `package.json` en la raíz; (c) dos
  proyectos independientes dentro de una carpeta contenedora (`apps/`); (d) dos proyectos independientes en la raíz.
- **Decisión:** (d): `backend/` y `frontend/` como carpetas hermanas, cada una con su propio `package.json`, junto a `docs/`.
- **Motivo:** React Native/Expo espera ser un proyecto con su propio `package.json`; las dependencias de ambos
  mundos no se mezclan; los workspaces con React Native tienen problemas conocidos de resolución de dependencias.
  La carpeta contenedora no aporta con solo dos proyectos: el repo ya cumple ese rol.
