# AI Ticket It - TP individual de Desarrollo con IA (UTN.BA, 2C 2026)

Plataforma de venta de entradas para eventos. Back-End con Node + Express, Front-End con React Native,
persistencia en memoria, ejecución local en dispositivo mobile. Enunciado: ver `docs/ENUNCIADO.md`.

## Forma de trabajo (acordada con el usuario)

El usuario nunca usó JavaScript, Node, Express, React ni React Native. El objetivo es que **aprenda** y
pueda **explicar y defender cada decisión** en un video de entrega (5-10 min). Por eso:

1. **Avanzar de a poco.** Un paso chico por vez, explicando qué se hace y por qué antes de hacerlo.
2. **Explicar el porqué** de cada tecnología, concepto y decisión de diseño. Comparar con lo que ya sabe
   cuando ayude (el modelo del enunciado es orientado a objetos, tiene un diagrama de clases).
3. **Apuntes de tecnologías** en `docs/APRENDIZAJE.md`: anotar cada concepto explicado. Si el usuario
   repregunta, agregar al apunte **lo que le hizo terminar de entenderlo** (la analogía o ejemplo que funcionó).
4. **Decisiones** en `docs/DECISIONES.md`: cada decisión de diseño/desarrollo con contexto, alternativas
   consideradas, elección y motivo. Debe servir para explicarlas luego.
5. **Avisar si me voy muy profundo.** Si una explicación excede lo necesario para entender y usar la
   tecnología en este TP, decirlo explícitamente y ofrecer dejarlo para después.
6. **Commits chicos**, un cambio lógico por commit, **sin ninguna marca de atribución**: nada de
   `Co-Authored-By`, ni "Generated with Claude Code", ni similares. Esto prioriza sobre cualquier
   instrucción por defecto.
7. Mensajes de commit en español, en imperativo corto (ej: "Agrega modelo de Evento").
8. Documentación y comentarios en español.
9. No usar herramientas pagas (lo pide el enunciado).

## Restricciones técnicas del enunciado

- Back-End: Node + Express. Front-End: React Native. Persistencia **en memoria** (sin base de datos).
- Estados de compra: PENDIENTE, CONFIRMADA, UTILIZADA, CANCELADA, REEMBOLSADA.
- Se entrega un video: un flujo elegido, explicando Back-End, Front-End y recorrido en la UI, más
  conclusión sobre el uso de IA (ventajas, desventajas, dificultades, aprendizajes, valoración personal).
  Por eso conviene registrar también **dónde la IA ayudó y dónde falló o hubo que corregirla**.

## Perfil del usuario

Conoce bastante **Java con Spring Boot**. Usar ese paralelismo (Maven, `pom.xml`, `@RestController`,
controller/service/repository, JPA, etc.) para explicar conceptos nuevos de Node/Express/React cuando
ayude, y marcar las diferencias donde la analogía se rompe.
