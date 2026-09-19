export enum ActivityType {
    PROJECT_CREATED = "PROJECT_CREATED",
    PROJECT_COMPLETED = "PROJECT_COMPLETED",

    TASK_CREATED = "TASK_CREATED",
    TASK_COMPLETED = "TASK_COMPLETED",

    TEAM_ADDED = "TEAM_ADDED",
    TEAM_REMOVED = "TEAM_REMOVED",

    DOCUMENT_ATTACHED = "DOCUMENT_ATTACHED",
    DOCUMENT_DELETED = "DOCUMENT_DELETED",

    COMMENT_CREATED = "COMMENT_CREATED"
}

export enum ActivityEntityType {
    PROJECT = "PROJECT",
    TASK = "TASK",
    TEAM = "TEAM",
    DOCUMENT = "DOCUMENT",
    COMMENT = "COMMENT"
}

interface ActivityProps {
    id?: number;
    type: ActivityType;
    description: string | null;
    entityType: ActivityEntityType;
    entityId: number;
    projectId: number;
    userId: number;
    createdAt?: Date;
}

interface CreateActivityProps {
    type: ActivityType;
    description: string | null;
    entityType: ActivityEntityType;
    entityId: number;
    projectId: number;
    userId: number;
}

interface RestoreActivityProps {
    id: number;
    type: ActivityType;
    description: string | null;
    entityType: ActivityEntityType;
    entityId: number;
    projectId: number;
    userId: number;
    createdAt: Date;
}

export class Activity {
    
    private constructor(
        private readonly props: ActivityProps
    ) {}
    
    static create(props: CreateActivityProps): Activity {
        return new Activity({
            ...props
        });
    }
    
    static restore(props: RestoreActivityProps): Activity {
        return new Activity({
            ...props
        });
    }

    get id(): number {
        if (this.props.id === undefined) {
            throw new Error("Activity has not been persisted");
        }

        return this.props.id;
    }

    get type(): ActivityType {
        return this.props.type;
    }

    get description(): string | null{
        return this.props.description;
    }

    get entityType(): ActivityEntityType {
        return this.props.entityType;
    }

    get entityId(): number {
        return this.props.entityId;
    }

    get projectId(): number {
        return this.props.projectId;
    }

    get userId(): number {
        return this.props.userId;
    }

    get createdAt(): Date | undefined {
        return this.props.createdAt;
    }


}