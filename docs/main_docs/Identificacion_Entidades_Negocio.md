# Identificacion de Entidades del Negocio

## Objetivo de la fase

Identificar las "cosas" importantes del negocio, comprender que representan,como se relacionan y que informacion falta antes de disenar la base de datoso escribir codigo.

## Regla principal

### Para cada entidad intenta responder:

Que es?
Que representa dentro del negocio?
Que informacion parece tener?
Con que otras entidades se relaciona?
Que puede hacer o que le puede ocurrir?
Que informacion NO puede deducirse de la solicitud?

## Entidades identificables desde la solicitud

### Proyecto

**Definicion**

Representa un trabajo contratado por un cliente que sera desarrollado por la empresa y gestionado dentro de DevFlow.

**Puede inferirse que:**

- Tiene tareas.
- Tiene responsables.
- Tiene progreso.
- Tiene documentacion.
- Tiene historial.
- Tiene miembros.

**No puede deducirse:**

- Estados del proyecto.
- Si puede archivarse.
- Si tiene presupuesto.
- Si tiene prioridad.
- Si tiene varios Project Managers.

### Usuario 

**Definicion**

Persona que utiliza la plataforma con un rol determinado.

**Puede inferirse que:**

- Inicia sesion.
- Pertenece a un rol.
- Realiza actividades.
- Puede pertenecer a equipos.
- Puede participar en proyectos.

**No puede deducirse:**

- Datos personales.
- Metodo de autenticacion.
- Estado activo/inactivo.

### Rol 

**Definicion**

Conjunto de permisos que determina que acciones puede realizar un usuario.

**Roles mencionados**

- Administrador
- Director/Gerente
- Project Manager
- Desarrollador
- QA
- Diseñador
- Cliente

**No puede deducirse:**

- Permisos exactos.
- Si un usuario puede tener varios roles.

### Equipo 

**Definicion**

Grupo de usuarios que colaboran en uno o varios proyectos.

**Puede inferirse que:**

- Tiene miembros.
- Trabaja en proyectos.

**No puede deducirse:**

- Si un usuario pertenece a varios equipos.
- Si un equipo tiene lider.

### Tarea

**Definicion**

Unidad de trabajo asignada a uno o varios colaboradores dentro de un proyecto.

**Puede inferirse que:**

- Tiene responsable.
- Tiene prioridad.
- Tiene fecha limite.
- Tiene comentarios.
- Tiene archivos.
- Puede actualizarse.

**No puede deducirse:**

- Estados posibles.
- Si admite subtareas.
- Si puede tener varios responsables.

### Cliente 

**Definicion**

Empresa o persona que contrata proyectos y consulta unicamente informacion autorizada.

**Puede inferirse que:**

- Consulta el progreso.
- Tiene acceso limitado.

**No puede deducirse:**

- Si puede comentar.
- Si puede descargar documentos.
- Si puede aprobar entregables.

### Documento o Archivo 

**Definicion**

Archivo asociado a un proyecto o una tarea.

**Puede inferirse que:**

- Puede adjuntarse.
- Forma parte de la documentacion.

**No puede deducirse:**

- Tamaño maximo.
- Versionado.
- Tipos permitidos.

### Comentario

**Definicion**

Registro escrito utilizado para comunicar avances o informacion relevante.

**Puede inferirse que:**

- Se registra durante el trabajo.
- Forma parte del historial.

**No puede deducirse:**

- Quien puede eliminarlo.
- Si admite respuestas.

### Historial de actividades

**Definicion**

Registro cronologico de acciones realizadas dentro del sistema.

**Puede inferirse que:**

- Guarda actividades.
- Permite trazabilidad.

**No puede deducirse:**

- Que eventos registra exactamente.
- Si puede modificarse.

### Permiso 

**Definicion**

Autorizacion para ejecutar determinadas acciones dentro del sistema.

**Puede inferirse que:**

- Esta asociado a roles.

**No puede deducirse:**

- Modelo de autorizacion.
- Granularidad de permisos.

