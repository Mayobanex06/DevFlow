interface TeamProps {
    id?: number,
    name: string,
    description: string,
    createdAt?: Date
}

interface CreateTeamProps {
    name: string,
    description: string,
}

interface RestoreTeamProps {
    id: number,
    name: string,
    description: string,
    createdAt: Date
}

export class Team {
    private constructor(private props: TeamProps) {}

    static create(props: CreateTeamProps){
        return new Team({
            name: props.name,
            description: props.description
        })
    }

    static restore(props: RestoreTeamProps){
        return new Team({
            id: props.id,
            name: props.name,
            description: props.description,
            createdAt: props.createdAt
        })
    }

    get id(){

        if(this.props.id === undefined){
            throw new Error("Team not has been persisted")
        }

        return this.props.id
    }

    get name(){
        return this.props.name
    }

    get description(){
        return this.props.description
    }
}