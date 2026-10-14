import {
    ActivityEntityType,
    ActivityType
} from "./activities.entity.js";

export interface RecordActivityInput {
    type: ActivityType;
    description?: string | null;
    entityType: ActivityEntityType;
    entityId: number;
    projectId: number;
    userId: number;
}

export interface ActivityRecorder {
    record(input: RecordActivityInput): Promise<void>;
}