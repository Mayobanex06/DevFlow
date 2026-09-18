import { Activity } from "./activities.entity.js";

export interface ActivityRepository {
    findById(id: number): Promise<Activity |null>
    
}