# Diseno de datos / DER Devflow

Las relaciones se expresan desde la perspectiva de cada entidad.

# 1. Proyect

## Identificador 

- id 

## Atributos

- name
- description 
- state 
- progress
- created_at
- updated_at
- completed_at 

## Relaciones 

- tasks : 1:N
- teams : 1:N
- documents/archives : 1:N
- client : 1:1
- activity_history : 1:N

## Restricciones

- `name` debe ser obligatorio.
- `progress` pendiente de definir si sera almacenado o calculado.
- `completed_at` solo aplica si el proyecto alcanza un estado final.

## Observaciones

- Los valores posibles de `state` aun no estan definidos.

# 2. User

## Identificador

- id

## Atributos

- name 
- email
- password_hash 
- created_at

## Relaciones 

- team : 1:N
- role : 1:1
- proyect : 1:N
- activity_history : 1:N

## Restricciones 

- `name` debe ser obligatorio.
- `email` debe ser unico y obligatorio.
- `password_hash` debe ser obligatorio.

# 3. Role

## Identificador

- id 

## Atributos 

- name
- code

## Relaciones 

- user : 1:N
- permission : 1:N

## Restricciones 

- `name` debe ser obligatorio.
- `code` debe ser unico y obligatorio.

# 4. Team

## Identificador 

- id

## Atributos

- name
- description 
- created_at

## Relaciones

- user: 1:N
- proyecto: 1:N

## Restricciones

- `name` debe ser obligatorio.

# 5. Task

## Identificador 

- id

## Atributos

- name 
- description
- created_at
- updated_at
- completed_at

## Relaciones

- proyect: N:1
- user: 1:1 (tambien podria ser 1:N)
- comment: 1:N
- documents/archive: 1:N
- activity_history: 1:1

## Restricciones

- `name` debe ser obligatorio.

# 6. Client

## Identificador

- id

## Atributos

- name
- email
- phone
- created_at

## Relaciones

proyect: 1:N

## Restricciones

- `name` debe ser obligatorio.
- `email` debe ser obligatorio y unico. 
- `phone` debe ser unico. 

# 7. Document/Archive

## Identificador

- id

## Atributos

- name
- original_name
- storage_path
- mime_type
- size
- created_at

## Relaciones

proyect: M:N
task: M:N

# 8. Comment

## Identificador

- id

## Atributos

- content
- created_at
- updated_at

## Relaciones

- user: 1:1
- task: 1:1

## Restricciones

- `content` debe ser obligatorio.
- Todo comentario debe estar asociado a un usuario.
- Todo comentario debe estar asociado a una tarea.


# 9. ActivityHistory

## Identificador

- id

## Atributos

- action
- description
- created_at

## Relaciones

- user: 1:1
- proyect: 1:1
- task: 1:1

## Restricciones

- `action` debe ser obligatorio.
- `created_at` debe ser obligatorio.

## Observaciones

- Una actividad debe identificar al usuario que realizó la acción.
- La actividad puede estar relacionada con un proyecto o una tarea dependiendo
  del contexto de la acción registrada.


# 10. Permission

## Identificador

- id

## Atributos

- name
- code
- description

## Relaciones

- role: 1:N

## Restricciones

- `name` debe ser obligatorio.
- `code` debe ser obligatorio y único.
