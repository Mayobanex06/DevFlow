type ProjectState = 0 | 1 | 2 | 3  

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

export class Project {
    constructor(private props: ProjectProps) {}

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

    complete(){
        if (this.props.state === 0){
            throw new Error("Cancelled project cannot be completed")
        }

        this.props.state = 3;
        this.props.completedAt = new Date();
    }
}