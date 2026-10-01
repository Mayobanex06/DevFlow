import { db } from "../../../shared/database/postgres.js";
import { Task } from "../domain/task.entity.js";
import { ProjectTaskStats, TaskRepository } from "../domain/task.repository.js";

interface TaskRow {
    id: number;
    name: string;
    description: string | null;
    created_at: Date;
    updated_at: Date;
    completed_at: Date | null;
    project_id: number;
    assigned_user_id: number;
}

export class PostgresTaskRepository implements TaskRepository {
    
    private toDomain(row: TaskRow): Task {
            return Task.restore({
                id: row.id,
                name: row.name,
                description: row.description,
                createdAt: row.created_at,
                updateAt: row.updated_at,
                completedAt: row.completed_at,
                projectId: row.project_id,
                assignedUserId: row.assigned_user_id
            })
        }

    async findById(id: number): Promise<Task | null> {

        const result = await db.query(`
            SELECT *
            FROM tasks
            WHERE id = $1
            `,
            [
                id
            ]
        )

        if(result.rows.length === 0) {
            return null
        }

        return this.toDomain(result.rows[0])
    }

    async findByAssignedUserId(userId: number): Promise<Task[]> {
        
        const result = await db.query(`
            SELECT *
            FROM tasks
            WHERE assigned_user_id = $1
            `, 
            [
                userId
            ]
        )

        return result.rows.map((row: TaskRow) => this.toDomain(row))
    }

    async findAll(): Promise<Task[]> {

        const result = await db.query(`
            SELECT *
            FROM tasks
            `)

        return result.rows.map((row: TaskRow) => this.toDomain(row))
    }

    async findByProjectManagerId(projectManagerId: number): Promise<Task[]> {
        
        const result = await db.query(`
            SELECT t.*
            FROM tasks t

            INNER JOIN projects p
                ON p.id = t.project_id

            WHERE p.project_manager_id = $1;`,
            [
                projectManagerId
            ]
        )

        return result.rows.map((row: TaskRow) => this.toDomain(row))
    }

    async findByUserTeams(userId: number): Promise<Task[]> {
        
        const result = await db.query(`
            SELECT DISTINCT t.*
            FROM task t 

            INNER JOIN teams_projects tp
                ON t.project_id = tp.project_id
            
            INNER JOIN users_teams ut
                ON ut.team_id = tp.team_id

            WHERE ut.user_id = $1
            `, 
            [
                userId
            ]
        )

        return result.rows.map((row: TaskRow) => (this.toDomain(row)))
    }

    async findByClientId(clientId: number): Promise<Task[]> {
        
        const result = await db.query(`
            SELECT t.*
            FROM task t
            
            INNER JOIN projects p 
                ON t.project_id = p.id
            
            WHERE p.client_id = $1
            `,
            [
                clientId
            ]
        )

        return result.rows.map((row: TaskRow) => (this.toDomain(row)))
    }

    async create(task: Task): Promise<Task> {

        const result = await db.query(`
            INSERT INTO tasks (
            name, 
            description, 
            project_id, 
            assigned_user_id
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [
                task.name,
                task.description,
                task.projectId,
                task.assignedUserId
            ]
        )
        return this.toDomain(result.rows[0])
    }

    async update(task: Task): Promise<Task> {

        const result = await db.query(`
            UPDATE tasks
            SET
                name = $1,
                description = $2,
            WHERE id = $3
            RETURNING *
            `,
            [
                task.name,
                task.description,
                task.id
            ]
        )
        return this.toDomain(result.rows[0])
    }

    async complete(task: Task): Promise<void> {

        await db.query(`
            UPDATE tasks
            SET
                completed_at = $2
            WHERE id = $1
            `,
            [
                task.id,
                task.completedAt
            ]
        )
    }

    async assignTask(task: Task): Promise<void> {

        await db.query(`
            UPDATE tasks
            SET
                assigned_user_id = $1
            WHERE id = $2
            `,
            [
                task.assignedUserId,
                task.id
            ]
        )
    }

    async getProjectTaskStats(projectId: number): Promise<ProjectTaskStats> {
        
        const result = await db.query(`
        SELECT
            COUNT(*) AS total_tasks,
            COUNT(*) FILTER (
                WHERE completed_at IS NOT NULL
            ) AS completed_tasks
        FROM tasks
        WHERE project_id = $1
        `,
            [
                projectId
            ]
        )

        return {
            totalTasks: Number(result.rows[0].total_tasks),
            completedTasks: Number(result.rows[0].completed_tasks)
        }
    }
}