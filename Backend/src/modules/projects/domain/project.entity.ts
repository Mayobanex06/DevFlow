
export enum ProjectState {
    CANCELLED = 0,
    IN_PROGRESS = 1,
    PAUSED = 2,
    COMPLETED = 3
}

interface ProjectProps {
    id?: number,
    name: string,
    description: string | null,
    state: ProjectState,
    createdAt?: Date,
    updatedAt?: Date,
    completedAt: Date | null, 
    clientId: number,
    projectManagerId: number
}

interface CreateProjectProps {
    name: string,
    description: string | null,
    state: ProjectState,
    completedAt: Date | null,
    clientId: number,
    projectManagerId: number
}

interface RestoreProjectProps {
    id: number,
    name: string,
    description: string | null,
    state: ProjectState,
    createdAt: Date,
    updatedAt: Date,
    completedAt: Date | null, 
    clientId: number,
    projectManagerId: number
}

interface UpdateProjectDetails {
    name?: string;
    description?: string | null;
    clientId?: number;
}

export class Project {
    private constructor(private props: ProjectProps) {}

    static create(props: CreateProjectProps): Project {
        return new Project({
            ...props
        })
    }

    static restore(props: RestoreProjectProps): Project {
        return new Project({
           ...props
        })
    }

    get id(){

        if(this.props.id === undefined){
            throw new Error("Project has not been presisted")
        }

        return this.props.id
    }

    get name() {
        return this.props.name
    }

    get description() {
        return this.props.description
    }

    get state() {
        return this.props.state
    }

    get clientId(){
        return this.props.clientId
    }

    get completedAt() {
        return this.props.completedAt;
    }

    get projectManagerId() {
        return this.props.projectManagerId;
    }

    rename(data: string){
        this.props.name = data
    }

    changeDescription(data: string | null){
        this.props.description = data
    }

    changeClientId(data: number){
        this.props.clientId = data
    }

    changeState(newState: ProjectState){

        if (this.props.state === newState) {
            // TODO [ERRORS]: Replace with invalid state transition error.
            throw new Error("Project is already in the requested state");
        }

        if (this.props.state === ProjectState.CANCELLED || this.props.state === ProjectState.COMPLETED){
            // TODO [ERRORS]: Replace with invalid state transition error.
            throw new Error("Cannot change the state of a finished project");
        }

        if (this.props.state === ProjectState.PAUSED && newState === ProjectState.COMPLETED){
            // TODO [ERRORS]: Replace with invalid state transition error.
            throw new Error(
                "A paused project cannot be completed"
            );
        }

        this.props.state = newState;

        if (newState === ProjectState.COMPLETED) {
            this.props.completedAt = new Date();
        }
    }

    updateDetails(details: UpdateProjectDetails){
        
        if (details.name !== undefined){
            this.props.name = details.name
        }

        if (details.description !== undefined){
            this.props.description = details.description
        }

        if (details.clientId !== undefined){
            this.props.clientId = details.clientId
        }

    }
}