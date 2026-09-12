import { RoleCode } from "../domain/role.js"
import { RoleRepository } from "../domain/role.repository.js"

interface GetByCodeRoleInput {
    code: string 
}

export class GetByCodeRoleUseCase {
    constructor(
        private roleRepository: RoleRepository
    ) {}

    async execute(input: GetByCodeRoleInput) {
        return this.roleRepository.findByCode(input.code as RoleCode)
    }
}




