import { PermissionRepository } from "../domain/permission.repository.js"
import { PermissionCode, Permission } from "../domain/permission.js"

interface GetPermissionByCodeInput {
    code: PermissionCode
}

export class GetPermissionByCodeUseCase {
    constructor(
        private permissionRepository: PermissionRepository
    ) {}

    async execute(input: GetPermissionByCodeInput): Promise<Permission | null> {
        return this.permissionRepository.findByCode(input.code)
    }
}