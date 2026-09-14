import { db } from "../../../shared/database/postgres.js";
import { RoleCode, Role} from "../domain/role.js";
import { RoleRepository } from "../domain/role.repository.js";

export class PostgresRoleRepository implements RoleRepository {

    toRole(row: any): Role {
        return {
            id: row.id,
            name: row.name,
            code: row.code as RoleCode
            }
        }

    async findById(id: number): Promise<Role | null>{
        
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
            return null
        }

        const row = result.rows[0]

        return this.toRole(row)
    }

    async findByCode(code: RoleCode): Promise<Role | null>{

        const result = await db.query(`
            SELECT *
            FROM roles
            WHERE code = $1
            `,
            [
                code
            ]
        )

        if(result.rows.length === 0){
            return null
        }

        const row = result.rows[0]

        return this.toRole(row)

    }

    async findAll(): Promise<Role[]> {

        const result = await db.query(`
            SELECT *
            FROM roles
            ORDER BY id
            `
        )

        return result.rows.map(this.toRole)
    }

}