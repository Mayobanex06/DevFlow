# Modelo Conceptual de Entidades DevFlow

## Objetivo

Este documento describe las principales entidades identificadas en DevFlow
desde tres perspectivas:

1. Relaciones con otras entidades.
2. Estados relevantes.
3. Responsabilidades conceptuales.

Las características no especificadas en la solicitud original se mantienen
como no definidas para evitar introducir reglas de negocio no justificadas.

---

# 1. Proyecto

## Relaciones

- Se relaciona con Tareas.
- Se relaciona con Equipos.
- Se relaciona con Documentos.
- Se relaciona con Clientes.
- Se relaciona con el Historial de Actividades.

## Estado

- Posee un estado.
- Los posibles estados del proyecto no están especificados en la solicitud.

## Responsabilidades

- Representar un trabajo organizado gestionado por la empresa.
- Agrupar el trabajo relacionado.
- Organizar las tareas y participantes asociados.
- Centralizar la documentación relacionada.
- Reflejar el progreso y estado del proyecto.

---

# 2. Usuario

## Relaciones

- Se relaciona con Equipos.
- Se relaciona con Roles.
- Se relaciona con Proyectos.
- Se relaciona con el Historial de Actividades.

## Estado

- No se identifica un ciclo de estados explícito en la solicitud.

## Responsabilidades

- Representar a una persona que utiliza DevFlow.
- Mantener su identidad dentro del sistema.
- Estar asociado a roles, equipos y proyectos.
- Ser identificado como autor de las actividades que realiza.

---

# 3. Rol

## Relaciones

- Se relaciona con Usuarios.
- Se relaciona con Permisos.

## Estado

- No se identifica un ciclo de estados necesario.

## Responsabilidades

- Representar el tipo o nivel de acceso de un usuario.
- Agrupar los permisos correspondientes a un tipo de usuario.

---

# 4. Equipo

## Relaciones

- Se relaciona con Usuarios.
- Se relaciona con Proyectos.

## Estado

- No se identifica un ciclo de estados explícito en la solicitud.

## Responsabilidades

- Agrupar usuarios que trabajan conjuntamente.
- Vincular colaboradores con los proyectos en los que participan.

---

# 5. Tarea

## Relaciones

- Pertenece a un Proyecto.
- Se relaciona con un Usuario responsable.
- Se relaciona con Comentarios.
- Se relaciona con Documentos o Archivos.
- Se relaciona con el Historial de Actividades.

## Estado

- Posee un estado modificable.
- Los posibles estados de una tarea no están especificados en la solicitud.

## Responsabilidades

- Representar una unidad de trabajo.
- Mantener su estado.
- Mantener su prioridad.
- Mantener su fecha límite.
- Asociar el trabajo con un responsable.
- Concentrar las actualizaciones relacionadas con el trabajo.

---

# 6. Cliente

## Relaciones

- Se relaciona con Proyectos.

## Estado

- No se identifica un ciclo de estados explícito en la solicitud.

## Responsabilidades

- Representar al cliente relacionado con uno o varios proyectos.
- Vincular al cliente con los proyectos cuyo progreso puede consultar.

---

# 7. Documento / Archivo

## Relaciones

- Se relaciona con Proyectos.
- Puede relacionarse con Tareas.

## Estado

- No se identifica un ciclo de estados necesario según la solicitud.

## Responsabilidades

- Representar información documental adjunta al trabajo.
- Mantener su asociación con el proyecto o tarea correspondiente.

---

# 8. Comentario

## Relaciones

- Se relaciona con Tareas.
- Se relaciona con un Usuario como autor.

## Estado

- No se identifica un ciclo de estados necesario según la solicitud.

## Responsabilidades

- Representar una comunicación o actualización relacionada con el trabajo.
- Mantener su asociación con el contexto donde fue registrado.
- Mantener la identificación de su autor.

---

# 9. Historial de Actividades

## Relaciones

- Se relaciona con Proyectos.
- Se relaciona con Tareas.
- Se relaciona con Usuarios.

## Estado

- No se identifica un ciclo de estados necesario.

## Responsabilidades

- Proporcionar trazabilidad sobre las actividades realizadas.
- Conservar cronológicamente las acciones relevantes.
- Identificar al usuario responsable de una actividad.
- Relacionar las actividades con el proyecto o tarea correspondiente.

---

# 10. Permiso

## Relaciones

- Se relaciona con Roles.

## Estado

- No se identifica un ciclo de estados necesario.

## Responsabilidades

- Representar una autorización sobre una capacidad del sistema.
- Definir las acciones habilitadas mediante los roles.

---

# Resumen de Estados

| Entidad | Estado identificado |
|---------|---------------------|
| Proyecto | Sí, valores no especificados |
| Tarea | Sí, valores no especificados |
| Usuario | No especificado |
| Equipo | No especificado |
| Cliente | No especificado |
| Rol | No requerido actualmente |
| Permiso | No requerido actualmente |
| Documento / Archivo | No requerido actualmente |
| Comentario | No requerido actualmente |
| Historial de Actividades | No requerido actualmente |

---

# Observaciones

Las relaciones, estados y responsabilidades descritos forman un modelo
conceptual inicial del dominio de DevFlow.

No representan todavía:

- Tablas de base de datos.
- Clases de software.
- Métodos.
- Claves primarias o foráneas.
- Cardinalidades.
- Decisiones de arquitectura.

Los aspectos que no pueden determinarse a partir de la solicitud original
deberán mantenerse como no especificados hasta una fase posterior de diseño
o definición de supuestos.