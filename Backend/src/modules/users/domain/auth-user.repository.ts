import { AuthUser } from "./auth-user.entity.js";

export interface AuthUserRepository {
    findByid(id: string): Promise<AuthUser | null>
}