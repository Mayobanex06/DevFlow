# DevFlow — Diseño de Roles y Permisos

## 1. Objetivo

Este documento define el modelo de autorización de DevFlow para las entidades `Role` y `Permission`.

La finalidad es establecer una base clara antes de implementar código, evitando mezclar:

- autenticación;
- roles;
- permisos;
- reglas de negocio;
- ownership de recursos.

DevFlow utilizará un modelo **RBAC (Role-Based Access Control)**.

En este modelo:

```text
User
  |
  | N:1
  v
Role
  |
  | N:M
  v
Permission
```

Un usuario posee un rol.  
Un rol agrupa varios permisos.  
Los permisos representan acciones concretas que el backend puede autorizar.

---

# 2. Decisiones de arquitectura

## 2.1 Roles controlados por el sistema

Los roles son definidos por DevFlow.

Un administrador:

- puede asignar un rol existente a un usuario;
- puede consultar los roles disponibles;
- no puede crear roles;
- no puede eliminar roles;
- no puede modificar el código de un rol;
- no puede inventar nuevos roles desde la aplicación.

Por tanto, DevFlow **no tendrá casos de uso como**:

```text
CreateRole
DeleteRole
RenameRole
```

Los cambios al catálogo de roles se realizarán mediante código, migraciones o seeds controlados por el equipo de desarrollo.

---

## 2.2 Permisos controlados por el sistema

Los permisos también son definidos por DevFlow.

Un administrador no puede:

```text
crear permisos
eliminar permisos
cambiar sus códigos
inventar nuevos permisos
```

Un permiso solo debe existir si alguna operación real del backend lo utiliza.

Ejemplo:

```text
TASK_CHANGE_STATE
```

tiene significado porque existe una operación del sistema que cambia el estado de una tarea.

Un permiso como:

```text
MAKE_COFFEE
```

no tendría sentido mientras ninguna operación de DevFlow conozca o compruebe ese permiso.

---

## 2.3 La matriz Role-Permission también será controlada por el sistema

DevFlow no permitirá que un administrador altere libremente qué permisos posee cada rol.

La relación:

```text
Role <-> Permission
```

se almacenará en base de datos, pero será sembrada mediante seeds o migraciones.

Esto evita configuraciones inválidas o inseguras desde la interfaz.

---

# 3. Roles oficiales

Los roles iniciales de DevFlow son:

| Código | Nombre | Propósito |
|---|---|---|
| `ADMIN` | Administrator | Administración global de usuarios, equipos y seguridad |
| `MANAGER` | Manager | Supervisión y dirección de proyectos |
| `PROJECT_MANAGER` | Project Manager | Gestión operativa de proyectos y tareas |
| `DEVELOPER` | Developer | Desarrollo y actualización de trabajo asignado |
| `QA` | Quality Assurance | Validación y seguimiento de tareas |
| `DESIGNER` | Designer | Trabajo de diseño asociado a proyectos y tareas |
| `CLIENT` | Client | Consulta del progreso de proyectos autorizados |

Los códigos son identificadores estables.

No deben utilizarse nombres visibles como identificadores internos.

Correcto:

```ts
RoleCode.PROJECT_MANAGER
```

Evitar:

```ts
"Project Manager"
"Gerente de Proyecto"
```

porque el nombre visible puede cambiar o traducirse.

---

# 4. Catálogo inicial de permisos

Los permisos se nombrarán utilizando:

```text
RESOURCE_ACTION
```

Ejemplo:

```text
TASK_CREATE
PROJECT_READ
USER_CHANGE_ROLE
```

---

## 4.1 Project

```text
PROJECT_CREATE
PROJECT_READ
PROJECT_UPDATE
PROJECT_DELETE
PROJECT_CHANGE_STATE
PROJECT_VIEW_PROGRESS
```

### Motivo

`PROJECT_UPDATE` representa la modificación general de información del proyecto.

`PROJECT_CHANGE_STATE` se mantiene separado porque cambiar el ciclo de vida de un proyecto es una operación de negocio relevante.

`PROJECT_VIEW_PROGRESS` permite distinguir entre consultar datos básicos y consultar métricas o progreso consolidado.

---

## 4.2 Task

```text
TASK_CREATE
TASK_READ
TASK_UPDATE
TASK_DELETE
TASK_ASSIGN
TASK_CHANGE_STATE
TASK_CHANGE_PRIORITY
TASK_CHANGE_DUE_DATE
```

### Motivo

Las tareas tienen operaciones de negocio que no deberían esconderse dentro de un permiso genérico `TASK_UPDATE`.

Por ejemplo:

```text
TASK_CHANGE_STATE
TASK_ASSIGN
TASK_CHANGE_PRIORITY
```

pueden tener restricciones distintas.

---

## 4.3 User

```text
USER_CREATE
USER_READ
USER_UPDATE
USER_DELETE
USER_CHANGE_ROLE
```

### Motivo

`USER_CHANGE_ROLE` debe estar separado de `USER_UPDATE`.

Cambiar el nombre de un usuario no debe implicar poder elevar sus privilegios.

---

## 4.4 Team

```text
TEAM_CREATE
TEAM_READ
TEAM_UPDATE
TEAM_DELETE
TEAM_ADD_MEMBER
TEAM_REMOVE_MEMBER
```

### Nota de diseño

Antes de cerrar completamente la autorización de tareas debe resolverse si una tarea se asignará:

```text
a un usuario
a un equipo
o a ambos
```

Actualmente el modelo histórico de DevFlow presenta una inconsistencia:

```text
DB:
assigned_team_id

Código Task:
assignedUserId
```

Esta diferencia debe resolverse antes de implementar reglas de ownership para tareas.

---

## 4.5 Comment

```text
COMMENT_CREATE
COMMENT_READ
COMMENT_UPDATE
COMMENT_DELETE
```

### Importante

Poseer:

```text
COMMENT_UPDATE
```

no significa necesariamente poder editar cualquier comentario.

El backend deberá comprobar también reglas contextuales.

Ejemplo:

```text
permission = COMMENT_UPDATE
AND
comment.userId === currentUser.id
```

RBAC responde:

> ¿Tu rol puede realizar este tipo de operación?

La regla de dominio responde:

> ¿Puedes realizarla sobre este recurso específico?

---

## 4.6 Document

```text
DOCUMENT_CREATE
DOCUMENT_READ
DOCUMENT_DELETE
```

No se define inicialmente:

```text
DOCUMENT_UPDATE
```

porque un archivo normalmente se reemplaza o elimina.

Si posteriormente DevFlow incorpora metadatos editables, podrá reconsiderarse.

---

## 4.7 Activity

```text
ACTIVITY_READ
```

Las actividades son un historial generado por el sistema.

No deben existir permisos de usuario como:

```text
ACTIVITY_CREATE
ACTIVITY_UPDATE
ACTIVITY_DELETE
```

El historial no debería poder manipularse mediante operaciones normales de usuario.

---

## 4.8 Seguridad y catálogos

```text
ROLE_READ
PERMISSION_READ
```

Estos permisos permiten consultar los catálogos o la matriz de autorización cuando una interfaz administrativa lo requiera.

No existirán:

```text
ROLE_CREATE
ROLE_UPDATE
ROLE_DELETE

PERMISSION_CREATE
PERMISSION_UPDATE
PERMISSION_DELETE

ROLE_ASSIGN_PERMISSION
ROLE_REVOKE_PERMISSION
```

porque roles, permisos y su relación son controlados por el sistema.

---

# 5. Lista completa de permisos iniciales

```text
PROJECT_CREATE
PROJECT_READ
PROJECT_UPDATE
PROJECT_DELETE
PROJECT_CHANGE_STATE
PROJECT_VIEW_PROGRESS

TASK_CREATE
TASK_READ
TASK_UPDATE
TASK_DELETE
TASK_ASSIGN
TASK_CHANGE_STATE
TASK_CHANGE_PRIORITY
TASK_CHANGE_DUE_DATE

USER_CREATE
USER_READ
USER_UPDATE
USER_DELETE
USER_CHANGE_ROLE

TEAM_CREATE
TEAM_READ
TEAM_UPDATE
TEAM_DELETE
TEAM_ADD_MEMBER
TEAM_REMOVE_MEMBER

COMMENT_CREATE
COMMENT_READ
COMMENT_UPDATE
COMMENT_DELETE

DOCUMENT_CREATE
DOCUMENT_READ
DOCUMENT_DELETE

ACTIVITY_READ

ROLE_READ
PERMISSION_READ
```

Total inicial:

```text
35 permisos
```

---

# 6. Modelo de base de datos

## 6.1 roles

```sql
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE
);
```

El `code` identifica al rol en el backend.

Ejemplo:

```text
id: 3
name: Project Manager
code: PROJECT_MANAGER
```

---

## 6.2 permissions

```sql
CREATE TABLE permissions (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);
```

Ejemplo:

```text
id: 12
code: TASK_CHANGE_STATE
description: Allows changing the state of a task
```

---

## 6.3 role_permissions

La relación entre roles y permisos es muchos a muchos.

```sql
CREATE TABLE role_permissions (
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,

    PRIMARY KEY (role_id, permission_id),

    FOREIGN KEY (role_id)
        REFERENCES roles(id),

    FOREIGN KEY (permission_id)
        REFERENCES permissions(id)
);
```

No necesita un `id` artificial.

La combinación:

```text
role_id + permission_id
```

ya identifica de forma única la relación.

---

# 7. Relación con User

La tabla `users` mantiene:

```text
role_id
```

Por tanto:

```text
Role 1:N User
```

Un usuario posee un único rol principal.

Ejemplo:

```text
User Alfonso
    |
    v
DEVELOPER
    |
    +-- TASK_READ
    +-- TASK_UPDATE
    +-- TASK_CHANGE_STATE
    +-- COMMENT_CREATE
```

Si en el futuro DevFlow necesitara múltiples roles por usuario, este diseño tendría que revisarse.

No debe añadirse esa complejidad sin una necesidad real.

---

# 8. Entidad Role

## 8.1 Responsabilidad

`Role` representa una categoría de autorización reconocida por DevFlow.

No debe encargarse de:

- acceder a PostgreSQL;
- autenticar usuarios;
- ejecutar casos de uso;
- crear permisos dinámicamente;
- consultar HTTP;
- modificar usuarios.

---

## 8.2 RoleCode

Se recomienda un enum o unión de valores controlados.

Ejemplo conceptual:

```ts
export enum RoleCode {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    PROJECT_MANAGER = "PROJECT_MANAGER",
    DEVELOPER = "DEVELOPER",
    QA = "QA",
    DESIGNER = "DESIGNER",
    CLIENT = "CLIENT",
}
```

### Por qué

Evita strings arbitrarios como:

```ts
"admin"
"Admin"
"ADMINISTRATOR"
```

que podrían introducir inconsistencias.

---

## 8.3 Propiedades

Modelo mínimo:

```ts
interface RoleProps {
    id: number;
    name: string;
    code: RoleCode;
}
```

Dado que los roles no son creados por usuarios, probablemente `Role` se utilice principalmente mediante restauración desde persistencia.

No es necesario forzar un patrón `create()` si el dominio nunca crea roles durante la ejecución normal.

---

# 9. Entidad Permission

## 9.1 Responsabilidad

`Permission` representa una capacidad reconocida por el sistema.

Ejemplo:

```text
TASK_ASSIGN
```

---

## 9.2 PermissionCode

Se recomienda mantener los códigos en una fuente controlada.

Puede utilizarse:

```ts
export enum PermissionCode {
    PROJECT_CREATE = "PROJECT_CREATE",
    ...
}
```

o una estrategia equivalente con tipos literales.

### Ventaja

Un caso de uso podrá comprobar:

```ts
PermissionCode.TASK_CHANGE_STATE
```

en lugar de utilizar strings dispersos.

---

## 9.3 Propiedades

```ts
interface PermissionProps {
    id: number;
    code: PermissionCode;
    description: string | null;
}
```

Al igual que `Role`, normalmente será reconstruida desde persistencia.

---

# 10. Repositorios

Las entidades no deben acceder directamente a PostgreSQL.

---

## 10.1 RoleRepository

Responsabilidades razonables:

```ts
interface RoleRepository {
    findById(id: number): Promise<Role | null>;
    findByCode(code: RoleCode): Promise<Role | null>;
    findAll(): Promise<Role[]>;
}
```

No incluir:

```ts
create()
delete()
update()
```

si DevFlow no permite modificar roles durante la ejecución de la aplicación.

---

## 10.2 PermissionRepository

```ts
interface PermissionRepository {
    findByCode(code: PermissionCode): Promise<Permission | null>;
    findByRoleId(roleId: number): Promise<Permission[]>;
}
```

Podría añadirse:

```ts
findAll()
```

solo si alguna funcionalidad administrativa realmente necesita mostrar todo el catálogo.

---

# 11. Casos de uso

Como los catálogos son fijos, Role y Permission necesitarán pocos casos de uso propios.

---

## 11.1 ListRoles

Uso:

```text
ADMIN necesita seleccionar un rol al crear o modificar un usuario.
```

Flujo:

```text
Controller
   |
   v
ListRolesUseCase
   |
   v
RoleRepository.findAll()
```

---

## 11.2 ChangeUserRole

Este caso de uso pertenece conceptualmente al módulo `users`, no al módulo `role`.

Ejemplo:

```text
ChangeUserRoleUseCase
```

Responsabilidades:

1. comprobar que el usuario objetivo existe;
2. comprobar que el rol solicitado existe;
3. verificar que el actor posee `USER_CHANGE_ROLE`;
4. modificar `user.roleId`;
5. persistir el cambio.

---

## 11.3 GetRolePermissions

Puede ser útil para:

- inspección administrativa;
- debugging;
- construcción del contexto de autorización.

Flujo:

```text
roleId
  |
  v
PermissionRepository.findByRoleId(roleId)
```

---

# 12. Autorización

La autorización no debe escribirse como cadenas de condiciones por rol.

Evitar:

```ts
if (user.role.code === "ADMIN") {
    ...
}

if (user.role.code === "PROJECT_MANAGER") {
    ...
}
```

Esto acopla cada caso de uso directamente al catálogo de roles.

Preferir:

```text
User
 |
 v
Role
 |
 v
Permissions
 |
 v
Required Permission
```

Ejemplo conceptual:

```ts
authorization.require(
    currentUser,
    PermissionCode.TASK_CHANGE_STATE
);
```

---

# 13. RBAC no sustituye las reglas de negocio

Este punto es crítico.

Supongamos que un Developer posee:

```text
TASK_CHANGE_STATE
```

Eso no significa:

```text
puede cambiar cualquier tarea del sistema
```

Podría existir además una condición como:

```text
task.assignedUserId === currentUser.id
```

o:

```text
task.assignedTeamId === currentUser.teamId
```

Por tanto:

```text
AUTORIZACIÓN =
PERMISO
+
CONTEXTO DEL RECURSO
```

Ejemplo:

```text
¿Puede un Developer cambiar estados de tareas?
Sí.

¿Puede cambiar ESTA tarea?
Solo si las reglas del dominio lo permiten.
```

---

# 14. Matriz inicial de permisos por rol

Esta matriz es una propuesta inicial y debe revisarse conforme se implementen los módulos.

`X` significa que el rol posee el permiso.

## 14.1 Proyectos

| Permission | ADMIN | MANAGER | PROJECT_MANAGER | DEVELOPER | QA | DESIGNER | CLIENT |
|---|---:|---:|---:|---:|---:|---:|---:|
| PROJECT_CREATE | X | X | X |  |  |  |  |
| PROJECT_READ | X | X | X | X | X | X | X |
| PROJECT_UPDATE | X | X | X |  |  |  |  |
| PROJECT_DELETE | X | X |  |  |  |  |  |
| PROJECT_CHANGE_STATE | X | X | X |  |  |  |  |
| PROJECT_VIEW_PROGRESS | X | X | X | X | X | X | X |

---

## 14.2 Tareas

| Permission | ADMIN | MANAGER | PROJECT_MANAGER | DEVELOPER | QA | DESIGNER | CLIENT |
|---|---:|---:|---:|---:|---:|---:|---:|
| TASK_CREATE | X | X | X |  |  |  |  |
| TASK_READ | X | X | X | X | X | X |  |
| TASK_UPDATE | X | X | X | X | X | X |  |
| TASK_DELETE | X | X | X |  |  |  |  |
| TASK_ASSIGN | X | X | X |  |  |  |  |
| TASK_CHANGE_STATE | X | X | X | X | X | X |  |
| TASK_CHANGE_PRIORITY | X | X | X |  |  |  |  |
| TASK_CHANGE_DUE_DATE | X | X | X |  |  |  |  |

Nota:

Los permisos de Developer, QA y Designer siguen sujetos a ownership y alcance del proyecto.

---

## 14.3 Usuarios

| Permission | ADMIN | MANAGER | PROJECT_MANAGER | DEVELOPER | QA | DESIGNER | CLIENT |
|---|---:|---:|---:|---:|---:|---:|---:|
| USER_CREATE | X |  |  |  |  |  |  |
| USER_READ | X | X | X |  |  |  |  |
| USER_UPDATE | X |  |  |  |  |  |  |
| USER_DELETE | X |  |  |  |  |  |  |
| USER_CHANGE_ROLE | X |  |  |  |  |  |  |

---

## 14.4 Equipos

| Permission | ADMIN | MANAGER | PROJECT_MANAGER | DEVELOPER | QA | DESIGNER | CLIENT |
|---|---:|---:|---:|---:|---:|---:|---:|
| TEAM_CREATE | X | X |  |  |  |  |  |
| TEAM_READ | X | X | X | X | X | X |  |
| TEAM_UPDATE | X | X |  |  |  |  |  |
| TEAM_DELETE | X | X |  |  |  |  |  |
| TEAM_ADD_MEMBER | X | X | X |  |  |  |  |
| TEAM_REMOVE_MEMBER | X | X | X |  |  |  |  |

---

## 14.5 Comentarios

| Permission | ADMIN | MANAGER | PROJECT_MANAGER | DEVELOPER | QA | DESIGNER | CLIENT |
|---|---:|---:|---:|---:|---:|---:|---:|
| COMMENT_CREATE | X | X | X | X | X | X | X |
| COMMENT_READ | X | X | X | X | X | X | X |
| COMMENT_UPDATE | X | X | X | X | X | X | X |
| COMMENT_DELETE | X | X | X | X | X | X | X |

`COMMENT_UPDATE` y `COMMENT_DELETE` deben comprobar ownership salvo que posteriormente se defina un permiso de moderación.

---

## 14.6 Documentos

| Permission | ADMIN | MANAGER | PROJECT_MANAGER | DEVELOPER | QA | DESIGNER | CLIENT |
|---|---:|---:|---:|---:|---:|---:|---:|
| DOCUMENT_CREATE | X | X | X | X | X | X |  |
| DOCUMENT_READ | X | X | X | X | X | X | X |
| DOCUMENT_DELETE | X | X | X | X | X | X |  |

La eliminación debe comprobar ownership o reglas adicionales cuando corresponda.

---

## 14.7 Actividad y seguridad

| Permission | ADMIN | MANAGER | PROJECT_MANAGER | DEVELOPER | QA | DESIGNER | CLIENT |
|---|---:|---:|---:|---:|---:|---:|---:|
| ACTIVITY_READ | X | X | X |  |  |  |  |
| ROLE_READ | X |  |  |  |  |  |  |
| PERMISSION_READ | X |  |  |  |  |  |  |

---

# 15. Seeds

Los roles y permisos deben insertarse de forma determinista.

Ejemplo conceptual:

```text
seedRoles()
seedPermissions()
seedRolePermissions()
```

Orden recomendado:

```text
1. roles
2. permissions
3. role_permissions
```

Los seeds deben ser idempotentes.

Ejemplo PostgreSQL:

```sql
INSERT INTO roles (name, code)
VALUES ('Administrator', 'ADMIN')
ON CONFLICT (code) DO NOTHING;
```

No debe dependerse de IDs hardcodeados como:

```text
ADMIN = 1
DEVELOPER = 4
```

La aplicación debe identificar roles mediante `code`.

---

# 16. Estructura sugerida de módulos

Una opción coherente con la arquitectura actual de DevFlow:

```text
src/modules/role/
├── domain/
│   ├── role.entity.ts
│   ├── role-code.ts
│   └── role.repository.ts
│
├── application/
│   └── list-roles.use-case.ts
│
├── infrastructure/
│   └── postgres-role.repository.ts
│
└── presentation/
    └── role.controller.ts
```

Para Permission:

```text
src/modules/permission/
├── domain/
│   ├── permission.entity.ts
│   ├── permission-code.ts
│   └── permission.repository.ts
│
├── application/
│   └── get-role-permissions.use-case.ts
│
├── infrastructure/
│   └── postgres-permission.repository.ts
│
└── presentation/
    └── permission.controller.ts
```

No es obligatorio que ambos módulos tengan exactamente la misma cantidad de capas o archivos.

La estructura debe responder a casos de uso reales, no a simetría visual.

---

# 17. Qué NO debe hacer Role

Evitar métodos como:

```ts
role.createPermission()
role.deletePermission()
role.rename()
```

si esas operaciones no forman parte de las reglas reales de DevFlow.

Tampoco debería decidir por sí sola:

```ts
role.canEditProject(project)
```

si esa decisión necesita información externa sobre:

- usuario actual;
- proyecto;
- equipo;
- asignación;
- ownership.

Ese tipo de autorización pertenece a un servicio o política de autorización.

---

# 18. Qué NO debe hacer Permission

`Permission` no ejecuta acciones.

Incorrecto:

```ts
permission.changeTaskState()
```

`Permission` únicamente representa una capacidad.

La operación real sigue perteneciendo al caso de uso:

```text
ChangeTaskStateUseCase
```

El permiso únicamente determina si el actor puede intentar dicha operación.

---

# 19. Flujo esperado de una operación protegida

Ejemplo:

```text
PATCH /tasks/:id/state
```

Flujo conceptual:

```text
HTTP Request
    |
    v
Authentication
    |
    v
Current User
    |
    v
Load Role Permissions
    |
    v
Require TASK_CHANGE_STATE
    |
    v
ChangeTaskStateUseCase
    |
    +--> Load Task
    |
    +--> Validate ownership/context
    |
    +--> task.changeState(...)
    |
    +--> repository.update(...)
    |
    v
HTTP Response
```

---

# 20. Diferencia entre autenticación y autorización

## Autenticación

Responde:

```text
¿Quién eres?
```

En DevFlow esta responsabilidad corresponde principalmente a Neon Auth.

---

## Autorización

Responde:

```text
¿Qué puedes hacer?
```

DevFlow la resolverá mediante:

```text
Role
+
Permission
+
reglas contextuales
```

No deben confundirse ambos conceptos.

---

# 21. Restricciones importantes

## 21.1 No confiar en el frontend

Ocultar un botón no constituye seguridad.

Ejemplo:

```text
Frontend:
no muestra "Eliminar usuario"
```

El backend todavía debe comprobar:

```text
USER_DELETE
```

en cada operación protegida.

---

## 21.2 No utilizar IDs como significado de negocio

Incorrecto:

```ts
if (user.roleId === 1)
```

Correcto:

```ts
if (role.code === RoleCode.ADMIN)
```

o, preferiblemente:

```ts
authorization.has(PermissionCode.USER_DELETE)
```

---

## 21.3 No usar ADMIN como bypass permanente

Puede resultar tentador implementar:

```ts
if (role === ADMIN) return true;
```

Esto crea una excepción global difícil de auditar.

Preferible:

```text
ADMIN posee explícitamente los permisos correspondientes.
```

Así la autorización utiliza la misma lógica para todos los roles.

---

# 22. Orden recomendado de implementación

## Fase 1 — Dominio

1. `RoleCode`
2. `Role`
3. `PermissionCode`
4. `Permission`
5. interfaces de repositorio

---

## Fase 2 — Persistencia

1. validar tablas `roles`
2. crear `permissions`
3. crear `role_permissions`
4. implementar mappers
5. implementar repositorios PostgreSQL

---

## Fase 3 — Seeds

1. insertar roles oficiales
2. insertar permisos oficiales
3. insertar matriz Role-Permission

---

## Fase 4 — Consulta

Implementar:

```text
ListRolesUseCase
GetRolePermissionsUseCase
```

---

## Fase 5 — Autorización

Crear una abstracción central como:

```text
AuthorizationService
```

o:

```text
PermissionChecker
```

Responsabilidad:

```text
comprobar si el usuario posee un PermissionCode
```

---

## Fase 6 — Integración

Proteger progresivamente los casos de uso existentes.

Ejemplo:

```text
CreateProject
    -> PROJECT_CREATE

ChangeTaskState
    -> TASK_CHANGE_STATE

AssignTask
    -> TASK_ASSIGN

ChangeUserRole
    -> USER_CHANGE_ROLE
```

---

# 23. Decisiones pendientes

Antes de cerrar completamente el sistema de autorización deben resolverse estas cuestiones.

## 23.1 Asignación de tareas

Actualmente existe una diferencia entre:

```text
assigned_team_id
```

y:

```text
assignedUserId
```

Debe definirse si Task pertenece a:

- un usuario;
- un equipo;
- ambos.

Esta decisión afecta directamente las reglas contextuales.

---

## 23.2 Acceso del Client

Debe definirse si `CLIENT` puede:

- comentar;
- subir documentos;
- visualizar tareas;
- visualizar únicamente progreso agregado.

La matriz actual permite comentarios y lectura de documentos, pero esto debe confirmarse según los requisitos finales.

---

## 23.3 Moderación de comentarios y documentos

Debe decidirse si Project Manager o Admin pueden eliminar contenido creado por otros usuarios.

Si se necesita esta capacidad, sería preferible considerar permisos separados como:

```text
COMMENT_MODERATE
DOCUMENT_MODERATE
```

en lugar de interpretar `COMMENT_DELETE` como eliminación global.

---

# 24. Regla general para nuevos permisos

Antes de añadir un nuevo permiso deben responderse tres preguntas:

1. ¿Existe una operación real del sistema que necesite autorización independiente?
2. ¿Diferentes roles pueden necesitar respuestas distintas para esa operación?
3. ¿Separarla aporta una política de seguridad útil?

Si la respuesta es no, probablemente no sea necesario crear otro permiso.

Evitar permisos excesivamente específicos sin necesidad.

---

# 25. Resumen

DevFlow utilizará:

```text
7 roles oficiales
35 permisos iniciales
1 rol por usuario
N:M entre Role y Permission
catálogos controlados por el sistema
RBAC + reglas contextuales
```

Los usuarios no podrán crear roles ni permisos.

Los administradores podrán asignar roles existentes, pero la definición del catálogo y de la matriz Role-Permission permanecerá bajo control del sistema.

La autorización no debe depender directamente del nombre del rol.

La operación preferida es:

```text
User
 -> Role
 -> Permissions
 -> Required Permission
 -> Contextual Business Rule
 -> Use Case
```

Este diseño mantiene el modelo de seguridad explícito, auditable y extensible sin convertir los roles en lógica distribuida por todo el backend.
