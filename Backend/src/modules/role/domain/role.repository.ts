import { Role } from "./role.entity.js";

export interface RoleRepository {
    findById(id: number): Promise<Role | null>
}