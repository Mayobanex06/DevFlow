import { RoleCode } from "../domain/role.js";
import { PermissionRepository} from "../domain/permission.repository.js"

interface GetPermissionByRoleCodeInput {
    roleCode: RoleCode
}

export class GetPermissionByRoleCodeUseCase {
    constructor(
        private permissionRepository: PermissionRepository
    ) {}
}