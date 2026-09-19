import { Activity } from "../domain/activities.entity.js"
import { ActivityRepository } from "../domain/activities.repository.js"
import { db } from "../../../shared/database/postgres.js";
import { ActivityType, ActivityEntityType } from "../domain/activities.entity.js";


interface ActivityRow {
    id: number;
    type: ActivityType;
    description: string | null;
    entity_type: ActivityEntityType;
    entity_id: number;
    project_id: number;
    user_id: number;
    created_at: Date;
}

export class PostgresActivityRepository implements ActivityRepository {
    private toDomain(row: ActivityRow): Activity {
        return Activity.restore({
            id: Number(row.id),
            type: row.type,
            description: row.description,
            entityType: row.entity_type,
            entityId: row.entity_id,
            projectId: row.project_id,
            userId: row.user_id,
            createdAt: row.created_at
        })
    }

    async findByProjectId(projectId: number): Promise<Activity[]> {
        
        const result = await db.query(`
            SELECT * 
            FROM activities
            WHERE project_id = $1
            ORDER BY created_at DESC
            `,
            [
                projectId
            ]
        )

        return result.rows.map(row => (this.toDomain(row)))
    }

    async create(activity: Activity): Promise<Activity> {

        const result = await db.query(`
            INSERT INTO activities (
            type,
            description,
            entity_type,
            entity_id,
            user_id,
            project_id
            )
            VALUES ($1, $2, $3, $4 , $5, $6)
            RETURNING *
            `,
            [
                activity.type,
                activity.description,
                activity.entityType,
                activity.entityId,
                activity.userId,
                activity.projectId
            ]
        )

        return this.toDomain(result.rows[0])
    }
}