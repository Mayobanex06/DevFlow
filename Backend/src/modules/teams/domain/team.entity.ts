interface TeamProps {
    id?: number,
    name: string,
    description: string | null,
    createdAt?: Date
}

interface CreateTeamProps {
    name: string,
    description: string | null,
}

interface RestoreTeamProps {
    id: number,
    name: string,
    description: string | null,
    createdAt: Date
}

interface UpdateTeamDetails {
    name?: string,
    description?: string | null,
}

export class Team {
    private constructor(private props: TeamProps) {}

    static create(props: CreateTeamProps){
        return new Team({
            ...props
        })
    }

    static restore(props: RestoreTeamProps){
        return new Team({
            ...props
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

    updateDetails(details: UpdateTeamDetails){
        if (details.name !== undefined){
            const name = details.name.trim()

            if (name.length === 0) {
                // TODO [ERRORS]: Replace with domain validation error.
                throw new Error("Team name cannot be empty")
            }

            this.props.name = name
        }

        if (details.description !== undefined){
            this.props.description = details.description
        }
    }
}