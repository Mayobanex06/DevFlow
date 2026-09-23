import { Activity } from "./activities.entity.js";

export interface ActivityRepository {
    create(activity: Activity): Promise<Activity>
    findByProjectId(projectId: number): Promise<Activity[]>
}