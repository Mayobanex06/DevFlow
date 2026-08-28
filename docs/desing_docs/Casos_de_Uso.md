# Casos de Uso - DevFlow

## Objetivo

Este documento enumera y describe los principales casos de uso de DevFlow V1, derivados de los requisitos funcionales, el catálogo funcional y los actores definidos para el sistema.

---

# Actores

- **Administrador:** administra usuarios, equipos, roles y permisos.
- **Director / Gerente:** supervisa proyectos e indicadores generales.
- **Project Manager:** administra proyectos, tareas, responsables, prioridades y fechas límite.
- **Colaborador:** representa a Desarrollador, QA y Diseñador; actualiza el trabajo asignado.
- **Cliente:** consulta información autorizada de sus proyectos.

---

# Catálogo de Casos de Uso

| Código | Caso de uso | Actor principal |
|---|---|---|
| CU-01 | Registrar usuario | Administrador |
| CU-02 | Gestionar equipos | Administrador |
| CU-03 | Administrar roles y permisos | Administrador |
| CU-04 | Crear proyecto | Project Manager |
| CU-05 | Modificar proyecto | Project Manager |
| CU-06 | Consultar proyecto | Usuario autorizado |
| CU-07 | Gestionar miembros de proyecto | Project Manager |
| CU-08 | Crear tarea | Project Manager |
| CU-09 | Modificar tarea | Project Manager |
| CU-10 | Asignar responsable | Project Manager |
| CU-11 | Actualizar estado de tarea | Colaborador |
| CU-12 | Registrar comentario | Usuario autorizado |
| CU-13 | Adjuntar documento | Usuario autorizado |
| CU-14 | Consultar progreso de proyecto | Project Manager / Gerente / Cliente |
| CU-15 | Visualizar indicadores | Gerente / Project Manager / Colaborador |
| CU-16 | Consultar historial de actividades | Usuario autorizado |
| CU-17 | Consultar proyectos asignados | Usuario autorizado |

---

# CU-01 - Registrar usuario

## Actor principal
Administrador.

## Objetivo
Registrar en DevFlow a una persona que ya posee una identidad válida en Neon Auth.

## Precondiciones
- El administrador debe estar autenticado.
- La identidad correspondiente debe existir en Neon Auth.
- El rol asignado debe existir en DevFlow.

## Flujo principal
1. El administrador solicita registrar un usuario.
2. El sistema solicita los datos necesarios.
3. El administrador proporciona la identidad de Neon Auth, nombre y rol.
4. El sistema valida la identidad y verifica que no esté asociada a otro usuario.
5. El sistema valida el rol.
6. El sistema registra el usuario.
7. El sistema confirma la operación.

## Postcondiciones
- El usuario queda registrado en DevFlow.
- El usuario queda asociado a Neon Auth y a un rol.

---

# CU-02 - Gestionar equipos

## Actor principal
Administrador.

## Objetivo
Crear equipos y administrar sus miembros.

## Precondiciones
- El administrador debe estar autenticado.
- Los usuarios que serán agregados deben existir.

## Flujo principal
1. El administrador crea o selecciona un equipo.
2. El sistema muestra la información del equipo.
3. El administrador agrega o elimina miembros.
4. El sistema actualiza las relaciones correspondientes.
5. El sistema confirma los cambios.

## Postcondiciones
- La composición del equipo queda actualizada.

---

# CU-03 - Administrar roles y permisos

## Actor principal
Administrador.

## Objetivo
Gestionar los permisos asociados a los roles del sistema.

## Precondiciones
- El administrador debe estar autenticado.

## Flujo principal
1. El administrador consulta los roles.
2. El sistema muestra los permisos asociados.
3. El administrador agrega o elimina permisos.
4. El sistema actualiza la relación rol-permiso.
5. El sistema confirma los cambios.

## Postcondiciones
- Los permisos del rol quedan actualizados.

---

# CU-04 - Crear proyecto

## Actor principal
Project Manager.

## Objetivo
Registrar un nuevo proyecto en DevFlow.

## Precondiciones
- El Project Manager debe estar autenticado.
- El cliente asociado debe existir.

## Flujo principal
1. El Project Manager solicita crear un proyecto.
2. El sistema presenta los datos requeridos.
3. El Project Manager ingresa la información.
4. El sistema valida los datos.
5. El sistema registra el proyecto.
6. El sistema confirma la creación.

## Postcondiciones
- El proyecto queda registrado y asociado a su cliente.

---

# CU-05 - Modificar proyecto

## Actor principal
Project Manager.

## Objetivo
Actualizar la información de un proyecto existente.

## Precondiciones
- El Project Manager debe estar autenticado.
- El proyecto debe existir.
- El usuario debe tener acceso al proyecto.

## Flujo principal
1. El Project Manager consulta el proyecto.
2. El sistema muestra la información disponible.
3. El Project Manager modifica los datos permitidos.
4. El sistema valida los cambios.
5. El sistema actualiza el proyecto.
6. El sistema registra la actividad correspondiente.
7. El sistema confirma la operación.

## Postcondiciones
- La información del proyecto queda actualizada.

---

# CU-06 - Consultar proyecto

## Actor principal
Usuario autorizado.

## Objetivo
Consultar la información de un proyecto al que el usuario tiene acceso.

## Precondiciones
- El usuario debe estar autenticado.
- El proyecto debe existir.
- El usuario debe tener autorización.

## Flujo principal
1. El usuario solicita consultar un proyecto.
2. El sistema valida el acceso.
3. El sistema obtiene la información.
4. El sistema devuelve la información autorizada.

## Postcondiciones
- No se modifica información.

---

# CU-07 - Gestionar miembros de proyecto

## Actor principal
Project Manager.

## Objetivo
Administrar los usuarios asociados directamente a un proyecto.

## Precondiciones
- El Project Manager debe estar autenticado.
- El proyecto debe existir.
- Los usuarios deben existir en DevFlow.

## Flujo principal
1. El Project Manager consulta los miembros del proyecto.
2. El sistema muestra los usuarios asociados.
3. El Project Manager agrega o elimina miembros.
4. El sistema actualiza `project_members`.
5. El sistema confirma los cambios.

## Postcondiciones
- La membresía directa del proyecto queda actualizada.

---

# CU-08 - Crear tarea

## Actor principal
Project Manager.

## Objetivo
Crear una unidad de trabajo dentro de un proyecto.

## Precondiciones
- El Project Manager debe estar autenticado.
- El proyecto debe existir.

## Flujo principal
1. El Project Manager solicita crear una tarea.
2. El sistema presenta los datos requeridos.
3. El Project Manager introduce la información.
4. El sistema valida los datos.
5. El sistema registra la tarea dentro del proyecto.
6. El sistema confirma la creación.

## Postcondiciones
- La tarea queda asociada al proyecto.

---

# CU-09 - Modificar tarea

## Actor principal
Project Manager.

## Objetivo
Actualizar la información administrativa de una tarea.

## Precondiciones
- El usuario debe estar autenticado.
- La tarea debe existir.
- El usuario debe tener autorización.

## Flujo principal
1. El Project Manager consulta la tarea.
2. El sistema muestra la información.
3. El Project Manager modifica los datos permitidos.
4. El sistema valida los cambios.
5. El sistema actualiza la tarea.
6. El sistema registra la actividad.
7. El sistema confirma la operación.

## Postcondiciones
- La tarea queda actualizada.

---

# CU-10 - Asignar responsable

## Actor principal
Project Manager.

## Objetivo
Asignar un usuario como responsable de una tarea.

## Precondiciones
- El Project Manager debe estar autenticado.
- La tarea debe existir.
- El usuario responsable debe existir.

## Flujo principal
1. El Project Manager selecciona una tarea.
2. El sistema muestra los usuarios disponibles.
3. El Project Manager selecciona al responsable.
4. El sistema actualiza `assigned_user_id`.
5. El sistema registra la actividad.
6. El sistema confirma la asignación.

## Postcondiciones
- La tarea queda asociada a un único responsable.

---

# CU-11 - Actualizar estado de tarea

## Actor principal
Colaborador.

## Objetivo
Actualizar el estado de una tarea asignada.

## Precondiciones
- El colaborador debe estar autenticado.
- La tarea debe existir.
- El colaborador debe tener acceso a la tarea.

## Flujo principal
1. El colaborador consulta la tarea.
2. Selecciona un nuevo estado permitido.
3. El sistema valida la actualización.
4. El sistema modifica el estado.
5. El sistema actualiza `completed_at` si corresponde.
6. El sistema registra la actividad.
7. El sistema confirma la operación.

## Postcondiciones
- La tarea refleja el nuevo estado.
- El progreso calculado del proyecto puede cambiar.

---

# CU-12 - Registrar comentario

## Actor principal
Usuario autorizado.

## Objetivo
Registrar una actualización escrita dentro de una tarea.

## Precondiciones
- El usuario debe estar autenticado.
- La tarea debe existir.
- El usuario debe tener acceso.

## Flujo principal
1. El usuario consulta la tarea.
2. Escribe un comentario.
3. El sistema valida el contenido.
4. El sistema registra el comentario con su autor y tarea.
5. El sistema confirma la operación.

## Postcondiciones
- El comentario queda asociado a la tarea y al usuario.

---

# CU-13 - Adjuntar documento

## Actor principal
Usuario autorizado.

## Objetivo
Adjuntar un archivo relacionado con un proyecto o una tarea.

## Precondiciones
- El usuario debe estar autenticado.
- El proyecto debe existir.
- Si se especifica una tarea, esta debe pertenecer al proyecto.

## Flujo principal
1. El usuario selecciona un archivo.
2. El sistema valida el archivo.
3. El sistema almacena el contenido mediante el mecanismo configurado.
4. El sistema registra los metadatos en `documents`.
5. El sistema asocia el documento con el proyecto y, opcionalmente, con una tarea.
6. El sistema confirma la operación.

## Postcondiciones
- El documento queda disponible para usuarios autorizados.

---

# CU-14 - Consultar progreso de proyecto

## Actor principal
Project Manager, Gerente o Cliente.

## Objetivo
Consultar el avance actual de un proyecto.

## Precondiciones
- El usuario debe estar autenticado.
- El usuario debe tener acceso al proyecto.

## Flujo principal
1. El usuario solicita el progreso.
2. El sistema obtiene las tareas del proyecto.
3. El sistema calcula el progreso a partir de las tareas completadas.
4. El sistema devuelve el resultado según el nivel de acceso.

## Postcondiciones
- No se modifica información.

---

# CU-15 - Visualizar indicadores

## Actor principal
Gerente, Project Manager o Colaborador.

## Objetivo
Consultar indicadores relacionados con proyectos o trabajo individual.

## Precondiciones
- El usuario debe estar autenticado.

## Flujo principal
1. El usuario accede al panel correspondiente.
2. El sistema determina la información autorizada.
3. El sistema obtiene y calcula los indicadores.
4. El sistema devuelve los resultados.

## Postcondiciones
- No se modifica información.

---

# CU-16 - Consultar historial de actividades

## Actor principal
Usuario autorizado.

## Objetivo
Consultar las acciones registradas dentro de un proyecto o tarea.

## Precondiciones
- El usuario debe estar autenticado.
- El usuario debe tener acceso al contexto solicitado.

## Flujo principal
1. El usuario solicita el historial.
2. El sistema valida el acceso.
3. El sistema obtiene los registros correspondientes.
4. El sistema devuelve el historial en orden cronológico.

## Postcondiciones
- Los registros históricos permanecen sin modificaciones.

---

# CU-17 - Consultar proyectos asignados

## Actor principal
Usuario autorizado.

## Objetivo
Obtener los proyectos a los que el usuario tiene acceso.

## Precondiciones
- El usuario debe estar autenticado.

## Flujo principal
1. El usuario solicita sus proyectos.
2. El sistema identifica al usuario interno de DevFlow.
3. El sistema consulta sus relaciones y permisos aplicables.
4. El sistema devuelve los proyectos autorizados.

## Postcondiciones
- No se modifica información.

---

# Trazabilidad

Los casos de uso deberán mantenerse relacionados con:

- Requisitos funcionales.
- Catálogo funcional.
- Endpoints de la API.
- Casos de uso de la capa Application.
- Pruebas de integración y end-to-end.
