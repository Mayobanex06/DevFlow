import { AuthUser } from "../domain/auth-user.entity.js";
import { AuthUserRepository } from "../domain/auth-user.repository.js";
import { db } from "../../../shared/database/postgres.js"
 
interface AuthUserRows {
    id: string,
    email: string
}

export class PostgresAuthUserRepository implements AuthUserRepository {
    private toDomain(row: AuthUserRows): AuthUser {
        return new AuthUser({
            id: row.id,
            email: row.email
        })
    }

    async findById(id: string): Promise<AuthUser | null> {
        const result = await db.query(`
            SELECT *
            FROM neon_auth."user"
            WHERE id = $1
        `, [
            id
           ]
        )

        if (result.rows.length === 0){
            return null
        }

        return this.toDomain(result.rows[0])
    }

}