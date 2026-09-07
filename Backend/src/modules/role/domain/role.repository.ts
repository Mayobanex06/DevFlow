import { Role } from "./role.entity.js";

export interface RoleRepository {
    findId(id: number): Promise<Role | null>
}