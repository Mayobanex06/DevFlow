interface UserProps {
    id?: number,
    authUserId: string,
    name: string,
    createdAt?: Date,
    roleId: number,
    clientId: number | null;
}

interface CreateUserProps {
    authUserId: string,
    name: string,
    roleId: number,
    clientId: number | null
}

interface RestoreUserProps {
    id: number,
    authUserId: string,
    name: string,
    createdAt: Date,
    roleId: number,
    clientId: number | null;
}

interface UpdateUserDetails {
    name?: string
}

export class User {
    private constructor(
        private props: UserProps
    ) {}

    static create(props: CreateUserProps){
        return new User({
            ...props,
            name: User.validateName(props.name)
        })
    }

    static restore(props: RestoreUserProps){
        return new User({
            ...props
        })
    }

    get id(){

        if(this.props.id === undefined){
            throw new Error("User has not been persisted")
        }

        return this.props.id
    }

    get authUserId(){
        return this.props.authUserId
    }

    get name(){
        return this.props.name
    }

    get roleId(){
        return this.props.roleId
    }

    get clientId() {
    return this.props.clientId;
    }

    private static validateName(name: string){
        const normalized = name.trim()

        if (normalized.length === 0){
            // TODO [ERRORS]: Replace with domain validation error.
            throw new Error("User name cannot be empty")
        }

        return normalized
    }

    updateDetails(details: UpdateUserDetails){

        if (details.name !== undefined){
            const normalized = User.validateName(details.name)
            this.props.name = normalized
        }
    }

    changeRole(rolId: number): void{
        this.props.roleId = rolId
    }

    changeClientId(clientId: number | null): void{
        this.props.clientId = clientId
    }
}