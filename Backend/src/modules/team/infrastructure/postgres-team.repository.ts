import { db } from "../../../shared/database/postgres.js";
import { Team } from "../domain/team.entity.js";
import { TeamRepository } from "../domain/team.repository.js";

interface TeamRow {
    id: number,
    name: string,
    description: string,
    created_at: Date
}

export class PostgresTeamRepository implements TeamRepository {

    private toDomain(row: TeamRow): Team {
        return Team.restore({
            id: Number(row.id),
            name: row.name,
            description: row.description,
            createdAt: row.created_at
        })
    }

    async findId(id: number): Promise<Team> {

        const result = await db.query(`
            SELECT *
            FROM teams
            WHERE id = $1
            `,
            [
                id
            ]
        )


        return this.toDomain(result.rows[0])
    }

}