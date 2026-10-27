# Apuntes de aprendizaje

Cuaderno de repaso de las tecnologías del TP (JavaScript, Node, Express, React, React Native).
Cada concepto tiene: qué es, para qué lo usamos acá y, cuando hubo repregunta, **"Lo que me hizo clic"**:
la explicación o analogía que terminó de aclararlo.

> Las decisiones de diseño van en [DECISIONES.md](DECISIONES.md), no acá.

## Índice

- [Mapa general: qué es cada pieza](#mapa-general-qué-es-cada-pieza)
- [JavaScript 1: lo mínimo para leer código](#javascript-1-lo-mínimo-para-leer-código)
- [npm vs Maven (paralelismo con Java)](#npm-vs-maven-paralelismo-con-java)
- [Comandos de npm](#comandos-de-npm)
- [Node y Express: observaciones](#node-y-express-observaciones)
- [Anatomía de package.json](#anatomía-de-packagejson)
- [Qué pasa al hacer npm install express](#qué-pasa-al-hacer-npm-install-express)
- [Primer servidor Express](#primer-servidor-express-backendsrcindexjs)
- [Cómo responde el servidor a un request HTTP](#cómo-responde-el-servidor-a-un-request-http)
- [Validar valores: falsy](#validar-valores-la-trampa-de-los-falsy)
- [Destructuring de objetos](#destructuring-de-objetos)
- [Campos privados y getters](#campos-y-métodos-privados--y-getters)

---

## Mapa general: qué es cada pieza

| Pieza | Qué es | Rol en el TP |
|---|---|---|
| **JavaScript** | Lenguaje de programación. | Es el lenguaje de todo el proyecto (back y front). |
| **Node.js** | Entorno para ejecutar JavaScript fuera del navegador. | Corre nuestro Back-End. |
| **npm** | Gestor de paquetes que viene con Node. | Instala librerías (Express, etc.) y guarda la lista en `package.json`. |
| **Express** | Librería de Node para armar servidores web / APIs. | Expone endpoints HTTP (ej. `GET /eventos`). |
| **React** | Librería para construir interfaces con componentes. | Base conceptual del Front-End. |
| **React Native** | React, pero renderiza componentes nativos de celular. | El Front-End mobile. |

**Idea central:** el celular (React Native) le pide datos por HTTP al servidor (Express sobre Node).
El servidor guarda todo en memoria (variables/arrays), así que al reiniciarlo los datos vuelven al estado inicial.

> Ejemplos, analogías y "lo que me hizo clic" se van agregando a medida que avancemos.

---

## JavaScript 1: lo mínimo para leer código

### Variables: `const` y `let`
```js
const nombre = "Rock en el Parque"; // no se puede reasignar
let cupo = 100;                      // sí se puede reasignar
cupo = cupo - 2;
```
- Usamos `const` por defecto y `let` solo si el valor va a cambiar. Evitamos `var` (es la forma vieja).
- `const` **nunca** permite reasignar la variable, sea cual sea el tipo de dato. Lo que cambia es qué pasa
  con el contenido: un número, string o boolean es inmutable por naturaleza, pero un array u objeto `const`
  se puede modificar por dentro (`lista.push(x)`, `obj.cupo = 5`).
  - **Paralelo Java:** es exactamente `final`. Un `final List` no se puede reasignar, pero sí hacerle `add`.
- No se declara el tipo: JavaScript es de **tipado dinámico**.

### Tipos básicos
`string`, `number` (enteros y decimales son el mismo tipo), `boolean`, `null`, `undefined`,
`Array`, `Object`. Una fecha es un objeto `Date`.

### Funciones
```js
function hayCupoPara(cantidad) { return cantidad <= cupo; }   // tradicional
const hayCupoPara = (cantidad) => cantidad <= cupo;           // flecha (arrow function)
```
Hacen lo mismo en lo básico. Las flecha son muy comunes en callbacks y en React.

> **Observación:** no es una regla por capa, es una convención de estilo. La diferencia real entre ambas es
> el valor de `this`: la flecha **no tiene `this` propio**, la tradicional sí. Por eso:
> - En **callbacks y handlers** (controllers, `filter`, `map`) se usan flechas: no necesitan `this`.
> - En **clases de dominio** los métodos se escriben con la sintaxis de método (`hayCupoPara(c) { ... }`, sin
>   la palabra `function` ni flecha), que sí tiene `this` y apunta al objeto. No es "función tradicional"
>   estrictamente, pero se parece más a ella.

### Objetos y arrays
```js
const evento = { nombre: "Obra", precio: 5000 };   // objeto: pares clave/valor
evento.nombre;                                      // "Obra"
const eventos = [evento, otroEvento];               // array
eventos.filter(e => e.precio < 10000);              // devuelve un array nuevo con los que cumplen
eventos.map(e => e.nombre);                         // devuelve un array nuevo transformado
eventos.find(e => e.nombre === "Obra");             // primer elemento que cumple (o undefined)
```
`filter`, `map` y `find` reemplazan a los `for` en la mayoría de los casos.

### Comparar: `===`
Usar siempre `===` (y `!==`), nunca `==`. `==` convierte tipos y da resultados sorprendentes
(`"5" == 5` es `true`).

### Clases
```js
class TipoEntrada {
  constructor(nombre, precio, cupo) {
    this.nombre = nombre;
    this.precio = precio;
    this.cupo = cupo;
  }
  hayCupoPara(cantidad) {
    return cantidad <= this.cupo;
  }
}
const general = new TipoEntrada("General", 5000, 100);
general.hayCupoPara(3); // true
```
Muy parecido a otros lenguajes con clases. `this` es el objeto sobre el que se llama el método.
En el constructor **se crean las propiedades**: no se declaran arriba como en el diagrama.

### Módulos (separar el código en archivos)
Usamos **ES Modules** (`import` / `export`), que es la sintaxis moderna y la misma que usa React Native
(ver decisión D-004).
```js
// tipoEntrada.js
export class TipoEntrada { /* ... */ }

// otro.js
import { TipoEntrada } from "./tipoEntrada.js";
```
- **Paralelo Java:** `import` equivale al `import` de Java, pero apunta a un **archivo** (ruta relativa), no a un paquete.
- En Node hay que activarlo con `"type": "module"` en el `package.json`.
- En imports de archivos propios **hay que escribir la extensión** (`.js`). Olvidarla es un error típico.
- `export` nombrado (`export class X` + `import { X }`) vs `export default`: preferimos el nombrado, porque
  el nombre queda fijo en todos los archivos.
- En tutoriales viejos vas a ver `require` / `module.exports` (CommonJS). Es lo mismo en otra sintaxis; no lo usamos.

---

## npm vs Maven (paralelismo con Java)

**Sí: npm cumple el rol de Maven.** Es el gestor de dependencias y de tareas del proyecto.

| Java / Spring Boot | Node / JavaScript | Comentario |
|---|---|---|
| Maven (`mvn`) | **npm** (`npm`) | Descarga dependencias y ejecuta tareas. |
| `pom.xml` | **`package.json`** | Describe el proyecto: nombre, dependencias, scripts. |
| Maven Central | **npm registry** | Repositorio público de librerías. |
| `<dependency>` en el pom | `"dependencies"` en `package.json` | `npm install express` la agrega sola. |
| `~/.m2` (caché global) | **`node_modules/`** | Acá es **por proyecto**: cada proyecto tiene sus propias copias. Por eso va en `.gitignore`. |
| Versiones fijas en el pom | **`package-lock.json`** | Congela las versiones exactas instaladas. Sí se commitea. |
| `mvn spring-boot:run` | `npm start` | Los comandos se definen en `"scripts"` de `package.json`. |
| Spring Web (`@RestController`) | **Express** | Misma función (exponer endpoints HTTP), pero mucho más liviano. |
| JVM | **Node.js** | El runtime que ejecuta el código. |

**Diferencias a tener en cuenta**
- **No hay compilación.** JavaScript se interpreta: no existe `mvn compile` ni `.class`. Se ejecuta directo con `node archivo.js`.
- **No hay ciclo de vida ni fases** (`compile`, `test`, `package`). `npm` solo ejecuta los scripts que vos definas.
- **Express no tiene inyección de dependencias ni anotaciones.** Spring te arma el contexto solo; en Express vos
  conectás las piezas a mano con `import` y funciones. Es más simple y más explícito.
- Los controllers/services/repositories de Spring existen acá como **convención de carpetas**, no como framework.

---

## Comandos de npm

| Comando | Qué hace | Paralelo Java |
|---|---|---|
| `npm init` | Crea **solo el archivo `package.json`**, haciéndote preguntas (nombre, versión, etc.). **No** arma carpetas ni código. | Crear el `pom.xml` a mano; no es un Spring Initializr. |
| `npm init -y` | Igual, pero acepta todos los valores por defecto sin preguntar. | |
| `npm install` | Lee `package.json` y descarga **todas** las dependencias a `node_modules/`. Se usa al clonar un proyecto. | `mvn install` / refrescar dependencias |
| `npm install express` | Descarga Express, la agrega a `"dependencies"` en `package.json` y actualiza `package-lock.json`. | Agregar un `<dependency>` y refrescar |
| `npm install -D nodemon` | Igual, pero la deja en `"devDependencies"`: solo sirve para desarrollar, no para producción. | `<scope>test</scope>` (parecido) |
| `npm uninstall express` | Quita la dependencia. | Borrar el `<dependency>` |
| `npm start` | Ejecuta el script `"start"` de `package.json`. | `mvn spring-boot:run` |
| `npm run dev` | Ejecuta cualquier script propio (acá `dev`). `start` es un atajo; el resto necesita `run`. | |
| `npx algo` | Ejecuta un programa de npm sin instalarlo de forma permanente. | |

**Qué es `npm init` en una línea:** sirve para que el proyecto "exista" para npm. A partir de ahí el `package.json`
es el lugar donde se anota todo lo demás. La estructura de carpetas la armamos nosotros.

---

## Node y Express: observaciones

### ¿JavaScript es interpretado?
**Sí, en esencia.** No hay un paso de compilación previo y el código se traduce al ejecutarse. Matiz: el motor de Node
(**V8**) usa compilación **JIT**: mientras corre, convierte las partes más usadas a código máquina para ir más rápido.
Es parecido a lo que hace la JVM con el JIT, pero sin el paso intermedio de bytecode (`.class`).

### ¿Express es un framework?
**Sí, pero minimalista** (a veces se lo llama micro-framework). Resuelve lo esencial: rutas, request/response y
middlewares. **No impone estructura de carpetas ni capas**; esa organización la decidimos nosotros.
Es lo opuesto a Spring Boot, que es "opinionado" (convención sobre configuración).

### ¿Ayuda a entender qué hace Spring por detrás?
**Sí, bastante.** Spring MVC hace lo mismo que Express, pero te lo esconde detrás de anotaciones y autoconfiguración:

| Spring | Express |
|---|---|
| Tomcat embebido | El servidor HTTP de Node: `app.listen(puerto)` |
| `DispatcherServlet` + `@GetMapping("/eventos")` | `app.get("/eventos", handler)` |
| `Filter` / `HandlerInterceptor` | **Middleware** (`app.use(...)`): función que se ejecuta antes del handler |
| `@RequestBody` + Jackson | El middleware `express.json()` |
| `ResponseEntity.status(404).body(x)` | `res.status(404).json(x)` |
| `@ControllerAdvice` / `@ExceptionHandler` | Middleware de manejo de errores |
| `@Autowired` (inyección) | Pasar las dependencias a mano (parámetros o `import`) |

### ¿`.env` es como `application.properties`?
**Casi.** Cumple el mismo rol (configuración fuera del código: puertos, claves), pero son **variables de entorno**
que se leen con `process.env.PUERTO`. Se mantiene fuera de git (por eso está en el `.gitignore`).
Para este TP lo más probable es que casi no lo necesitemos (no hay base de datos ni claves externas).

---

## Anatomía de `package.json`

Generado con `npm init`. Campos de `backend/package.json`:

| Campo | Qué es | Paralelo `pom.xml` |
|---|---|---|
| `name`, `version` | Identidad del proyecto. | `artifactId`, `version` |
| `description`, `author`, `license` | Metadatos. | `description`, `developers`, `licenses` |
| `type` | `"module"` activa `import`/`export` (D-004). `"commonjs"` sería `require`. | Sin equivalente directo. |
| `main` | Punto de entrada del proyecto. No arranca nada por sí solo. | Parecido a `<mainClass>`. |
| `scripts` | Tareas ejecutables con `npm run <nombre>`. | Goals/plugins de Maven. |
| `dependencies` | Librerías necesarias para correr. Aparece al hacer `npm install <paquete>`. | `<dependencies>` |

> `npm init` también pregunta por `type` en las versiones nuevas de npm. Elegimos `module` ahí mismo.

---

## Qué pasa al hacer `npm install express`

Tres cambios en `backend/`:

1. **`package.json`** suma `"dependencies": { "express": "^5.3.0" }`.
2. **`package-lock.json`** (nuevo): versión **exacta** de cada paquete instalado. Garantiza que todos instalen lo mismo. **Se commitea.**
3. **`node_modules/`** (nueva): los paquetes descargados. **No se commitea** (está en `.gitignore`). Se reconstruye con `npm install`.

### Versionado `^5.3.0` (semver)
Las versiones son `MAYOR.MENOR.PARCHE`. El `^` acepta cualquier versión más nueva que **no cambie la mayor**:
`5.3.0` y `5.9.1` sí, `6.0.0` no (una versión mayor puede romper compatibilidad).

### Dependencias transitivas
Express declara 28 dependencias directas, y estas a su vez dependen de otras: `node_modules/` terminó con 65
carpetas. No hay que conocerlas. **Paralelo Java:** igual que las dependencias transitivas de Maven al agregar un starter de Spring.

---

## Primer servidor Express (`backend/src/index.js`)

```js
import express from "express";            // "express" sin "./" => se busca en node_modules/

const app = express();                    // crea el objeto de la aplicación (no arranca nada)
const PUERTO = 3000;

app.get("/salud", (req, res) => {         // registra una ruta GET (≈ @GetMapping("/salud"))
  res.json({ estado: "ok" });             // escribe la respuesta
});

app.listen(PUERTO, () => {                // recién acá arranca el servidor
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
```
Se ejecuta con `node src/index.js` y se prueba en `http://localhost:3000/salud`.

| Línea | Qué hace | Paralelo Spring |
|---|---|---|
| `import express from "express"` | Importa la librería. Sin `./` busca en `node_modules/`; con `./` es un archivo propio. | `import` + classpath |
| `express()` | Crea la app donde se registran rutas y middlewares. No arranca el servidor. | Configurar el `DispatcherServlet` |
| `app.get(ruta, handler)` | Registra un endpoint GET. | `@GetMapping` |
| `app.listen(puerto, cb)` | Arranca el servidor; el callback corre cuando ya está escuchando. | `SpringApplication.run` |

### `req` y `res`
- `req`: lo que llega (headers, params, query; el body solo se lee con el middleware `express.json()`).
- `res`: **el objeto con el que se escribe la respuesta**.

> **Lo que me hizo clic:** en Spring el método **devuelve** un `ResponseEntity`. En Express el handler **no devuelve
> nada**: recibe `res` y lo **usa** (`res.status(404).json(...)`). Por eso `res` es un parámetro. Si el handler
> nunca llama a un método de `res`, la petición queda colgada.

### `Cannot GET /`
Es el 404 por defecto de Express: pedí una ruta que no está registrada (`/` en vez de `/salud`). No es un error del código.

### Qué pasa al cerrar el proceso
El servidor se detiene y, como la persistencia es **en memoria**, se pierden todos los datos. Es lo esperado en este TP.

### Capas previstas
`routes → controller → service → repositorio en memoria`. El "router principal" es la propia `app`; cada
`express.Router()` se monta con `app.use("/eventos", router)`. Se arma cuando haya más de un endpoint.

### Repreguntas sobre el primer servidor

**¿Qué hay en `node_modules/` hoy?**
Express y todas sus dependencias transitivas (65 carpetas en total). Al instalar más paquetes se suman a la misma
carpeta, con las dependencias compartidas una sola vez. No hace falta saber qué carpeta es de quién: lo registran
`package.json` y `package-lock.json`.

**¿Qué significa el primer `express` de `import express from "express"`?**
Es un **nombre local que se elige** (una variable). El segundo, entre comillas, es el **nombre del paquete** que se
busca en `node_modules`. Se podría escribir `import e from "express"`.
- Sin llaves: import del export **por defecto** del módulo.
- Con llaves (`import { TipoEntrada } from ...`): import de un export **con nombre**.
- Diferencia con Java: el `import` de Java trae la clase con su nombre fijo; acá se elige cómo llamarla.

**¿Qué devuelve `express()`?**
El objeto `app`, que ya trae los métodos `get`, `post`, `use`, `listen`, etc.

**¿Llamar a `res.json()` es como devolver el `ResponseEntity`?**
Sí en el efecto: ahí se envía la respuesta. Cambia el mecanismo:
- **Spring:** el método devuelve un valor y el framework lo envía.
- **Express:** el framework **ignora lo que devuelve el handler**; la respuesta sale cuando se llama a un método de `res`.

> **Lo que me hizo clic:** llamar a un método de `res` es el equivalente al `return new ResponseEntity(...)`, pero
> es **una acción** (se envía en ese momento), no un valor devuelto.

**Trampa: `res.json()` no corta la función.**
A diferencia del `return` de Java, el código siguiente se sigue ejecutando; si se vuelve a responder, falla con
`Cannot set headers after they are sent`. Para salir antes (validaciones) se usa:
```js
if (!nombre) {
  return res.status(400).json({ error: "El nombre es obligatorio" });
}
```
El `return` corta la función; su valor se ignora.

---

## Cómo responde el servidor a un request HTTP

**¿El servidor necesita conocer la dirección del cliente para responder?** No.

1. El cliente abre una **conexión** con el servidor y envía el request por ella.
2. El servidor recibe el request **junto con esa conexión**.
3. Para responder escribe **en esa misma conexión**; el cliente la está esperando.

- `res` es el acceso a esa conexión abierta. Por eso, si el handler nunca llama a un método de `res`, el cliente
  queda esperando hasta el timeout.
- **Spring hace lo mismo** por debajo (`HttpServletResponse`). Al devolver un `ResponseEntity`, Spring lo escribe
  en la conexión por vos; en Express lo hacés vos.
- El servidor puede ver la IP del cliente (`req.ip`) pero es solo informativa, no se usa para responder.

> **Lo que me hizo clic:** el cliente "queda conectado a un área" esperando; el servidor carga la respuesta en esa
> misma conexión. No hay ninguna llamada de vuelta al cliente.

### Consecuencia: el servidor no puede iniciar la comunicación
Solo puede responder a lo que el cliente pidió. Para el chat de una compra, la app tendrá que **consultar**
si hay mensajes nuevos (polling o al abrir la pantalla). Decisión de diseño pendiente para ese caso de uso.

---

## Validar valores: la trampa de los "falsy"

En JavaScript, `!x` es `true` cuando `x` es **falsy**: `0`, `""`, `null`, `undefined`, `NaN` y `false`.
Por eso `if (!precio)` no significa "falta el precio": también salta si el precio es `0`.

```js
if (!precio) { ... }                         // MAL para números: rechaza 0
if (typeof precio !== "number") { ... }      // chequea el tipo
if (precio === undefined || precio === null) // chequea que exista, aceptando 0
if (Number.isInteger(cupo)) { ... }          // es un entero
```
JavaScript **no chequea tipos**, así que un `precio = "abc"` o `-500` pasa sin quejarse: hay que validarlo a mano.
Esto compensa la decisión D-002 de no usar TypeScript.

### `export`: lo que no se exporta es privado
Una clase sin `export` solo se usa dentro de su archivo (como una clase Java sin `public`).

---

## Modificar entidades: métodos de negocio en vez de setters (YAGNI / KISS)

**Pregunta:** si otra clase modifica un campo de `TipoEntrada`, ¿hay que validar en setters?

- **YAGNI:** no se crean setters por las dudas. Se agrega código cuando un caso de uso lo necesita.
- Cuando aparezca la necesidad, se crea un **método con nombre de negocio** que valide la regla, en vez de un
  setter genérico. Ejemplo previsto: `descontarCupo(cantidad)` al comprar (el cupo no puede quedar negativo).
- **Limitación conocida de JavaScript:** los campos son públicos; `entrada.precio = -5` desde afuera funciona y
  salta la validación del constructor. Se evitaría con campos privados `#` y getters, pero queda fuera de alcance
  (KISS). Es una convención del equipo no mutar campos directamente.

> **Actualización:** se evaluó adoptar campos privados (D-009) y finalmente se descartó: se mantienen campos públicos (ver D-011).

---

## Destructuring de objetos

Extrae propiedades de un objeto a variables, en una línea.
```js
const { nombre, precio } = entrada;        // equivale a: const nombre = entrada.nombre; const precio = entrada.precio;
function f({ nombre, precio } = {}) { }    // también en parámetros; "= {}" es el valor por defecto si no se pasa nada
```
- En un constructor permite **parámetros con nombre**: `new TipoEntrada({ nombre: "General", precio: 5000, ... })`.
  El orden no importa y no se pueden cruzar dos números por error (ver D-010). Reemplaza al *builder* de Java.
- Sin el `= {}`, llamar sin argumentos da un `TypeError` confuso al desestructurar `undefined`.
- Se ve en todos lados en React: `function Entrada({ titulo, precio })`.

## Campos y métodos privados (`#`) y getters (concepto; no se usa en el TP, ver D-011)

```js
export class TipoEntrada {
  #nombre;                         // 1. declarar el campo arriba, con #
  constructor({ nombre } = {}) {
    this.#nombre = nombre;         // 2. usarlo siempre con el # incluido
  }
  get nombre() { return this.#nombre; }   // 3. getter: se lee como entrada.nombre, SIN paréntesis
  #validar() { ... }                      // métodos también pueden ser privados: this.#validar()
}
```
- El `#` es parte del nombre. Fuera de la clase, `entrada.#nombre` es un error de sintaxis.
- **Paralelo Java:** `private` + `getNombre()`.
- **Consecuencia en tests:** `expect(entrada).toEqual(otra)` no compara campos privados; hay que verificar con los
  getters, campo por campo.
- **Consecuencia en JSON:** `JSON.stringify(entrada)` da `{}`; hace falta un método `toJSON()` (ver D-009).
- **Honestidad sobre "lo que se usa en la industria":** son estándar del lenguaje, pero no la práctica dominante en
  JavaScript (es común dejar campos públicos, o usar TypeScript con `private`). Se eligió por garantizar que la
  entidad no quede inválida (D-009), no por ser "la" forma estándar.
