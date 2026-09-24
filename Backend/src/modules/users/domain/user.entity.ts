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

export class User {
    private constructor(
        private props: UserProps
    ) {}

    static create(props: CreateUserProps){
        return new User({
            ...props
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
}