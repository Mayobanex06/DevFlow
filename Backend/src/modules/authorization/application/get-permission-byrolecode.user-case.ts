import { RoleCode } from "../domain/role.js";
import { PermissionRepository} from "../domain/permission.repository.js"
import { Permission } from "../domain/permission.js";

interface GetPermissionByRoleCodeInput {
    roleCode: RoleCode
}

export class GetPermissionByRoleCodeUseCase {
    constructor(
        private permissionRepository: PermissionRepository
    ) {}

    async execute(input: GetPermissionByRoleCodeInput): Promise<Permission[]>{
        return this.permissionRepository.findByRoleCode(input.roleCode)
    }
}