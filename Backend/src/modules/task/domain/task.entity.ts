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

interface UpdateTaskDetails {
    name?: string,
    description?: string | null
}

export class Task {
    private constructor(private props: TaskProps) {}

    static restore(props: RestoreTaskProps): Task {
        return new Task({
            ...props
        });
    }

    static create(props: CreateTaskProps): Task {
        return new Task({
            ...props,
            completedAt: null
        });
    }

    get id() {
        if (this.props.id === undefined) {
            throw new Error('Task not has been persisted');
        }
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }


    get description() {
        return this.props.description;
    }

    get projectId(){
        return this.props.projectId
    }

    get assignedUserId(){
        return this.props.assignedUserId
    }

    get completedAt(){
        return this.props.completedAt
    }

    complete(){
        if (this.props.completedAt !== null && this.props.completedAt !== undefined){
            throw new Error("Task already completed")
        }
        
        this.props.completedAt = new Date()
    }

    updateDetails(details: UpdateTaskDetails){
        if (details.name !== undefined){
            this.props.name = details.name
        }

        if (details.description !== undefined){
            this.props.description = details.description
        }
    }

    assignTo(userId: number) {
        if (this.props.assignedUserId === userId) {
            // TODO [ERRORS]: Replace with appropriate conflict/domain error.
            throw new Error(
                "Task is already assigned to this user"
            )
        }

        this.props.assignedUserId = userId
    }

}
