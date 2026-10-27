# Apuntes de aprendizaje

Cuaderno de repaso de las tecnologías del TP (JavaScript, Node, Express, React, React Native).
Cada concepto tiene: qué es, para qué lo usamos acá y, cuando hubo repregunta, **"Lo que me hizo clic"**:
la explicación o analogía que terminó de aclararlo.

> Las decisiones de diseño van en [DECISIONES.md](DECISIONES.md), no acá.

## Índice

- [Mapa general: qué es cada pieza](#mapa-general-qué-es-cada-pieza)
- [JavaScript 1: lo mínimo para leer código](#javascript-1-lo-mínimo-para-leer-código)

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
- `const` no hace el valor inmutable: un array o un objeto `const` igual se puede modificar por dentro;
  lo que no se puede es apuntar la variable a otra cosa.
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
Node usa **CommonJS** por defecto: `module.exports` para exportar y `require` para importar.
```js
// tipoEntrada.js
class TipoEntrada { /* ... */ }
module.exports = TipoEntrada;

// otro.js
const TipoEntrada = require("./tipoEntrada");
```
> Existe otra sintaxis, `import`/`export` (ES Modules), que es la que usa React Native. La vamos a ver
> cuando lleguemos al Front-End; no hace falta ahora.
