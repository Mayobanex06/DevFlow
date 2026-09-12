import { RoleRepository } from "../domain/role.repository.js"

interface GetRoleInput {
    id: number
}

export class GetRoleUseCase {
    constructor(
        private roleRepository: RoleRepository
    ) {}

    async execute(input: GetRoleInput) {

        return this.roleRepository.findById(input.id)
    }
}