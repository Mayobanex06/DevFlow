import { UserRepository } from "../domain/user.repository.js";
import { User } from "../domain/user.entity.js";
import { db } from "../../../shared/database/postgres.js";

interface UserRows {
    id: number,
    auth_user_id: string,
    name: string,
    created_at: Date,
    role_id: number
}

export class PostgresUserRepository implements UserRepository {
    private toDomain(row: UserRows): User {
        return User.restore({
            id: Number(row.id),
            authUserId: row.auth_user_id,
            name: row.name,
            createdAt: row.created_at,
            roleId: Number(row.role_id)
        })
    }

    async findById(id: number): Promise<User | null> {
        const result = await db.query(`
            SELECT *
            FROM users
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

    async findAll(): Promise<User[]> {

        const result = await db.query(`
            SELECT *
            FROM users
        `)

        return result.rows.map((row: UserRows) => this.toDomain(row))
    }

    async findByAuthUserId(authUserId: string): Promise<User | null> {
        const result = await db.query(`
            SELECT *
            FROM users
            WHERE auth_user_id = $1
        `, [
            authUserId
           ]
        )
    
        if (result.rows.length === 0){
            return null
        }
    
        return this.toDomain(result.rows[0]);
    }

    async findAllAssignableByProjectId(projectId: number): Promise<User[]> {
        
        const result = await db.query(`
            SELECT DISTINCT u.*
            FROM users u

            JOIN users_teams ut
                ON ut.user_id = u.id

            JOIN teams_projects tp
                ON tp.team_id = ut.team_id

            WHERE tp.project_id = $1;
        `, [
            projectId
           ]
        )

        return result.rows.map((row: UserRows) => this.toDomain(row))

    }

    async create(user: User): Promise<User> {

        const result = await db.query(`
            INSERT INTO users (auth_user_id, name, role_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [
            user.authUserId,
            user.name,
            user.roleId,
        ])

        return this.toDomain(result.rows[0])
    }
}