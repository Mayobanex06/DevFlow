import { Activity } from "./activities.entity.js";

export interface ActivityRepository {
    create(activity: Activity): Promise<Activity | null>
    findByProjectId(projectId: number): Promise<Activity[]>
}