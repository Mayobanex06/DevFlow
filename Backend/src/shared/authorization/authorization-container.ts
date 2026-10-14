import { PostgresPermissionRepository } from "../../modules/authorization/infrastructure/postgres-permission.repository.js";
import { PostgresRoleRepository } from "../../modules/authorization/infrastructure/postgres-role.repository.js";
import { createAuthorize } from "./authorize.js";

const roleRepository = new PostgresRoleRepository()
const permissionRepository = new PostgresPermissionRepository()

export const authorize = createAuthorize(roleRepository, permissionRepository)