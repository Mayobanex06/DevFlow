import { Activity } from "./activity_history.entity.js";

export interface ActivityRepository {
    create(Activity: Activity): Promise<Activity>;
    findById(id: number): Promise<Activity |null>
    
}