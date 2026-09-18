import { db } from "../../../shared/database/postgres.js";
import { Task } from "../domain/task.entity.js";
import { TaskRepository } from "../domain/task.repository.js";

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

    async findAllAssigned(userId: number): Promise<Task[]> {
        
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
                project_id = $3,
                assigned_user_id = $4
            WHERE id = $5
            RETURNING *
            `,
            [
                task.name,
                task.description,
                task.projectId,
                task.assignedUserId,
                task.id
            ]
        )
        return this.toDomain(result.rows[0])
    }

    async changeState(id: number): Promise<void> {

        await db.query(`
            UPDATE tasks
            SET
                completed_at = NOW()
            WHERE id = $1
            `,
            [
                id
            ]
        )
    }

    async assignTask(taskId: number, userId: number): Promise<void> {

        await db.query(`
            UPDATE tasks
            SET
                assigned_user_id = $1
            WHERE id = $2
            `,
            [
                userId,
                taskId
            ]
        )
    }
}