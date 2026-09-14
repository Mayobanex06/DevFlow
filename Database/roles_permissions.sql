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

-- ============================================
-- ROLE_PERMISSIONS
-- ============================================

-- ADMIN

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

    'TASK_CREATE',
    'TASK_READ',
    'TASK_UPDATE',
    'TASK_DELETE',
    'TASK_ASSIGN',
    'TASK_CHANGE_STATE',
    'TASK_CHANGE_PRIORITY',
    'TASK_CHANGE_DUE_DATE',

    'USER_CREATE',
    'USER_READ',
    'USER_UPDATE',
    'USER_DELETE',
    'USER_CHANGE_ROLE',

    'TEAM_CREATE',
    'TEAM_READ',
    'TEAM_UPDATE',
    'TEAM_DELETE',
    'TEAM_ADD_MEMBER',
    'TEAM_REMOVE_MEMBER',

    'COMMENT_CREATE',
    'COMMENT_READ',
    'COMMENT_UPDATE',
    'COMMENT_DELETE',

    'DOCUMENT_CREATE',
    'DOCUMENT_READ',
    'DOCUMENT_DELETE',

    'ACTIVITY_READ',
    'ROLE_READ',
    'PERMISSION_READ'
)
WHERE r.code = 'ADMIN'

ON CONFLICT DO NOTHING;

-- MANAGER

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

    'TASK_CREATE',
    'TASK_READ',
    'TASK_UPDATE',
    'TASK_DELETE',
    'TASK_ASSIGN',
    'TASK_CHANGE_STATE',
    'TASK_CHANGE_PRIORITY',
    'TASK_CHANGE_DUE_DATE',

    'USER_READ',

    'TEAM_CREATE',
    'TEAM_READ',
    'TEAM_UPDATE',
    'TEAM_DELETE',
    'TEAM_ADD_MEMBER',
    'TEAM_REMOVE_MEMBER',

    'COMMENT_CREATE',
    'COMMENT_READ',
    'COMMENT_UPDATE',
    'COMMENT_DELETE',

    'DOCUMENT_CREATE',
    'DOCUMENT_READ',
    'DOCUMENT_DELETE',

    'ACTIVITY_READ'
)
WHERE r.code = 'MANAGER'

ON CONFLICT DO NOTHING;

-- PROJECT MANAGER

INSERT INTO roles_permissions (role_id, permission_id)

SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
    'PROJECT_CREATE',
    'PROJECT_READ',
    'PROJECT_UPDATE',
    'PROJECT_CHANGE_STATE',
    'PROJECT_VIEW_PROGRESS',

    'TASK_CREATE',
    'TASK_READ',
    'TASK_UPDATE',
    'TASK_DELETE',
    'TASK_ASSIGN',
    'TASK_CHANGE_STATE',
    'TASK_CHANGE_PRIORITY',
    'TASK_CHANGE_DUE_DATE',

    'USER_READ',

    'TEAM_READ',
    'TEAM_ADD_MEMBER',
    'TEAM_REMOVE_MEMBER',

    'COMMENT_CREATE',
    'COMMENT_READ',
    'COMMENT_UPDATE',
    'COMMENT_DELETE',

    'DOCUMENT_CREATE',
    'DOCUMENT_READ',
    'DOCUMENT_DELETE',

    'ACTIVITY_READ'
)
WHERE r.code = 'PROJECT_MANAGER'

ON CONFLICT DO NOTHING;

-- DEVELOPER 

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

    'COMMENT_CREATE',
    'COMMENT_READ',
    'COMMENT_UPDATE',
    'COMMENT_DELETE',

    'DOCUMENT_CREATE',
    'DOCUMENT_READ',
    'DOCUMENT_DELETE'
)
WHERE r.code = 'DEVELOPER'

ON CONFLICT DO NOTHING;

-- QA 

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

    'COMMENT_CREATE',
    'COMMENT_READ',
    'COMMENT_UPDATE',
    'COMMENT_DELETE',

    'DOCUMENT_CREATE',
    'DOCUMENT_READ',
    'DOCUMENT_DELETE'
)
WHERE r.code = 'QA'

ON CONFLICT DO NOTHING;

-- DESIGNER 

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

    'COMMENT_CREATE',
    'COMMENT_READ',
    'COMMENT_UPDATE',
    'COMMENT_DELETE',

    'DOCUMENT_CREATE',
    'DOCUMENT_READ',
    'DOCUMENT_DELETE'
)
WHERE r.code = 'DESIGNER'

ON CONFLICT DO NOTHING;

-- CLIENT 

INSERT INTO roles_permissions (role_id, permission_id)

SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
    'PROJECT_READ',
    'PROJECT_VIEW_PROGRESS',

    'COMMENT_CREATE',
    'COMMENT_READ',
    'COMMENT_UPDATE',
    'COMMENT_DELETE',

    'DOCUMENT_READ'
)
WHERE r.code = 'CLIENT'

ON CONFLICT DO NOTHING;