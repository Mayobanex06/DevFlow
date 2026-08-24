# Convenciones de Código y Nomenclatura - DevFlow

## Objetivo

Definir reglas consistentes para nombrar variables, funciones, clases, archivos,
módulos, constantes, tablas y demás elementos técnicos de DevFlow.

Estas convenciones deberán mantenerse durante todo el desarrollo para facilitar
la lectura, mantenimiento y colaboración.

---

## 1. Idioma

Se utilizará **inglés** para nombres técnicos dentro del código.

Ejemplos:

```text
project
task
user
team
permission
activityHistory
```

La documentación funcional y de negocio puede mantenerse en español.

---

## 2. Variables

Las variables utilizarán `camelCase`.

### Correcto

```js
projectName
assignedUser
dueDate
taskStatus
currentUser
```

### Evitar

```js
project_name
ProjectName
nombreProyecto
x
data1
```

Los nombres deberán describir claramente qué representa la variable.

---

## 3. Booleanos

Los valores booleanos deberán utilizar prefijos que expresen una condición.

Prefijos recomendados:

```text
is
has
can
should
```

Ejemplos:

```js
isActive
hasPermission
canEditProject
shouldNotifyUser
```

Evitar nombres ambiguos como:

```js
active
permission
editable
statusFlag
```

---

## 4. Funciones y métodos

Las funciones utilizarán `camelCase` y deberán comenzar normalmente con un verbo.

Ejemplos:

```js
createProject()
updateTask()
assignUser()
calculateProgress()
getProjectById()
validatePermission()
```

Evitar:

```js
project()
taskFunction()
doStuff()
handleData()
```

El nombre debe expresar claramente la acción realizada.

---

## 5. Clases

Las clases utilizarán `PascalCase`.

Ejemplos:

```js
Project
Task
User
Team
Permission
ActivityHistory
```

Los nombres deberán representar conceptos concretos del dominio o componentes
técnicos con una responsabilidad clara.

---

## 6. Constantes

Las constantes globales o valores fijos utilizarán `UPPER_SNAKE_CASE`.

Ejemplos:

```js
MAX_FILE_SIZE
DEFAULT_PAGE_SIZE
TOKEN_EXPIRATION_TIME
```

No utilizar este formato para variables normales declaradas con `const`.

Ejemplo:

```js
const projectName = "DevFlow";
```

es correcto.

---

## 7. Archivos

Los archivos deberán seguir una convención única dentro de cada capa.

Convención recomendada:

```text
kebab-case
```

Ejemplos:

```text
project-service.js
task-controller.js
user-repository.js
permission-middleware.js
```

Para archivos que representen componentes o clases puede adoptarse `PascalCase`
si el framework elegido lo favorece, pero no deberán mezclarse estilos sin una
regla definida.

---

## 8. Carpetas

Las carpetas utilizarán `kebab-case` o nombres simples en minúsculas.

Ejemplos:

```text
projects/
tasks/
users/
auth/
activity-history/
```

Evitar:

```text
ProjectModule/
TASKS/
project_files/
```

---

## 9. Módulos

Los módulos deberán utilizar nombres basados en capacidades o conceptos del dominio.

Ejemplos:

```text
users
teams
projects
tasks
permissions
files
activity-history
```

Evitar nombres genéricos como:

```text
utils2
common-stuff
misc
helpers-all
```

---

## 10. Base de datos

Las tablas utilizarán `snake_case` y nombres consistentes.

Convención recomendada:

```text
users
projects
tasks
teams
roles
permissions
activity_history
```

Las claves primarias utilizarán:

```text
id
```

Las claves foráneas utilizarán:

```text
user_id
project_id
task_id
team_id
```

Ejemplo:

```text
tasks
-----
id
project_id
assigned_user_id
title
status
due_date
```

---

## 11. Tablas intermedias

Las relaciones muchos-a-muchos deberán utilizar nombres descriptivos formados
por las entidades relacionadas.

Ejemplos:

```text
team_members
project_members
role_permissions
```

Evitar:

```text
relation1
mapping
link_table
```

---

## 12. Campos de fecha

Los campos de fecha y hora deberán expresar claramente qué representan.

Ejemplos:

```text
created_at
updated_at
due_date
completed_at
```

Evitar:

```text
date
time
timestamp1
```

---

## 13. Identificadores

No utilizar nombres ambiguos como:

```text
id2
projectCodeThing
userNumberX
```

Utilizar nombres explícitos cuando el contexto lo requiera:

```text
projectId
userId
taskId
```

Dentro de una entidad donde el contexto ya sea evidente, simplemente `id` es suficiente.

---

## 14. API

Las rutas HTTP deberán representar recursos y utilizar sustantivos en plural.

Ejemplos:

```text
/projects
/projects/:projectId
/tasks
/tasks/:taskId
/users
/teams
```

Evitar verbos innecesarios:

```text
/createProject
/getTasks
/deleteUser
```

La acción deberá expresarse principalmente mediante el método HTTP.

Ejemplo:

```text
POST   /projects
GET    /projects/:projectId
PATCH  /projects/:projectId
DELETE /projects/:projectId
```

---

## 15. Parámetros de API

Los parámetros deberán utilizar nombres descriptivos y consistentes.

Ejemplos:

```text
projectId
taskId
userId
page
limit
status
```

Evitar:

```text
id1
value
param
thing
```

---

## 16. Eventos

Si posteriormente se utilizan eventos, sus nombres deberán describir algo que
ya ocurrió.

Ejemplos:

```text
projectCreated
taskAssigned
taskStatusChanged
fileUploaded
```

---

## 17. Manejo de errores

Los errores deberán tener nombres y mensajes específicos.

Ejemplos conceptuales:

```text
ProjectNotFoundError
UnauthorizedProjectAccessError
InvalidTaskStatusError
```

Evitar:

```text
Error1
GeneralError
SomethingWentWrong
```

---

## 18. Comentarios en código

Los comentarios deberán explicar principalmente **por qué** se hace algo y no
repetir literalmente lo que ya expresa el código.

Evitar:

```js
// incrementa count
count++;
```

Preferir comentarios cuando exista una decisión no evidente o una restricción
importante.

---

## 19. Nombres prohibidos o desaconsejados

Evitar nombres excesivamente genéricos como:

```text
data
info
item
thing
temp
value
obj
stuff
manager
helper
util
```

Estos nombres solo deberán utilizarse cuando el contexto haga su significado
completamente evidente.

---

## 20. Regla general

Todo nombre deberá responder claramente a una de estas preguntas:

- ¿Qué representa?
- ¿Qué acción realiza?
- ¿Qué condición expresa?
- ¿A qué entidad pertenece?

Si el significado de una variable, función o componente no puede entenderse
sin revisar gran parte de su implementación, el nombre deberá reconsiderarse.

---

## Ejemplo de consistencia

```js
class ProjectService {
    async getProjectById(projectId) {
        const project = await projectRepository.findById(projectId);

        if (!project) {
            throw new ProjectNotFoundError();
        }

        return project;
    }
}
```

La intención puede comprenderse únicamente leyendo los nombres:

- `ProjectService`
- `getProjectById`
- `projectId`
- `project`
- `findById`
- `ProjectNotFoundError`

Ese nivel de claridad es el objetivo de estas convenciones.
