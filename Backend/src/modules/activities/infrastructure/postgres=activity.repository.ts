import type { ActivityRepository } from '../domain/activities.repository.js';

import { Activity } from '../domain/activities.entity.js';
import { db } from '../../../shared/database/postgres.js';


interface ActivityRow {
    id: number;
    action: string;
    description: string | null;
    created_at: Date;
    user_id: number;
    project_id: number;
    task_id: number | null;
}

export class PostgresActivityRepository implements ActivityRepository {
    async findById(id: number): Promise<Activity | null> {
        const result = await db.query<ActivityRow>(`
            SELECT *
            FROM activity
            WHERE id = $1
            `, [
            id
        ]);
        const row = result.rows.at(0);
        if (!row) {
            return null;
        }
        return this.toDomain(row);
    }

    async create(activity: Activity): Promise<Activity> {
        const result = await db.query<ActivityRow>(`
            INSERT INTO activity_history (
            action,
            description,
            user_id,
            project_id
            task_id
            )
            VALUES ($1, $2, $3, $4 , $5)
            RETURNING *
            `, [
            activity.action,
            activity.description,
            activity.userId,
            activity.taskId,
            activity.projectId
        ]);

        const row = result.rows.at(0);
        if (!row) {
            throw new Error('Failed to create activity');
        }

        return this.toDomain(row);
    }

    private toDomain(row: ActivityRow): Activity {
        return Activity.restore({
            id: row.id,
            action: row.action,
            description: row.description,
            createdAt: row.created_at,
            userId: row.user_id,
            projectId: row.project_id,
            taskId: row.task_id
        });
    }
}
