import { RoleRepository } from "../domain/role.repository.js";
import { Role } from "../domain/role.js";

export class ListRolesUseCase {
    constructor(private roleRepository: RoleRepository){}

    async execute(): Promise<Role[]> {
        return this.roleRepository.findAll()
    }
}