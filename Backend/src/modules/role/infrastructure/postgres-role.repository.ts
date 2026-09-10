import { db } from "../../../shared/database/postgres.js"
import { CodeRole, Role } from "../domain/role.entity.js"
import { RoleRepository } from "../domain/role.repository.js"

interface RoleRow {
    id: number,
    name: string,
    code: CodeRole
}

export class PostgresRoleRepository implements RoleRepository {
    private toDomain(row: RoleRow): Role {
        return Role.restore({
            id: Number(row.id),
            name: row.name,
            code: row.code
        })
    }

    async findById(id: number): Promise<Role> {

        const result = await db.query(`
            SELECT *
            FROM roles
            WHERE id = $1
            `, 
            [
               id 
            ]
        )

        if(result.rows.length === 0){
            throw new Error("Role not found")
        }

        return this.toDomain(result.rows[0])
    }
}