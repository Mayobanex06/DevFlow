import { Activity } from "../domain/activity_history.entity.js"
import { ActivityRepository } from "../domain/activity_history.repository.js"
import { db } from "../../../shared/database/postgres.js";


interface ActivityRow{
id: number,
action: string,
description: string | null,
created_at: Date,
user_id: number,
project_id: number,
task_id: number | null
}

export class PostgresActivityRepository implements ActivityRepository{
    private toDomain(row: ActivityRow): Activity {
        return Activity.restore({
            id: Number(row.id),
            action: row.action,
            description: row.description,
            createdAt: row.created_at,
            userId: row.user_id,
            projectId: row.project_id,
            taskId: row.task_id

      })
    }

    async create(activity: Activity): Promise<Activity> {

        const result = await db.query(`
            INSERT INTO activity_history (
            action,
            description,
            user_id,
            project_id
            task_id
            )
            VALUES ($1, $2, $3, $4 , $5)
            RETURNING *
            `,
            [
                activity.action,
                activity.description,
                activity.userId,
                activity.taskId,
                activity.projectId 
            ]
        )
    }
}