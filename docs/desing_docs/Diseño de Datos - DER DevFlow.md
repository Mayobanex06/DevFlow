# Diseño de Datos / DER DevFlow

Las relaciones entre entidades se especifican de forma general al final del documento para evitar ambigüedades de cardinalidad.

---

# 1. Project

## Identificador

- id

## Atributos

- name
- description
- state
- created_at
- updated_at
- completed_at

## Restricciones

- `name` debe ser obligatorio.
- `progress` será un valor calculado a partir del estado de las tareas asociadas al proyecto y no se almacenará directamente.
- `completed_at` solo aplica si el proyecto alcanza un estado final.

## Estados

Estados disponibles para `state`:

- `0` - Cancelled
- `1` - Pending
- `2` - In Progress
- `3` - Completed

---

# 2. User

## Identificador

- id

## Atributos

- auth_user_id
- name
- created_at

## Restricciones

- `auth_user_id` debe ser obligatorio y único.
- `auth_user_id` utiliza UUID y referencia al usuario de Neon Auth.
- `name` debe ser obligatorio.

---

# 3. Role

## Identificador

- id

## Atributos

- name
- code

## Restricciones

- `name` debe ser obligatorio.
- `code` debe ser único y obligatorio.

## Códigos

- `ADMIN`
- `DEVELOPER`
- `QA`
- `PROJECT_MANAGER`
- `CLIENT`
- `MANAGER`
- `DESIGNER`

---

# 4. Team

## Identificador

- id

## Atributos

- name
- description
- created_at

## Restricciones

- `name` debe ser obligatorio.

---

# 5. Task

## Identificador

- id

## Atributos

- name
- description
- created_at
- updated_at
- completed_at

## Restricciones

- `name` debe ser obligatorio.

---

# 6. Client

## Identificador

- id

## Atributos

- name
- email
- phone
- created_at

## Restricciones

- `name` debe ser obligatorio.
- `email` debe ser obligatorio.
- `phone` es opcional.

---

# 7. Document / Archive

## Identificador

- id

## Atributos

- name
- original_name
- storage_path
- mime_type
- size
- created_at

## Restricciones

- `name` debe ser obligatorio.
- `original_name` debe ser obligatorio.
- `storage_path` debe ser obligatorio.
- `mime_type` debe ser obligatorio.
- `size` debe ser obligatorio.

---

# 8. Comment

## Identificador

- id

## Atributos

- content
- created_at
- updated_at

## Restricciones

- `content` debe ser obligatorio.
- Todo comentario debe estar asociado a un usuario.
- Todo comentario debe estar asociado a una tarea.

---CREATE TABLE IF NOT EXISTS permission (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE
        CHECK(code IN ('ADMIN', 'DEVELOPER', 'QA', 'PROJECT MANAGER', 'CLIENT', 'MANAGER', 'DESIGNER'))
    description TEXT
); 

# 9. ActivityHistory

## Identificador

- id

## Atributos

- action
- description
- created_at

## Restricciones

- `action` debe ser obligatorio.
- `created_at` debe ser obligatorio.

## Observaciones

- Una actividad debe identificar al usuario que realizó la acción.
- Toda actividad pertenece a un proyecto.
- Una actividad puede estar asociada adicionalmente a una tarea.
- Los registros de actividad no deben modificarse después de ser creados.

---

# 10. Permission

## Identificador

- id

## Atributos

- name
- code
- description

## Restricciones

- `name` debe ser obligatorio.
- `code` debe ser obligatorio y único.

---

# Relaciones Generales

## Neon Auth User — User

**Cardinalidad:** `1:1`

- Cada usuario de DevFlow corresponde a una única identidad de Neon Auth.
- Cada identidad de Neon Auth utilizada por DevFlow corresponde a un único usuario interno.

### Implementación

`users.auth_user_id` referencia `neon_auth."user".id`.

---

## Role — User

**Cardinalidad:** `1:N`

- Un rol puede estar asignado a muchos usuarios.
- Cada usuario posee un único rol.

### Implementación

`users.role_id` referencia `roles.id`.

---

## Role — Permission

**Cardinalidad:** `N:M`

- Un rol puede contener múltiples permisos.
- Un permiso puede pertenecer a múltiples roles.

### Tabla intermedia

`role_permissions`

- role_id
- permission_id

---

## User — Team

**Cardinalidad:** `N:M`

- Un usuario puede pertenecer a múltiples equipos.
- Un equipo puede contener múltiples usuarios.

### Tabla intermedia

`team_members`

- user_id
- team_id

---

## Team — Project

**Cardinalidad:** `N:M`

- Un equipo puede participar en múltiples proyectos.
- Un proyecto puede contar con múltiples equipos.

### Tabla intermedia

`project_teams`

- project_id
- team_id

---

## Client — Project

**Cardinalidad:** `1:N`

- Un cliente puede tener múltiples proyectos.
- Cada proyecto pertenece a un único cliente.

### Implementación

`projects.client_id` referencia `clients.id`.

---

## User — Project

**Cardinalidad:** `N:M`

- Un usuario puede estar relacionado con múltiples proyectos.
- Un proyecto puede tener múltiples usuarios relacionados.

Esta relación permite representar participación, administración, supervisión o acceso directo a un proyecto independientemente de la pertenencia a un equipo.

### Tabla intermedia

`project_members`

- project_id
- user_id

---

## Project — Task

**Cardinalidad:** `1:N`

- Un proyecto puede contener múltiples tareas.
- Cada tarea pertenece a un único proyecto.

### Implementación

`tasks.project_id` referencia `projects.id`.

---

## User — Task

**Cardinalidad:** `1:N`

- Un usuario puede ser responsable de múltiples tareas.
- Cada tarea tiene un único responsable.

### Implementación

`tasks.assigned_user_id` referencia `users.id`.

---

## Task — Comment

**Cardinalidad:** `1:N`

- Una tarea puede tener múltiples comentarios.
- Cada comentario pertenece a una única tarea.

### Implementación

`comments.task_id` referencia `tasks.id`.

---

## User — Comment

**Cardinalidad:** `1:N`

- Un usuario puede crear múltiples comentarios.
- Cada comentario tiene un único autor.

### Implementación

`comments.user_id` referencia `users.id`.

---

## Project — Document

**Cardinalidad:** `1:N`

- Un proyecto puede contener múltiples documentos.
- Cada documento pertenece a un único proyecto.

### Implementación

`documents.project_id` referencia `projects.id`.

---

## Task — Document

**Cardinalidad:** `1:N`

- Una tarea puede contener múltiples documentos.
- Un documento puede estar asociado a una única tarea.
- La asociación con una tarea es opcional.

### Implementación

`documents.task_id` referencia `tasks.id` y permite `NULL`.

---

## User — ActivityHistory

**Cardinalidad:** `1:N`

- Un usuario puede generar múltiples registros de actividad.
- Cada registro identifica a un único usuario.

### Implementación

`activity_history.user_id` referencia `users.id`.

---

## Project — ActivityHistory

**Cardinalidad:** `1:N`

- Un proyecto puede contener múltiples registros de actividad.
- Cada registro pertenece a un único proyecto.

### Implementación

`activity_history.project_id` referencia `projects.id`.

---

## Task — ActivityHistory

**Cardinalidad:** `1:N`

- Una tarea puede generar múltiples registros de actividad.
- Una actividad puede estar relacionada con una única tarea.
- La relación con una tarea es opcional.

### Implementación

`activity_history.task_id` referencia `tasks.id` y permite `NULL`.

---

# Resumen de Relaciones

| Entidad A | Relación | Entidad B |
|---|:---:|---|
| Neon Auth User | 1:1 | User |
| Role | 1:N | User |
| Role | N:M | Permission |
| User | N:M | Team |
| Team | N:M | Project |
| Client | 1:N | Project |
| User | N:M | Project |
| Project | 1:N | Task |
| User | 1:N | Task |
| Task | 1:N | Comment |
| User | 1:N | Comment |
| Project | 1:N | Document |
| Task | 1:N | Document |
| User | 1:N | ActivityHistory |
| Project | 1:N | ActivityHistory |
| Task | 1:N | ActivityHistory |

---

# Tablas Intermedias

Las relaciones `N:M` requieren las siguientes tablas:

- `role_permissions`
- `team_members`
- `project_teams`
- `project_members`

---

# Regla de Implementación

- `1:N` → la llave foránea se coloca en el lado `N`.
- `1:1` → llave foránea acompañada de `UNIQUE`.
- `N:M` → tabla intermedia con las llaves foráneas de ambas entidades.