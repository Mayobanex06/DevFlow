CREATE TABLE IF NOT EXISTS clients (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(32) UNIQUE, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS roles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE
        CHECK(code IN ('ADMIN', 'DEVELOPER', 'QA', 'PROJECT_MANAGER', 'CLIENT', 'MANAGER', 'DESIGNER'))
);

CREATE TABLE IF NOT EXISTS permissions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
); 

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL, 
    description TEXT,
    state SMALLINT NOT NULL DEFAULT 1
        CHECK(state IN (0, 1, 2, 3)),  
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,

    client_id BIGINT NOT NULL,

        CONSTRAINT fk_projects_clients
            FOREIGN KEY (client_id)
            REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    auth_user_id UUID NOT NULL UNIQUE,
    role_id BIGINT NOT NULL,

        CONSTRAINT fk_users_neonauth
            FOREIGN KEY (auth_user_id)
            REFERENCES neon_auth."user"(id),

        CONSTRAINT fk_users_roles
            FOREIGN KEY (role_id)
            REFERENCES roles(id)
);


CREATE TABLE IF NOT EXISTS teams (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    description TEXT, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,  
    description TEXT, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,

    project_id BIGINT NOT NULL,
    assigned_user_id BIGINT NOT NULL,

        CONSTRAINT fk_tasks_projects
            FOREIGN KEY (project_id)
            REFERENCES projects(id),
        
        CONSTRAINT fk_tasks_users
            FOREIGN KEY (assigned_user_id)
            REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS documents (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name VARCHAR(150) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL CHECK (size >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    project_id BIGINT NOT NULL,
    task_id BIGINT,

    CONSTRAINT fk_documents_projects
        FOREIGN KEY (project_id)
        REFERENCES projects(id),

    CONSTRAINT fk_documents_tasks
        FOREIGN KEY (task_id)
        REFERENCES tasks(id)
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS comments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    task_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,

        CONSTRAINT fk_comment_tasks
            FOREIGN KEY (task_id)
            REFERENCES tasks(id),

        CONSTRAINT fk_comment_users
            FOREIGN KEY (user_id)
            REFERENCES users(id)

);

CREATE TABLE IF NOT EXISTS activity_history (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    action VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    user_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    task_id BIGINT,

        CONSTRAINT fk_activity_users
            FOREIGN KEY (user_id)
            REFERENCES users(id),
        
        CONSTRAINT fk_activity_projects
            FOREIGN KEY (project_id)
            REFERENCES projects(id),
        
        CONSTRAINT fk_activity_tasks
            FOREIGN KEY (task_id)
            REFERENCES tasks(id)
);


-- Tablas intermedias

CREATE TABLE IF NOT EXISTS roles_permissions (
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,

        CONSTRAINT pk_roles_permission
            PRIMARY KEY (role_id, permission_id),
        
        CONSTRAINT fk_roles_permission_roles
            FOREIGN KEY (role_id)
            REFERENCES roles(id),
        
        CONSTRAINT fk_roles_permission_permissions
            FOREIGN KEY (permission_id)
            REFERENCES permissions(id)
);

CREATE TABLE IF NOT EXISTS users_teams (
    user_id BIGINT NOT NULL, 
    team_id BIGINT NOT NULL, 

        CONSTRAINT pk_users_teams
            PRIMARY KEY (user_id, team_id),
        
        CONSTRAINT fk_users_teams_users
            FOREIGN KEY (user_id)
            REFERENCES users(id),

        CONSTRAINT fk_users_teams_teams
            FOREIGN KEY (team_id)
            REFERENCES teams(id)
);

CREATE TABLE IF NOT EXISTS teams_projects (
    team_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL, 

        CONSTRAINT pk_teams_projects
            PRIMARY KEY (team_id, project_id),

        CONSTRAINT fk_teams_projects_teams
            FOREIGN KEY (team_id)
            REFERENCES teams(id),

        CONSTRAINT fk_teams_projects_projects
            FOREIGN KEY (project_id)
            REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS users_projects (
    user_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,

        CONSTRAINT pk_users_projects
            PRIMARY KEY (user_id, project_id),

        CONSTRAINT fk_users_projects_users
            FOREIGN KEY (user_id)
            REFERENCES users(id),

        CONSTRAINT fk_users_projects_projects
            FOREIGN KEY (project_id)
            REFERENCES projects(id)
);

