interface TaskProps {

    id?: number;
    name: string;
    description: string | null;
    createdAt?: Date;
    updateAt?: Date;
    completedAt?: Date | null;
    projectId: number;
    assignedUserId: number;

}

interface CreateTaskProps {
    name: string;
    description: string | null;
    projectId: number;
    assignedUserId: number;
}

interface RestoreTaskProps {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updateAt: Date;
    completedAt: Date | null;
    projectId: number;
    assignedUserId: number;

}

export class Task {
    get name() {
        return this.props.name;
    }

    get id() {
        if (this.props.id === undefined) {
            throw new Error('Task not has been persisted');
        }
        return this.props.id;
    }

    get description() {
        return this.props.description;
    }

    private constructor(private props: TaskProps) { }

    static restore(props: RestoreTaskProps): Task {
        return new Task({
            id: props.id,
            name: props.name,
            description: props.description,
            createdAt: props.createdAt,
            updateAt: props.updateAt,
            completedAt: props.completedAt,
            projectId: props.projectId,
            assignedUserId: props.assignedUserId

        });
    }

    static create(props: CreateTaskProps): Task {
        return new Task({
            name: props.name,
            description: props.description,
            projectId: props.projectId,
            assignedUserId: props.assignedUserId
        });
    }

    rename(data: string) {
        this.props.name = data
    }

    changeDescription(Data: string | null) {
        this.props.description = Data
    }

    changeAssignedUserId(Data: number) {
        this.props.assignedUserId = Data
    }

}
