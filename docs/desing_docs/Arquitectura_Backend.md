# Arquitectura del Backend - DevFlow

## Objetivo

Definir la estructura arquitectónica del backend de DevFlow antes de comenzar la implementación.

DevFlow utilizará un **monolito modular**, organizado por módulos de negocio y capas con responsabilidades diferenciadas.

---

# 1. Estilo Arquitectónico

## Monolito modular

El backend se desplegará inicialmente como una sola aplicación, pero internamente estará dividido por módulos.

Ventajas:

- Menor complejidad operativa.
- Despliegue sencillo.
- Transacciones simples.
- Menor sobreingeniería.
- Separación clara de responsabilidades.
- Posibilidad de extraer módulos en el futuro si existe una necesidad real.

No se utilizarán microservicios en DevFlow V1.

---

# 2. Flujo General

```text
HTTP Request
     ↓
Route
     ↓
Controller
     ↓
Application / Use Case
     ↓
Domain
     ↓
Repository
     ↓
Infrastructure
     ↓
PostgreSQL / Neon
```

La autenticación debe resolverse antes de ejecutar casos de uso protegidos.

---

# 3. Application / Use Cases

## Responsabilidad

Coordinar operaciones completas de la aplicación.

Un caso de uso:

- recibe una entrada;
- obtiene entidades necesarias;
- coordina reglas;
- utiliza repositories;
- produce un resultado;
- puede registrar actividad.

No debe conocer:

- HTTP;
- Express/Fastify;
- SQL;
- detalles de Neon;
- objetos `request` o `response`.

## Ejemplos

```text
CreateProject
UpdateProject
AssignTask
CreateTeam
AddTeamMember
AddProjectMember
GetProjectProgress
CreateComment
AttachDocument
```

---

# 4. Domain

## Responsabilidad

Representar conceptos y reglas del negocio.

Conceptos principales:

- Project
- User
- Role
- Permission
- Team
- Task
- Client
- Document
- Comment
- ActivityHistory

El Domain no depende de HTTP, PostgreSQL, Neon ni frameworks web.

Las reglas propias de una entidad deben mantenerse cerca de ella y no repartirse entre controllers y SQL.

---

# 5. Repositories

## Responsabilidad

Definir contratos de persistencia requeridos por la aplicación.

Ejemplo:

```text
ProjectRepository
├── findById()
├── create()
├── update()
└── exists()
```

Estos contratos no contienen SQL.

La aplicación depende del contrato y no directamente de PostgreSQL.

---

# 6. Infrastructure

## Responsabilidad

Implementar conexiones con tecnologías externas.

Incluye:

- PostgreSQL / Neon.
- Neon Auth.
- almacenamiento de archivos.
- servicios externos futuros.

Ejemplo:

```text
ProjectRepository
        ↑
        │ implements
        │
PostgresProjectRepository
        │
        ↓
PostgreSQL
```

Aquí sí pueden existir queries SQL, drivers, query builders y SDK externos.

---

# 7. Autenticación y Autorización

## Neon Auth

Neon Auth será responsable de:

- identidad;
- autenticación;
- credenciales;
- sesiones.

DevFlow será responsable de:

- perfil interno;
- roles;
- permisos;
- acceso a proyectos;
- pertenencia a equipos.

## Flujo

```text
Request autenticado
       ↓
Neon Auth identity
       ↓
auth_user_id
       ↓
DevFlow User
       ↓
Role
       ↓
Permissions
       ↓
Use Case
```

El backend debe resolver la identidad de Neon Auth al `users.id` interno antes de ejecutar operaciones del dominio.

---

# 8. Activity History

El historial será generado por operaciones relevantes del backend.

Ejemplo:

```text
AssignTaskUseCase
       ↓
actualiza Task
       ↓
registra ActivityHistory
```

El frontend no será responsable de registrar auditoría.

---

# 9. Shared

## Responsabilidad

Contener elementos realmente compartidos por múltiples módulos.

```text
shared/
├── database/
├── errors/
├── validation/
├── logging/
└── types/
```

`shared` no debe convertirse en una carpeta genérica para código sin ubicación clara.

---

# 10. Config

## Responsabilidad

Centralizar configuración externa.

Ejemplos:

```text
DATABASE_URL
PORT
NODE_ENV
NEON_AUTH_URL
FILE_STORAGE_*
```

Los módulos no deben acceder de forma dispersa a `process.env`.

La configuración debe validarse al iniciar la aplicación.

---

# 11. Módulos

DevFlow V1 se organizará alrededor de:

```text
users
roles
permissions
teams
projects
tasks
clients
comments
documents
activity-history
```

Los módulos no son microservicios; son límites internos del backend.

---

# 12. Estructura de Carpetas Propuesta

```text
src/
├── app/
│   ├── server.ts
│   └── routes.ts
│
├── config/
│   └── env.ts
│
├── modules/
│   ├── users/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │
│   ├── roles/
│   ├── permissions/
│   ├── teams/
│   ├── projects/
│   ├── tasks/
│   ├── clients/
│   ├── comments/
│   ├── documents/
│   └── activity-history/
│
└── shared/
    ├── database/
    ├── errors/
    ├── validation/
    ├── logging/
    └── types/
```

---

# 13. Estructura Interna de un Módulo

Ejemplo `projects`:

```text
projects/
├── domain/
│   ├── project.entity.ts
│   └── project.repository.ts
│
├── application/
│   ├── create-project.use-case.ts
│   ├── update-project.use-case.ts
│   └── get-project.use-case.ts
│
├── infrastructure/
│   └── postgres-project.repository.ts
│
└── presentation/
    ├── project.controller.ts
    └── project.routes.ts
```

La estructura puede simplificarse si un módulo todavía no necesita todas las capas.

---

# 14. Dependencias Permitidas

Dirección preferida:

```text
presentation
     ↓
application
     ↓
domain

infrastructure
     ↓
domain / repository contracts
```

El Domain no importa Infrastructure.

Incorrecto:

```text
Project entity
    ↓
PostgreSQL client
```

Correcto:

```text
CreateProjectUseCase
    ↓
ProjectRepository
    ↑
PostgresProjectRepository
```

---

# 15. Base de Datos

PostgreSQL/Neon será la persistencia principal.

## Tablas principales

```text
projects
users
roles
permissions
teams
tasks
clients
documents
comments
activity_history
```

## Tablas asociativas

```text
role_permissions
team_members
project_teams
project_members
```

El backend debe respetar las relaciones definidas en el DER.

---

# 16. Transacciones

Las operaciones que modifiquen múltiples recursos relacionados deberán poder ejecutarse dentro de una transacción.

Ejemplo:

```text
Crear Project
+
Agregar Project Member
+
Registrar Activity
```

Si una parte crítica falla, el conjunto no debe quedar parcialmente aplicado.

---

# 17. Validación

## Validación de entrada

Comprueba estructura y tipos.

Ejemplo:

```text
name existe
clientId tiene formato válido
```

## Validación de negocio

Comprueba condiciones del dominio.

Ejemplo:

```text
client existe
usuario tiene permiso
project existe
```

La validación HTTP no sustituye las restricciones de PostgreSQL.

---

# 18. Manejo de Errores

Los errores internos deben convertirse a una representación consistente.

Ejemplos:

```text
ProjectNotFoundError
UserNotFoundError
ForbiddenError
ValidationError
```

La capa HTTP será responsable de convertirlos en respuestas apropiadas.

---

# 19. Principios de Diseño

1. El Domain no conoce HTTP ni PostgreSQL.
2. Los controllers no contienen lógica de negocio.
3. Los use cases coordinan operaciones.
4. Los repositories abstraen persistencia.
5. Infrastructure implementa detalles técnicos.
6. Neon Auth maneja autenticación; DevFlow maneja autorización.
7. El historial se genera desde el backend.
8. Los módulos deben tener alta cohesión.
9. Se evitarán abstracciones sin una necesidad real.
10. La arquitectura evolucionará solo cuando los requisitos lo justifiquen.

---

# 20. Estrategia Inicial de Implementación

```text
1. Config
2. Database connection
3. Neon Auth integration
4. Users
5. Roles / Permissions
6. Teams
7. Projects
8. Tasks
9. Comments
10. Documents
11. Activity History
```

No es necesario crear todas las capas y archivos de todos los módulos desde el primer día.
