# Resumen del enunciado

Resumen propio del PDF "TP Individual de Desarrollo con IA - 2C 2026". Ante dudas, vale el PDF original.

## Qué hay que construir

**AI Ticket It**: plataforma para publicar eventos y vender entradas. Dos roles: **organizador** (publica
eventos, define tipos de entrada con precio y cupo, ve ventas) y **comprador** (explora, compra, chatea,
cancela, reseña).

## Requerimientos técnicos

- Back-End: **Node + Express**. Front-End: **React Native**.
- Corre **local en un dispositivo mobile**. Persistencia **en memoria**.
- Herramientas de IA recomendadas (opcionales): Antigravity, Cline, Claude, Cursor, VS Code + Copilot, v0, Base44.
- **No** usar herramientas pagas.
- Se valora: criterio, justificación de decisiones y reflexión crítica sobre el uso de IA.

## Modelo (diagrama tentativo)

- **Usuario**: nombre, apellido, favoritos (Evento[])
- **Evento**: nombre, descripcion, categoria, fecha, tiposEntrada[], multimedia (String[]), organizador (Usuario);
  `tuPrecioEstaEntre(Int, Int): Boolean`
- **TipoEntrada**: nombre, descripcion, precio, cupo; `hayCupoPara(Int): Boolean`
- **Categoria**: nombre, descripcion
- **Compra**: comprador, evento, tipoEntrada, cantidad, total, estado, mensajes[]; `actualizarEstado(EstadoCompra)`
- **EstadoCompra** (enum): PENDIENTE, CONFIRMADA, UTILIZADA, CANCELADA, REEMBOLSADA
- **CambioEstadoCompra**: compra, estado, quien (Usuario), fechaHora (historial de estados)
- **Mensaje**: usuario, mensaje, enviado (DateTime)
- **Resenia**: comprador, evento, detalle, puntuacion (Double)

## Casos de uso (CU)

1. Comprador: ver mis compras, con estado claro y **días que faltan** para el evento si está CONFIRMADA.
2. Organizador: ver las compras de un evento, con estado claro y **entradas disponibles por tipo**.
3. Comprador: buscar eventos por **texto** o explorar por **categoría**.
4. Organizador: **crear un evento** con varios tipos de entrada (precio y cupo cada uno).
5. Comprador: **enviar mensajes** en el chat de una compra, en cualquier momento.
6. Organizador: **responder mensajes** en el chat de una compra, en cualquier momento.
7. Comprador: **cancelar una compra** para obtener reembolso.
8. Regla: se puede cancelar siempre que **no esté UTILIZADA** y el **evento aún no se haya realizado**.
9. Comprador: tras usar la entrada, **puntuar** (número) y **comentar** el evento.
10. Comprador: ver las **reseñas** de eventos anteriores en los eventos de cada organizador.
11. Comprador: **ordenar** resultados por precio, fecha del evento y puntaje del organizador.
12. Comprador: **comprar** eligiendo tipo de entrada y cantidad, **sin superar el cupo**.

## Entrega

Video de **5 a 10 minutos**, un flujo a elección. Explicar: implementación en Back-End, implementación en
Front-End y recorrido completo en la interfaz. Cierra con una **conclusión** sobre el uso de IA: ventajas,
desventajas, dificultades, aprendizajes y valoración personal de impacto en productividad y calidad.
