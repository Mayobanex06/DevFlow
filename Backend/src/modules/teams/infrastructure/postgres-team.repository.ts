import { db } from "../../../shared/database/postgres.js";
import { User } from "../../users/domain/user.entity.js";
import { Team } from "../domain/team.entity.js";
import { TeamRepository } from "../domain/team.repository.js";


interface TeamRows {
    id: number,
    name: string,
    description: string,
    created_at: Date
}

interface UserRows {
    id: number,
    auth_user_id: string,
    name: string,
    created_at: Date,
    role_id: number
}

export class PostgresTeamRepository implements TeamRepository {

    private toDomain(row: TeamRows): Team {
        return Team.restore({
            id: Number(row.id),
            name: row.name,
            description: row.description,
            createdAt: row.created_at
        })
    }

    private toDomainUser(row: UserRows): User {
        return User.restore({
            id: row.id,
            authUserId: row.auth_user_id,
            name: row.name,
            createdAt: row.created_at,
            roleId: row.role_id
        })
    }

    async findById(id: number): Promise<Team | null> {

        const result = await db.query(`
            SELECT *
            FROM teams
            WHERE id = $1
            `,
            [
                id
            ]
        )

        if(result.rows.length === 0){
            return null
        }


        return this.toDomain(result.rows[0])
    }

    async create(team: Team): Promise<Team> {

        const result = await db.query(`
            INSERT INTO teams (
            name,
            description
            ) VALUES ($1, $2)
            RETURNING *
            `, 
            [
                team.name,
                team.description
            ]
        )

        return this.toDomain(result.rows[0])
    }

    async findAll(): Promise<Team[]> {

        const result = await db.query(`
            SELECT *
            FROM teams
        `)

        return result.rows.map((row: TeamRows) => (this.toDomain(row)))
    }

    async findAllMembers(teamId: number): Promise<User[]> {

        const result = await db.query(`
            SELECT u.id, u.auth_user_id, u.name, u.created_at, u.role_id
            FROM users_teams ut
            JOIN users u 
                ON ut.user_id = u.id
            WHERE ut.team_id = $1
            `,
            [
                teamId
            ]
        )

        return result.rows.map((row: UserRows) => (this.toDomainUser(row)))
    }

    async hasMember(teamId: number, userId: number): Promise<boolean> {
        
        const exists = await db.query(`
            SELECT EXISTS (
            SELECT 1
            FROM users_teams
            WHERE team_id = $1
                AND user_id = $2 )
            `, 
            [
                teamId,
                userId
            ]
        )

        return exists.rows[0].exists
    }

    async addMember(teamId: number, userId: number): Promise<void> {
        
        await db.query(`
            INSERT INTO users_teams ( 
            team_id, 
            user_id 
            ) VALUES ( $1, $2 )
            `,
            [
                teamId,
                userId
            ]
        )
    }

    async removeMember(teamId: number, userId: number): Promise<void> {
        
        await db.query(`
            DELETE FROM users_teams
            WHERE team_id = $1
                AND user_id = $2;
            `,
            [
                teamId,
                userId
            ]
        )

    }

}