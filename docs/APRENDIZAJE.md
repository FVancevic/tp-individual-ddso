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
  conectás las piezas a mano con `require` y funciones. Es más simple y más explícito.
- Los controllers/services/repositories de Spring existen acá como **convención de carpetas**, no como framework.
