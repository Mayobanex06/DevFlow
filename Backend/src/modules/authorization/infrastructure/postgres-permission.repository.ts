import { db } from "../../../shared/database/postgres.js";
import { Permission, PermissionCode } from "../domain/permission.js";
import { PermissionRepository } from "../domain/permission.repository.js";
import { RoleCode } from "../domain/role.js";

export class PostgresPermissionRepository implements PermissionRepository {
    toPermission(row: any){
        return {
            id: row.id,
            code: row.code as PermissionCode,
            description: row.description 
        }
    }

    async findByCode(code: PermissionCode): Promise<Permission | null> {

        const result = await db.query(`
            SELECT *
            FROM permissions
            WHERE code = $1
            `,
            [
                code
            ]
        )

        if (result.rows.length === 0){
            return null
        }

        return this.toPermission(result.rows[0])
    }

    async findByRoleCode(roleCode: RoleCode): Promise<Permission[]> {

        const result = await db.query(`
            SELECT p.id, p.code, p.description
            FROM permissions p
            JOIN roles_permissions rp
                ON rp.permission_id = p.id
            JOIN roles r
                ON r.id = rp.role_id
            WHERE r.code = $1;
            `,
            [
                roleCode
            ]
        )

        return result.rows.map(row => this.toPermission(row))
    }
}