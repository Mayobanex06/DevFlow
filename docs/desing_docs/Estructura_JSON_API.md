# Estructura de JSON - API DevFlow

## Objetivo

Definir una convención consistente para los cuerpos JSON intercambiados entre frontend y backend.

Este documento describe estructura y nomenclatura. No define todavía las rutas HTTP.

---

# 1. Convenciones Generales

## Propiedades

Los JSON utilizarán `camelCase`.

```json
{
  "projectId": 15,
  "createdAt": "2026-08-27T15:30:00Z"
}
```

## Identificadores

Los IDs internos de DevFlow serán numéricos.

```json
{
  "id": 15
}
```

El ID proveniente de Neon Auth será UUID.

```json
{
  "authUserId": "19cd8795-5ec5-4d09-89ce-1716570ff710"
}
```

## Fechas

Las fechas y horas se enviarán como ISO 8601.

```json
{
  "createdAt": "2026-08-27T15:30:00Z",
  "completedAt": null
}
```

---

# 2. Respuesta Exitosa

```json
{
  "data": {
    "id": 12,
    "name": "DevFlow"
  }
}
```

`meta` será opcional.

---

# 3. Colecciones

```json
{
  "data": [
    {},
    {}
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 42
  }
}
```

---

# 4. Errores

```json
{
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "Project not found",
    "details": null
  }
}
```

- `code`: identificador estable.
- `message`: mensaje legible.
- `details`: información adicional opcional.

---

# 5. User

## Representación

```json
{
  "id": 7,
  "authUserId": "19cd8795-5ec5-4d09-89ce-1716570ff710",
  "name": "John Doe",
  "role": {
    "id": 3,
    "name": "Project Manager",
    "code": "PROJECT_MANAGER"
  },
  "createdAt": "2026-08-27T15:30:00Z"
}
```

## Creación

```json
{
  "authUserId": "19cd8795-5ec5-4d09-89ce-1716570ff710",
  "name": "John Doe",
  "roleId": 3
}
```

---

# 6. Role

```json
{
  "id": 3,
  "name": "Project Manager",
  "code": "PROJECT_MANAGER"
}
```

---

# 7. Permission

```json
{
  "id": 21,
  "name": "Create Project",
  "code": "PROJECT_CREATE",
  "description": "Allows the user to create projects"
}
```

---

# 8. Team

```json
{
  "id": 5,
  "name": "Backend Team",
  "description": "Backend development team",
  "createdAt": "2026-08-27T15:30:00Z"
}
```

Con miembros:

```json
{
  "id": 5,
  "name": "Backend Team",
  "members": [
    {
      "id": 7,
      "name": "John Doe"
    }
  ]
}
```

---

# 9. Client

```json
{
  "id": 4,
  "name": "Acme",
  "email": "projects@acme.com",
  "phone": "+1 809 555 0100",
  "createdAt": "2026-08-27T15:30:00Z"
}
```

---

# 10. Project

## Representación

```json
{
  "id": 25,
  "name": "Internal Platform",
  "description": "Centralized management platform",
  "state": 2,
  "progress": 68.5,
  "client": {
    "id": 4,
    "name": "Acme"
  },
  "createdAt": "2026-08-27T15:30:00Z",
  "updatedAt": "2026-08-27T17:00:00Z",
  "completedAt": null
}
```

## Creación

```json
{
  "name": "Internal Platform",
  "description": "Centralized management platform",
  "clientId": 4
}
```

## Actualización

```json
{
  "name": "Internal Platform V2",
  "description": "Updated project description",
  "state": 2
}
```

`progress` es calculado y no se almacena en `projects`.

---

# 11. Task

## Representación

```json
{
  "id": 81,
  "name": "Implement authentication middleware",
  "description": "Integrate Neon Auth identity resolution",
  "projectId": 25,
  "assignedUser": {
    "id": 7,
    "name": "John Doe"
  },
  "createdAt": "2026-08-27T15:30:00Z",
  "updatedAt": "2026-08-27T17:00:00Z",
  "completedAt": null
}
```

## Creación

```json
{
  "name": "Implement authentication middleware",
  "description": "Integrate Neon Auth identity resolution",
  "projectId": 25,
  "assignedUserId": 7
}
```

---

# 12. Comment

```json
{
  "id": 43,
  "content": "Authentication integration completed.",
  "author": {
    "id": 7,
    "name": "John Doe"
  },
  "taskId": 81,
  "createdAt": "2026-08-27T17:30:00Z",
  "updatedAt": "2026-08-27T17:30:00Z"
}
```

Creación:

```json
{
  "content": "Authentication integration completed."
}
```

El `userId` debe obtenerse de la identidad autenticada y no confiarse al cliente.

---

# 13. Document

```json
{
  "id": 71,
  "name": "Requirements",
  "originalName": "requirements.pdf",
  "mimeType": "application/pdf",
  "size": 482104,
  "projectId": 25,
  "taskId": 81,
  "createdAt": "2026-08-27T18:00:00Z"
}
```

`storagePath` no deberá exponerse si revela detalles internos de infraestructura.

---

# 14. ActivityHistory

```json
{
  "id": 109,
  "action": "TASK_ASSIGNED",
  "description": "Task assigned to John Doe",
  "user": {
    "id": 3,
    "name": "Project Manager"
  },
  "projectId": 25,
  "taskId": 81,
  "createdAt": "2026-08-27T18:10:00Z"
}
```

---

# 15. Relaciones N:M

Agregar usuario a equipo:

```json
{
  "userId": 7
}
```

Agregar miembro a proyecto:

```json
{
  "userId": 7
}
```

Asociar equipo a proyecto:

```json
{
  "teamId": 5
}
```

Asociar permiso a rol:

```json
{
  "permissionId": 21
}
```

---

# 16. Reglas

1. JSON usa `camelCase`; PostgreSQL mantiene `snake_case`.
2. Las FK pueden enviarse como IDs en requests.
3. Las responses pueden expandir relaciones cuando aporte contexto.
4. No confiar en IDs de usuario enviados por el cliente cuando puedan obtenerse de la sesión.
5. No exponer tokens, credenciales ni información sensible de autenticación.
6. No exponer `storagePath` si representa infraestructura interna.
7. Los errores deben usar códigos estables.
8. Valores calculados como `progress` pueden aparecer en responses aunque no sean columnas.
9. Las estructuras deben mantenerse consistentes entre módulos.
