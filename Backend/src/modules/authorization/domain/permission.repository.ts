import { PermissionCode, Permission } from "./permission.js"
import { RoleCode } from "./role.js";

export interface PermissionRepository {
    findByCode(code: PermissionCode): Promise<Permission | null>,
    findByRoleCode(roleCode: RoleCode): Promise<Permission[]>
}