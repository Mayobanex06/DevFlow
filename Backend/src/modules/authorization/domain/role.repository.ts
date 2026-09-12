import { RoleCode, Role } from "./role.js"

export interface RoleRepository {
    findById(id: number): Promise<Role | null>;
    findByCode(code: RoleCode): Promise<Role | null>;
    findAll(): Promise<Role[]>;
}


