import { Project, ProjectState } from "../domain/project.entity.js";
import { ProjectRepository } from "../domain/project.repository.js";
import { db } from "../../../shared/database/postgres.js";
import { Team } from "../../teams/domain/team.entity.js";

interface ProjectRow {
    id: number;
    name: string;
    description: string | null;
    state: ProjectState;
    created_at: Date;
    updated_at: Date;
    completed_at: Date | null;
    client_id: number;
    project_manager_id: number;

}

interface TeamRow {
    id: number,
    name: string,
    description: string,
    created_at: Date
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
            clientId: Number(row.client_id),
            projectManagerId: Number(row.project_manager_id)
        })
    }

    private toTeam(row: TeamRow): Team {
        return Team.restore({
            id: Number(row.id),
            name: row.name,
            description: row.description,
            createdAt: row.created_at
        })
    }

    async create(project: Project): Promise<Project> {

        const result = await db.query(`
            INSERT INTO projects (
            name,
            description,
            state,
            client_id,
            project_manager_id
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [
                project.name,
                project.description,
                project.state,
                project.clientId,
                project.projectManagerId
            ]
        )

        return this.toDomain(result.rows[0]);
    }

    
    async update(project: Project): Promise<Project> {
        
        const result = await db.query(`
            UPDATE projects
            SET
            name = $1,
            description = $2,
            client_id = $3,
            updated_at = NOW()
            WHERE id = $4
            RETURNING *;
            `,
            [
                project.name,
                project.description,
                project.clientId,
                project.id
            ]
        )
        
        return this.toDomain(result.rows[0]);
    }

    async assignProjectManager(projectId: number, projectManagerId: number): Promise<Project> {
        
        const result = await db.query(`
            UPDATE projects
            SET
            project_manager_id = $2,
            updated_at = NOW()
            WHERE id = $1
            RETURNING *;
            `,
            [
                projectId,
                projectManagerId
            ]
        )

        return this.toDomain(result.rows[0])

    }

    async changeState(id: number, state: ProjectState, completedAt: Date | null): Promise<void> {

    await db.query(`
        UPDATE projects
        SET
            state = $2,
            completed_at = $3,
            updated_at = NOW()
        WHERE id = $1
        `,  
        [
            id,
            state,
            completedAt
        ]
    );
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

    async findAll(): Promise<Project[]> {

        const result = await db.query(`
            SELECT *
            FROM projects
            `)

        return result.rows.map((row: ProjectRow) => this.toDomain(row))
    }

    async findAllTeams(projectId: number): Promise<Team[]> {
        
        const result = await db.query(`
            SELECT t.id, t.name, t.description, t.created_at
            FROM teams_projects tp
            JOIN teams t
                ON tp.team_id = t.id
            WHERE tp.project_id = $1
            `,
            [
                projectId
            ]
        )

        return result.rows.map(row => (this.toTeam(row)))
    }

    async findByProjectManagerId(projectManagerId: number): Promise<Project[]> {
        
        const result = await db.query(`
            SELECT *
            FROM projects
            WHERE project_manager_id = $1
            `,
            [
                projectManagerId
            ]
        )

        return result.rows.map(row => (this.toDomain(row)))
    }

    async findByClientId(clientId: number): Promise<Project[]> {
        const result = await db.query(`
            SELECT *
            FROM projects
            WHERE client_id = $1
            `,
            [
                clientId
            ]
        )

        return result.rows.map(row => (this.toDomain(row)))
    }

    async findByUserTeams(userId: number): Promise<Project[]> {
        
        const result = await db.query(`
            SELECT DISTINCT p.*
            FROM projects p

            INNER JOIN teams_projects tp
                ON tp.project_id = p.id

            INNER JOIN users_teams ut
                ON ut.team_id = tp.team_id

            WHERE ut.user_id = $1;
            `,
            [
                userId
            ]
        )

        return result.rows.map(row => (this.toDomain(row)))
    }

    async hasTeam(projectId: number, teamId: number): Promise<boolean> {
        
        const exists = await db.query(`
            SELECT EXISTS (
            SELECT 1
            FROM teams_projects
            WHERE project_id = $1
                AND team_id = $2
            )
            `,
            [
                projectId,
                teamId
            ]
        )

        return exists.rows[0].exists
    }

    async hasUserThroughTeam(projectId: number, userId: number): Promise<boolean> {
        
        const result = await db.query(`
            SELECT EXISTS (
                SELECT 1
                FROM users_teams ut

                INNER JOIN teams_projects tp
                    ON tp.team_id = ut.team_id

                WHERE ut.user_id = $1
                AND tp.project_id = $2
            ) AS has_access;
            `,
            [
                userId,
                projectId
            ]
        )

        return result.rows[0].has_access
    }

    async addTeam(projectId: number, teamId: number): Promise<void> {
        
        await db.query(`
            INSERT INTO teams_projects (
            project_id,
            team_id
            ) VALUES ($1, $2)
            `, 
            [
                projectId,
                teamId
            ]
        )
    }

    async removeTeam(projectId: number, teamId: number): Promise<void> {
        
        await db.query(`
            DELETE FROM teams_projects
            WHERE project_id = $1
                AND team_id = $2;
            `,
            [
                projectId,
                teamId
            ]
        )
    }
}