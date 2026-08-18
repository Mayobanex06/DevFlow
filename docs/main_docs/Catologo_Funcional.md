# Catálogo Funcional DevFlow

## Objetivo

Este documento identifica las principales capacidades funcionales de DevFlow,
indicando el actor responsable y el requisito funcional del cual se deriva cada
una.


## 1. Gestión de Usuarios, Equipos y Permisos

| Código | Capacidad | Actor principal | RF relacionado |
|--------|-----------|-----------------|----------------|
| CF-01 | Registrar usuarios | Administrador | RF-01 |
| CF-02 | Gestionar equipos de trabajo | Administrador | RF-02 |
| CF-03 | Gestionar miembros de equipos | Administrador | RF-02 |
| CF-04 | Asignar roles a usuarios | Administrador | RF-03 |
| CF-05 | Administrar permisos de roles | Administrador | RF-04 |


## 2. Gestión de Proyectos

| Código | Capacidad | Actor principal | RF relacionado |
|--------|-----------|-----------------|----------------|
| CF-06 | Crear proyecto | Project Manager | RF-05 |
| CF-07 | Modificar proyecto | Project Manager | RF-06 |
| CF-08 | Consultar proyecto | Usuario autorizado | RF-07 |


## 3. Gestión de Tareas

| Código | Capacidad | Actor principal | RF relacionado |
|--------|-----------|-----------------|----------------|
| CF-09 | Crear tarea | Project Manager | RF-08 |
| CF-10 | Modificar tarea | Project Manager | RF-09 |
| CF-11 | Asignar responsable | Project Manager | RF-10 |
| CF-12 | Definir prioridad de tarea | Project Manager | RF-11 |
| CF-13 | Definir fecha límite | Project Manager | RF-12 |
| CF-14 | Actualizar estado de tarea | Colaborador | RF-13 |
| CF-15 | Consultar tareas | Miembro del proyecto | RF-14 |


## 4. Comunicación y Documentación

| Código | Capacidad | Actor principal | RF relacionado |
|--------|-----------|-----------------|----------------|
| CF-16 | Registrar comentarios | Miembro autorizado | RF-15 |
| CF-17 | Adjuntar archivos | Miembro autorizado | RF-16 |
| CF-18 | Consultar documentación | Usuario autorizado | RF-17 |


## 5. Seguimiento de Proyectos

| Código | Capacidad | Actor principal | RF relacionado |
|--------|-----------|-----------------|----------------|
| CF-19 | Consultar progreso de proyectos administrados | Project Manager | RF-18 |
| CF-20 | Supervisar estado de proyectos | Director / Gerente | RF-19 |
| CF-21 | Visualizar indicadores generales | Director / Gerente | RF-20 |
| CF-22 | Consultar indicadores de trabajo | Colaborador | RF-21 |
| CF-23 | Consultar progreso autorizado | Cliente | RF-22 |


## 6. Historial y Trazabilidad

| Código | Capacidad | Actor principal | RF relacionado |
|--------|-----------|-----------------|----------------|
| CF-24 | Registrar actividades relevantes | Sistema | RF-23 |
| CF-25 | Consultar historial de actividades | Usuario autorizado | RF-24 |