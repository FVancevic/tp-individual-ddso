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

---

## D-006: Organización del Back-End por capas dentro de `src/`

- **Fecha:** 2026-10-27
- **Contexto:** Express no impone estructura de carpetas; hay que decidirla.
- **Alternativas:** (a) por capa técnica (`domain/`, `routes/`, `controllers/`, `services/`, `repositories/`);
  (b) por funcionalidad (`eventos/`, `compras/`, cada una con su ruta, controller y servicio).
- **Decisión:** (a), todo dentro de `backend/src/`. Las carpetas se crean a medida que se necesitan.
- **Motivo:** Es la organización conocida de Spring Boot, lo que facilita relacionar cada pieza con lo que ya se sabe.
  El código de la aplicación vive en `src/`; en la raíz de `backend/` quedan solo archivos de configuración.

---

## D-007: Las entidades de dominio validan sus propios datos en el constructor

- **Fecha:** 2026-10-27
- **Contexto:** JavaScript no chequea tipos (D-002), y una entidad puede crearse con datos inválidos desde cualquier lado.
- **Alternativas:** (a) validar solo en los controllers; (b) validar en el constructor de la entidad de dominio.
- **Decisión:** (b). La entidad lanza `Error` si los datos son inválidos y el controller lo traduce a un 400.
- **Motivo:** Una entidad nunca debería existir en estado inválido, sin importar quién la cree. La regla queda en un
  solo lugar. Contra: el controller debe capturar el error y convertirlo en respuesta HTTP.
- **Reglas de `TipoEntrada`:** `nombre` texto no vacío (ni solo espacios); `descripcion` opcional, pero si viene debe
  ser texto; `precio` número finito `>= 0` (0 permite entradas gratuitas); `cupo` entero `>= 0`. Un mensaje de error
  distinto por campo; se lanza el primero que falle (no se acumulan, por YAGNI).

---

## D-008: Jest como framework de tests, junto al código

- **Fecha:** 2026-10-27
- **Contexto:** Se quieren tests automatizados del dominio. Jest es el estándar de la industria y es el que usa React Native.
- **Alternativas:** (a) `node:test`, el runner incluido en Node 24 (sin dependencias, ES Modules nativo);
  (b) Jest.
- **Decisión:** Jest, instalado como `devDependency`. Los tests van junto al archivo que prueban
  (`TipoEntrada.js` → `TipoEntrada.test.js`).
- **Motivo:** Es lo que se usa en la práctica y servirá también en el Front-End. Costo: con ES Modules hay que
  ejecutarlo con `node --experimental-vm-modules node_modules/jest/bin/jest.js` (el script `"test"` lo encapsula)
  y muestra un `ExperimentalWarning` inofensivo. La alternativa `node:test` quedó descartada por preferencia, no
  por limitación técnica.

## D-009: Campos privados (`#`) con getters explícitos en las entidades de dominio *(reemplazada por D-011)*

- **Fecha:** 2026-10-27
- **Contexto:** En JavaScript los campos son públicos y se pueden modificar desde afuera saltando las validaciones
  del constructor (ej: `entrada.precio = -5`).
- **Alternativas:** (a) campos públicos y convención de no mutarlos; (b) campos privados `#` con getters.
- **Decisión:** (b). Cada campo es `#campo`, se lee con un getter y solo se modifica mediante métodos de negocio
  que validan (ej. `descontarCupo`). Reemplaza a la limitación aceptada en la nota de YAGNI.
- **Motivo:** Garantiza que la entidad no pueda quedar en estado inválido y se parece al encapsulamiento de Java.
- **Costo conocido:** `JSON.stringify(entidad)` devuelve `{}` (los campos privados y los getters del prototipo no se
  serializan). Habrá que definir un método `toJSON()` en cada entidad (o mapear a objetos planos en el controller)
  antes de responder con `res.json(...)`.

---

## D-010: Constructores de entidades reciben un objeto (parámetros con nombre)

- **Fecha:** 2026-10-27
- **Contexto:** `TipoEntrada` tiene cuatro parámetros; dos son números (`precio`, `cupo`) y podrían intercambiarse sin error.
- **Alternativas:** (a) parámetros posicionales; (b) un único objeto desestructurado (`constructor({ nombre, ... } = {})`).
- **Decisión:** (b) para las entidades con varios campos.
- **Motivo:** Cada valor lleva su nombre, el orden no importa y se evita intercambiar argumentos del mismo tipo sin
  que nada falle. JavaScript no tiene argumentos con nombre; esto cumple el rol del *builder* de Java.

---

## D-011: Campos públicos en las entidades (reemplaza a D-009)

- **Fecha:** 2026-10-27
- **Contexto:** Se evaluó usar campos privados `#` con getters (D-009). Se aclaró que no es la práctica dominante en
  JavaScript y que el objetivo es seguir lo que es estándar en la industria.
- **Alternativas:** (a) campos privados `#` con getters; (b) campos públicos, validando en el constructor y
  modificando solo mediante métodos de negocio.
- **Decisión:** (b). Solo se usarán campos privados en una clase concreta si surge una necesidad real (YAGNI).
- **Motivo:** Es lo habitual en JavaScript, mantiene el código más simple, `JSON.stringify` y `res.json(entidad)`
  funcionan sin código extra y los tests pueden comparar objetos con `toEqual`. Costo asumido: nada impide
  asignar un campo desde afuera (`entrada.precio = -5`); se compensa por convención del equipo.
- **Impacto:** se descartan los `toJSON()` y los getters previstos en D-009. La nota de YAGNI sobre métodos de negocio
  (`descontarCupo`, etc.) sigue vigente.
