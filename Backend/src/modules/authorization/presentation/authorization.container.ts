import { GetPermissionByCodeUseCase } from "../application/get-permission-bycode.user-case.js";
import { GetPermissionByRoleCodeUseCase } from "../application/get-permission-byrolecode.user-case.js";
import { GetByCodeRoleUseCase } from "../application/get-role-bycode.use-case.js";
import { GetRoleUseCase } from "../application/get-role.use-case.js";
import { ListRolesUseCase } from "../application/list-role.use-case.js";
import { PostgresPermissionRepository } from "../infrastructure/postgres-permission.repository.js";
import { PostgresRoleRepository } from "../infrastructure/postgres-role.repository.js";
import { AuthorizationController } from "./authorization.controller.js";

const roleRepository = new PostgresRoleRepository()
const permissionRepository = new PostgresPermissionRepository()

const getRoleUseCase = new GetRoleUseCase(roleRepository)
const getRoleByCodeUseCase = new GetByCodeRoleUseCase(roleRepository)
const listRolesUseCase = new ListRolesUseCase(roleRepository)
const getPermissionByCodeUseCase = new GetPermissionByCodeUseCase(permissionRepository)
const getPermissionByRoleCodeUseCase = new GetPermissionByRoleCodeUseCase(permissionRepository)

export const authorizationController = new AuthorizationController(
    getRoleByCodeUseCase,
    getRoleUseCase,
    listRolesUseCase,
    getPermissionByCodeUseCase,
    getPermissionByRoleCodeUseCase
)