# Apuntes de aprendizaje

Cuaderno de repaso de las tecnologías del TP (JavaScript, Node, Express, React, React Native).
Cada concepto tiene: qué es, para qué lo usamos acá y, cuando hubo repregunta, **"Lo que me hizo clic"**:
la explicación o analogía que terminó de aclararlo.

> Las decisiones de diseño van en [DECISIONES.md](DECISIONES.md), no acá.

## Índice

- [Mapa general: qué es cada pieza](#mapa-general-qué-es-cada-pieza)

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
