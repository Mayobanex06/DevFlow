import { Project, ProjectState } from "../domain/project.entity.js";
import { ProjectRepository } from "../domain/project.repository.js";
import { db } from "../../../shared/database/postgres.js";

interface ProjectRow {
    id: number;
    name: string;
    description: string | null;
    state: ProjectState;
    created_at: Date;
    updated_at: Date;
    completed_at: Date | null;
    client_id: number;
}

export class PostgresProjectRepository implements ProjectRepository {

    private toDomain(row: ProjectRow): Project {
        return Project.restore({
            id: Number(row.id),
            name: row.name,
            description: row.description,
            state: row.state,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            completedAt: row.completed_at,
            clientId: Number(row.client_id)
        })
    }

    async create(project: Project): Promise<Project> {

        const result = await db.query(`
            INSERT INTO projects (
            name,
            description,
            state,
            client_id
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [
                project.name,
                project.description,
                project.state,
                project.clientId
            ]
        )

        return this.toDomain(result.rows[0]);
    }

    async findById(id: number): Promise<Project | null> {

        const result = await db.query(`
            SELECT *
            FROM projects
            WHERE id = $1
            `,
            [
                id 
            ]
        )

        if (result.rows.length === 0){
            return null
        }

        return this.toDomain(result.rows[0]);
    }

    async update(project: Project): Promise<Project> {
        
        const result = await db.query(`
            UPDATE projects
            SET
            name = $1,
            description = $2,
            state = $3,
            completed_at = $4,
            client_id = $5,
            updated_at = NOW()
            WHERE id = $6
            RETURNING *;
            `,
            [
                project.name,
                project.description,
                project.state,
                project.completedAt,
                project.clientId,
                project.id
            ]
        )

        return this.toDomain(result.rows[0]);
    }
}