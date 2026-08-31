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

# 2. Estructura General de Requests

Los requests no utilizarán un envelope `data`. El body contendrá directamente los datos necesarios para la operación.

```json
{
  "name": "Internal Platform",
  "description": "Centralized management platform",
  "clientId": 4
}
```

La ruta y el método HTTP ya proporcionan el contexto de la operación.

---

# 3. Respuesta Exitosa

```json
{
  "data": {
    "id": 12,
    "name": "DevFlow"
  }
}
```

`meta` será opcional y contendrá únicamente información adicional sobre la response, no propiedades del recurso.

## `data`

`data` contiene el resultado principal solicitado por el cliente. En una consulta individual será normalmente un objeto; en una colección será un array.

## `meta`

`meta` significa **metadata** o metadatos. Describe la response, la colección o el procesamiento de la solicitud.

```json
{
  "data": {
    "id": 12,
    "name": "DevFlow"
  },
  "meta": {
    "requestId": "req-8f72c1a9"
  }
}
```

`data.id` identifica un recurso de DevFlow. `meta.requestId` identifica una solicitud HTTP concreta y puede utilizarse para correlacionar la response con los logs del backend.

Una response nunca deberá contener `data` y `error` simultáneamente. No se agregarán campos como `success`, `statusCode`, `method` o `path` cuando solamente dupliquen información que ya proporciona HTTP.

---

# 4. Colecciones

```json
{
  "data": [
    {},
    {}
  ],
  "meta": {
    "requestId": "req-8f72c1a9",
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 42,
      "totalPages": 3
    }
  }
}
```

---

# 6. Errores

```json
{
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "Project not found",
    "details": null
  },
  "meta": {
    "requestId": "req-8f72c1a9"
  }
}
```

- `code`: identificador estable.
- `message`: mensaje legible.
- `details`: información adicional opcional y estructurada. Puede ser `null`. Para errores de validación puede contener una lista de campos inválidos.

Ejemplo de validación:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields",
    "details": [
      {
        "field": "name",
        "code": "REQUIRED",
        "message": "Name is required"
      }
    ]
  },
  "meta": {
    "requestId": "req-8f72c1a9"
  }
}
```

---

# 6. User

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

# 7. Role

```json
{
  "id": 3,
  "name": "Project Manager",
  "code": "PROJECT_MANAGER"
}
```

---

# 8. Permission

```json
{
  "id": 21,
  "name": "Create Project",
  "code": "PROJECT_CREATE",
  "description": "Allows the user to create projects"
}
```

---

# 9. Team

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

# 10. Client

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

# 11. Project

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

# 12. Ejemplo Completo: Colección de Projects

```json
{
  "data": [
    {
      "id": 12,
      "name": "DevFlow",
      "description": "Project management platform",
      "state": 2,
      "progress": 65.5,
      "client": {
        "id": 3,
        "name": "CoreTech"
      },
      "createdAt": "2026-08-20T14:30:00Z",
      "updatedAt": "2026-08-29T18:45:00Z",
      "completedAt": null
    }
  ],
  "meta": {
    "requestId": "req-8f72c1a9",
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 37,
      "totalPages": 2
    }
  }
}
```

---

# 13. Task

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

# 14. Comment

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

# 15. Document

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

# 16. ActivityHistory

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

# 17. Relaciones N:M

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

# 18. Reglas

1. JSON usa `camelCase`; PostgreSQL mantiene `snake_case`.
2. Las FK pueden enviarse como IDs en requests.
3. Las responses pueden expandir relaciones cuando aporte contexto.
4. No confiar en IDs de usuario enviados por el cliente cuando puedan obtenerse de la sesión.
5. No exponer tokens, credenciales ni información sensible de autenticación.
6. No exponer `storagePath` si representa infraestructura interna.
7. Los errores deben usar códigos estables.
8. Valores calculados como `progress` pueden aparecer en responses aunque no sean columnas.
9. Las estructuras deben mantenerse consistentes entre módulos.
10. Los requests usan bodies directos; no se envuelven en `data`.
11. Las responses exitosas utilizan `data`; las de error utilizan `error`.
12. Una response nunca contiene `data` y `error` simultáneamente.
13. `meta` contiene metadata de la response, no propiedades del recurso.
14. La paginación se coloca en `meta.pagination`.
15. `requestId` identifica la solicitud HTTP y puede correlacionarse con logs.
16. No agregar al JSON información redundante que ya pertenece al protocolo HTTP.
17. Las relaciones no deben expandirse arbitrariamente; cada endpoint devuelve solo el contexto necesario.
18. La representación JSON de un recurso no tiene que ser una copia exacta de su Entity o tabla PostgreSQL.
