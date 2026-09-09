interface AuthUserProps {
    id: string,
    email: string
}

export class AuthUser {
    constructor(
        private props: AuthUserProps
    ) {}

    get id(){
        return this.props.id
    }

    get email(){
        return this.props.email
    }
}