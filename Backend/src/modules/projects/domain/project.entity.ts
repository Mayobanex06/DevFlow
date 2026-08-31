
export type ProjectState = 0 | 1 | 2 | 3  

interface ProjectProps {
    id?: number,
    name: string,
    description: string | null,
    state: ProjectState,
    createdAt?: Date,
    updatedAt?: Date,
    completedAt: Date | null, 
    clientId: number
}

interface CreateProjectProps {
    name: string,
    description: string | null,
    state: ProjectState,
    completedAt: Date | null,
    clientId: number
}

interface RestoreProjectProps {
    id: number,
    name: string,
    description: string | null,
    state: ProjectState,
    createdAt: Date,
    updatedAt: Date,
    completedAt: Date | null, 
    clientId: number
}

export class Project {
    private constructor(private props: ProjectProps) {}

    static create(props: CreateProjectProps): Project {
        return new Project({
            name: props.name,
            description: props.description,
            state: props.state,
            completedAt: props.completedAt,
            clientId: props.clientId
        })
    }

    static restore(props: RestoreProjectProps): Project {
        return new Project({
            id: props.id,
            name: props.name,
            description: props.description,
            state: props.state,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
            completedAt: props.completedAt,
            clientId: props.clientId
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

    rename(data: string){
        this.props.name = data
    }

    changeDescription(data: string | null){
        this.props.description = data
    }

    changeClientId(data: number){
        this.props.clientId = data
    }

    complete(){
        if (this.props.state === 0){
            throw new Error("Cancelled project cannot be completed")
        }

        this.props.state = 3;
        this.props.completedAt = new Date();
    }
}