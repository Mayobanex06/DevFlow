import { AuthUser } from "./auth-user.entity.js";

export interface AuthUserRepository {
    findById(id: string): Promise<AuthUser | null>
}