interface UserProps {
    id?: number,
    authUserId: string,
    name: string,
    createdAt?: Date,
    roleId: number
}

interface CreateUserProps {
    authUserId: string,
    name: string,
    roleId: number
}

interface RestoreUserProps {
    id: number,
    authUserId: string,
    name: string,
    createdAt: Date,
    roleId: number
}

export class User {
    private constructor(
        private props: UserProps
    ) {}

    static create(props: CreateUserProps){
        return new User({
            authUserId: props.authUserId,
            name: props.name,
            roleId: props.roleId
        })
    }

    static restore(props: RestoreUserProps){
        return new User({
            id: props.id,
            authUserId: props.authUserId,
            name: props.name,
            createdAt: props.createdAt,
            roleId: props.roleId
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

}