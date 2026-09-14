-- Permisos para conectarse a la DB

GRANT CONNECT ON DATABASE devflow TO devflow_dev;
GRANT CONNECT ON DATABASE devflow TO devflow_app;

-- Permisos sobre el schema

GRANT USAGE, CREATE ON SCHEMA public TO devflow_dev;
GRANT USAGE ON SCHEMA public TO devflow_app;

-- Permisos CRUD sobre tablas existentes

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO devflow_dev;

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO devflow_app;

-- Permisos sobre secuencias existentes

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO devflow_dev;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO devflow_app;

-- Permisos por defecto para futuras tablas

ALTER DEFAULT PRIVILEGES
FOR ROLE devflow_owner
IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLES
TO devflow_dev;

ALTER DEFAULT PRIVILEGES
FOR ROLE devflow_owner
IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLES
TO devflow_app;

-- Permisos por defecto para futuras secuencias

ALTER DEFAULT PRIVILEGES
FOR ROLE devflow_owner
IN SCHEMA public
GRANT USAGE, SELECT
ON SEQUENCES
TO devflow_dev;

ALTER DEFAULT PRIVILEGES
FOR ROLE devflow_owner
IN SCHEMA public
GRANT USAGE, SELECT
ON SEQUENCES
TO devflow_app;

-- Permisos Owner para la creacion de tablas 

GRANT devflow_owner TO alfonso_dev;
GRANT devflow_owner TO ramses_dev;

-- Permisos sobre Auth User 

GRANT USAGE ON SCHEMA neon_auth TO devflow_app;
GRANT SELECT ON TABLE neon_auth."user" TO devflow_app;