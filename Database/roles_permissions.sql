-- ============================================
-- ROLES
-- ============================================

INSERT INTO roles (name, code)
VALUES
    ('Administrator', 'ADMIN'),
    ('Manager', 'MANAGER'),
    ('Project Manager', 'PROJECT_MANAGER'),
    ('Developer', 'DEVELOPER'),
    ('Quality Assurance', 'QA'),
    ('Designer', 'DESIGNER'),
    ('Client', 'CLIENT')
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- PERMISSIONS
-- ============================================

INSERT INTO permissions (code, description)
VALUES
    -- PROJECT
    ('PROJECT_CREATE', 'Allows creating projects'),
    ('PROJECT_READ', 'Allows viewing projects'),
    ('PROJECT_UPDATE', 'Allows updating project information'),
    ('PROJECT_DELETE', 'Allows deleting projects'),
    ('PROJECT_CHANGE_STATE', 'Allows changing project state'),
    ('PROJECT_VIEW_PROGRESS', 'Allows viewing project progress'),

    -- TASK
    ('TASK_CREATE', 'Allows creating tasks'),
    ('TASK_READ', 'Allows viewing tasks'),
    ('TASK_UPDATE', 'Allows updating task information'),
    ('TASK_DELETE', 'Allows deleting tasks'),
    ('TASK_ASSIGN', 'Allows assigning tasks'),
    ('TASK_CHANGE_STATE', 'Allows changing task state'),
    ('TASK_CHANGE_PRIORITY', 'Allows changing task priority'),
    ('TASK_CHANGE_DUE_DATE', 'Allows changing task due date'),

    -- USER
    ('USER_CREATE', 'Allows creating users'),
    ('USER_READ', 'Allows viewing users'),
    ('USER_UPDATE', 'Allows updating user information'),
    ('USER_DELETE', 'Allows deleting users'),
    ('USER_CHANGE_ROLE', 'Allows changing a user role'),

    -- TEAM
    ('TEAM_CREATE', 'Allows creating teams'),
    ('TEAM_READ', 'Allows viewing teams'),
    ('TEAM_UPDATE', 'Allows updating teams'),
    ('TEAM_DELETE', 'Allows deleting teams'),
    ('TEAM_ADD_MEMBER', 'Allows adding members to a team'),
    ('TEAM_REMOVE_MEMBER', 'Allows removing members from a team'),

    -- COMMENT
    ('COMMENT_CREATE', 'Allows creating comments'),
    ('COMMENT_READ', 'Allows viewing comments'),
    ('COMMENT_UPDATE', 'Allows updating comments'),
    ('COMMENT_DELETE', 'Allows deleting comments'),

    -- DOCUMENT
    ('DOCUMENT_CREATE', 'Allows uploading documents'),
    ('DOCUMENT_READ', 'Allows viewing documents'),
    ('DOCUMENT_DELETE', 'Allows deleting documents'),

    -- ACTIVITY
    ('ACTIVITY_READ', 'Allows viewing activity history'),

    -- AUTHORIZATION
    ('ROLE_READ', 'Allows viewing roles'),
    ('PERMISSION_READ', 'Allows viewing permissions')
ON CONFLICT (code) DO NOTHING;

-- =========================================================
-- DEVFLOW V1 - RBAC ROLE PERMISSIONS SEED
-- =========================================================

-- ---------------------------------------------------------
-- ADMIN
-- Acceso completo a todos los permisos existentes.
-- ---------------------------------------------------------

INSERT INTO roles_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.code = 'ADMIN'
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------
-- MANAGER
-- Gestión general de proyectos, tareas y equipos.
-- ---------------------------------------------------------

INSERT INTO roles_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
    'PROJECT_CREATE',
    'PROJECT_READ',
    'PROJECT_UPDATE',
    'PROJECT_DELETE',
    'PROJECT_CHANGE_STATE',
    'PROJECT_VIEW_PROGRESS',
    'PROJECT_ADD_TEAM',
    'PROJECT_REMOVE_TEAM',

    'TASK_CREATE',
    'TASK_READ',
    'TASK_UPDATE',
    'TASK_ASSIGN',
    'TASK_CHANGE_STATE',

    'TEAM_CREATE',
    'TEAM_READ',
    'TEAM_ADD_MEMBER',
    'TEAM_REMOVE_MEMBER',

    'DOCUMENT_CREATE',
    'DOCUMENT_READ',
    'DOCUMENT_DELETE',

    'USER_READ',

    'CLIENT_READ',

    'ROLE_READ',
    'PERMISSION_READ',

    'ACTIVITY_READ'
)
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------
-- PROJECT MANAGER
-- Gestión operativa de proyectos.
-- ---------------------------------------------------------

INSERT INTO roles_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
    'PROJECT_CREATE',
    'PROJECT_READ',
    'PROJECT_UPDATE',
    'PROJECT_CHANGE_STATE',
    'PROJECT_VIEW_PROGRESS',
    'PROJECT_ADD_TEAM',
    'PROJECT_REMOVE_TEAM',

    'TASK_CREATE',
    'TASK_READ',
    'TASK_UPDATE',
    'TASK_ASSIGN',
    'TASK_CHANGE_STATE',

    'TEAM_READ',
    'TEAM_ADD_MEMBER',
    'TEAM_REMOVE_MEMBER',

    'DOCUMENT_CREATE',
    'DOCUMENT_READ',
    'DOCUMENT_DELETE',

    'USER_READ',

    'CLIENT_READ',

    'ACTIVITY_READ'
)
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------
-- DEVELOPER
-- Trabajo sobre proyectos y tareas asignadas.
-- ---------------------------------------------------------

INSERT INTO roles_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
    'PROJECT_READ',
    'PROJECT_VIEW_PROGRESS',

    'TASK_READ',
    'TASK_UPDATE',
    'TASK_CHANGE_STATE',

    'TEAM_READ',

    'DOCUMENT_CREATE',
    'DOCUMENT_READ',
    'DOCUMENT_DELETE',

    'USER_READ',

    'ACTIVITY_READ'
)
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------
-- QA
-- Seguimiento, validación y creación de tareas.
-- ---------------------------------------------------------

INSERT INTO roles_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
    'PROJECT_READ',
    'PROJECT_VIEW_PROGRESS',

    'TASK_CREATE',
    'TASK_READ',
    'TASK_UPDATE',
    'TASK_CHANGE_STATE',

    'TEAM_READ',

    'DOCUMENT_CREATE',
    'DOCUMENT_READ',
    'DOCUMENT_DELETE',

    'USER_READ',

    'ACTIVITY_READ'
)
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------
-- DESIGNER
-- Trabajo sobre tareas y documentos asignados.
-- ---------------------------------------------------------

INSERT INTO roles_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
    'PROJECT_READ',
    'PROJECT_VIEW_PROGRESS',

    'TASK_READ',
    'TASK_UPDATE',
    'TASK_CHANGE_STATE',

    'TEAM_READ',

    'DOCUMENT_CREATE',
    'DOCUMENT_READ',
    'DOCUMENT_DELETE',

    'USER_READ',

    'ACTIVITY_READ'
)
ON CONFLICT DO NOTHING;


-- ---------------------------------------------------------
-- CLIENT
-- Acceso de consulta.
-- Las restricciones sobre SUS proyectos se resolverán
-- mediante autorización contextual.
-- ---------------------------------------------------------

INSERT INTO roles_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
    'PROJECT_READ',
    'PROJECT_VIEW_PROGRESS',

    'TASK_READ',

    'DOCUMENT_READ',

    'ACTIVITY_READ'
)
ON CONFLICT DO NOTHING;