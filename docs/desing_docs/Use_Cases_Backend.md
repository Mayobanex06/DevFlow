# Use Cases Backend - DevFlow

Este documento traduce los casos de uso funcionales de DevFlow V1 a
casos de uso de la capa **Application**.

Para mantener la trazabilidad se distinguen dos tipos:

-   **Use Cases explícitos:** representan directamente la intención
    descrita en el caso de uso funcional.
-   **Use Cases implícitos:** no constituyen el objetivo principal del
    caso funcional, pero pueden ser necesarios para que el actor pueda
    ejecutar el flujo de manera operativa. Algunos dependen de cómo se
    diseñe finalmente la interfaz o navegación.

------------------------------------------------------------------------

## 1. CU-01 - Registrar usuario

### Use Cases explícitos

-   `CreateUserUseCase`

### Use Cases implícitos

-   `ListRolesUseCase`

**Derivación:** para registrar al usuario debe seleccionarse un rol
existente. El listado de roles permite realizar esa selección.

------------------------------------------------------------------------

## 2. CU-02 - Gestionar equipos

### Use Cases explícitos

-   `CreateTeamUseCase`
-   `GetTeamUseCase`
-   `AddMemberToTeamUseCase`
-   `RemoveMemberFromTeamUseCase`

### Use Cases implícitos

-   `ListTeamsUseCase`
-   `ListUsersUseCase`

**Derivación:** el administrador crea o selecciona un equipo y agrega o
elimina usuarios existentes. Para seleccionar equipos y usuarios desde
la aplicación se requieren sus respectivas colecciones.

> No se incluyen `UpdateTeamUseCase` ni `DeleteTeamUseCase`, porque el
> caso funcional no establece modificar los datos propios del equipo ni
> eliminar el equipo. Agregar o eliminar miembros modifica la relación
> usuario-equipo.

------------------------------------------------------------------------

## 3. CU-03 - Administrar roles y permisos

### Use Cases explícitos

-   `ListRolesUseCase`
-   `GetRolePermissionsUseCase`
-   `AddPermissionToRoleUseCase`
-   `RemovePermissionFromRoleUseCase`

### Use Cases implícitos

-   `ListPermissionsUseCase`

**Derivación:** el administrador consulta roles y sus permisos
asociados, y puede agregar o retirar permisos. Para agregar uno es
necesario disponer de los permisos que pueden seleccionarse.

------------------------------------------------------------------------

## 4. CU-04 - Crear proyecto

### Use Cases explícitos

-   `CreateProjectUseCase`

### Use Cases implícitos

-   `ListClientsUseCase`

**Derivación:** el proyecto debe quedar asociado a un cliente existente.
Si el cliente se selecciona desde la interfaz, es necesario disponer del
listado de clientes.

------------------------------------------------------------------------

## 5. CU-05 - Modificar proyecto

### Use Cases explícitos

-   `UpdateProjectUseCase`

### Use Cases implícitos

-   `ListProjectsUseCase`
-   `GetProjectUseCase`

**Derivación:** antes de modificar un proyecto, el Project Manager
necesita localizarlo y consultar su información actual.

------------------------------------------------------------------------

## 6. CU-06 - Consultar proyecto

### Use Cases explícitos

-   `GetProjectUseCase`

### Use Cases implícitos

-   `ListProjectsUseCase`

**Derivación:** el objetivo explícito es consultar un proyecto concreto.
Un listado puede ser necesario para permitir al usuario localizar y
seleccionar el proyecto que desea consultar.

------------------------------------------------------------------------

## 7. CU-07 - Gestionar miembros de proyecto

### Use Cases explícitos

-   `GetProjectMembersUseCase`
-   `AddMemberToProjectUseCase`
-   `RemoveMemberFromProjectUseCase`

### Use Cases implícitos

-   `ListProjectsUseCase`
-   `ListAvailableProjectMembersUseCase`

**Derivación:** el Project Manager debe seleccionar un proyecto,
consultar sus miembros y poder seleccionar usuarios disponibles para
agregarlos.

------------------------------------------------------------------------

## 8. CU-08 - Crear tarea

### Use Cases explícitos

-   `CreateTaskUseCase`

### Use Cases implícitos

-   `ListProjectsUseCase`

**Derivación:** toda tarea nace asociada a un proyecto. El listado de
proyectos puede ser necesario si el flujo permite seleccionar el
proyecto antes de crear la tarea.

> La asociación con el proyecto forma parte de `CreateTaskUseCase`; no
> requiere un caso de uso independiente para asignar la tarea al
> proyecto.

------------------------------------------------------------------------

## 9. CU-09 - Modificar tarea

### Use Cases explícitos

-   `UpdateTaskUseCase`

### Use Cases implícitos

-   `GetTaskUseCase`
-   `ListProjectTasksUseCase`

**Derivación:** para modificar una tarea, el Project Manager debe
localizarla y consultar sus datos actuales. Listar las tareas de un
proyecto permite encontrar la tarea que se desea modificar.

------------------------------------------------------------------------

## 10. CU-10 - Asignar responsable

### Use Cases explícitos

-   `AssignUserToTaskUseCase`

### Use Cases implícitos

-   `GetTaskUseCase`
-   `ListAssignableUsersUseCase`

**Derivación:** el Project Manager selecciona una tarea y el sistema
muestra los usuarios disponibles antes de escoger un único responsable.

------------------------------------------------------------------------

## 11. CU-11 - Actualizar estado de tarea

### Use Cases explícitos

-   `ChangeTaskStateUseCase`

### Use Cases implícitos

-   `GetTaskUseCase`
-   `ListAssignedTasksUseCase`

**Derivación:** el colaborador necesita localizar una tarea a la que
tenga acceso antes de cambiar su estado. El cambio de estado, la
actualización de `completed_at` cuando corresponda y el registro de
actividad pertenecen al flujo de `ChangeTaskStateUseCase`.

------------------------------------------------------------------------

## 12. CU-12 - Registrar comentario

### Use Cases explícitos

-   `CreateCommentUseCase`

### Use Cases implícitos

-   `GetTaskUseCase`
-   `ListTaskCommentsUseCase`

**Derivación:** el comentario se registra dentro de una tarea. Consultar
la tarea permite establecer el contexto. `ListTaskCommentsUseCase` se
considera una necesidad funcional inferida si los comentarios
registrados deben visualizarse posteriormente; el caso funcional
original solo exige registrarlos.

------------------------------------------------------------------------

## 13. CU-13 - Adjuntar documento

### Use Cases explícitos

-   `AttachDocumentUseCase`

### Use Cases implícitos

-   `GetProjectUseCase`
-   `GetTaskUseCase`

**Derivación:** el documento siempre está relacionado con un proyecto y
puede asociarse opcionalmente a una tarea. El sistema necesita
identificar y validar ese contexto antes de realizar la asociación.

------------------------------------------------------------------------

## 14. CU-14 - Consultar progreso del proyecto

### Use Cases explícitos

-   `GetProjectProgressUseCase`

### Use Cases implícitos

-   `GetProjectUseCase`

**Derivación:** el progreso corresponde a un proyecto concreto. El
sistema debe identificar el proyecto y validar el acceso antes de
calcular el progreso a partir de sus tareas completadas.

> El progreso es calculado; no se define un
> `UpdateProjectProgressUseCase`.

------------------------------------------------------------------------

## 15. CU-15 - Visualizar indicadores

### Use Cases explícitos

-   `GetIndicatorsUseCase`

### Use Cases implícitos

-   Ninguno definido por el momento.

**Derivación:** el documento funcional establece que el sistema
determina la información autorizada, obtiene y calcula los indicadores.
Todavía no especifica indicadores suficientemente concretos como para
justificar casos de uso adicionales.

------------------------------------------------------------------------

## 16. CU-16 - Consultar historial de actividades

### Use Cases explícitos

-   `GetActivityHistoryUseCase`

### Use Cases implícitos

-   Ninguno definido por el momento.

**Derivación:** el objetivo es consultar los registros correspondientes
a un proyecto o tarea. La validación del acceso y la obtención ordenada
de registros forman parte del propio caso de uso.

------------------------------------------------------------------------

## 17. CU-17 - Consultar proyectos asignados

### Use Cases explícitos

-   `GetAssignedProjectsUseCase`

### Use Cases implícitos

-   Ninguno definido por el momento.

**Derivación:** el objetivo ya consiste en obtener una colección de
proyectos autorizados para el usuario autenticado. La identificación del
usuario y la consulta de relaciones y permisos son pasos internos de
este caso de uso.

------------------------------------------------------------------------

# Resumen de Use Cases de Application identificados

Los mismos Application Use Cases pueden participar en más de un caso de
uso funcional. No deben duplicarse por cada CU del que deriven.

### Users

-   `CreateUserUseCase`
-   `ListUsersUseCase`
-   `ListAssignableUsersUseCase`

### Teams

-   `CreateTeamUseCase`
-   `GetTeamUseCase`
-   `ListTeamsUseCase`
-   `AddMemberToTeamUseCase`
-   `RemoveMemberFromTeamUseCase`

### Roles y Permissions

-   `ListRolesUseCase`
-   `GetRolePermissionsUseCase`
-   `ListPermissionsUseCase`
-   `AddPermissionToRoleUseCase`
-   `RemovePermissionFromRoleUseCase`

### Clients

-   `ListClientsUseCase`

### Projects

-   `CreateProjectUseCase`
-   `UpdateProjectUseCase`
-   `GetProjectUseCase`
-   `ListProjectsUseCase`
-   `GetProjectMembersUseCase`
-   `ListAvailableProjectMembersUseCase`
-   `AddMemberToProjectUseCase`
-   `RemoveMemberFromProjectUseCase`
-   `GetProjectProgressUseCase`
-   `GetAssignedProjectsUseCase`

### Tasks

-   `CreateTaskUseCase`
-   `UpdateTaskUseCase`
-   `GetTaskUseCase`
-   `ListProjectTasksUseCase`
-   `ListAssignedTasksUseCase`
-   `AssignUserToTaskUseCase`
-   `ChangeTaskStateUseCase`

### Comments

-   `CreateCommentUseCase`
-   `ListTaskCommentsUseCase`

### Documents

-   `AttachDocumentUseCase`

### Indicators

-   `GetIndicatorsUseCase`

### Activity History

-   `GetActivityHistoryUseCase`

------------------------------------------------------------------------

# Nota de trazabilidad

Los casos de uso explícitos provienen directamente de las intenciones
descritas en los casos de uso funcionales de DevFlow V1.

Los casos de uso implícitos se documentan por separado porque se derivan
de necesidades operativas de esos flujos. Su existencia definitiva debe
validarse al diseñar la API y la interfaz: por ejemplo, una pantalla
puede necesitar `ListProjectsUseCase` para seleccionar un proyecto,
mientras que una ruta que ya contiene `projectId` podría no necesitar
ejecutar ese caso de uso previamente.
