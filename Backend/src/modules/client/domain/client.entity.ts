interface ClientProps {
    id?: number,
    name: string,
    email: string,
    phone: string | null,
    createdAt?: Date
}

interface CreateClientProps {
    name: string,
    email: string,
    phone: string | null
}

interface RestoreClientProps {
    id: number,
    name: string,
    email: string,
    phone: string | null,
    createdAt: Date
}

export class Client {
    private constructor(private props: ClientProps) {}

    static create(props: CreateClientProps): Client {
        return new Client({
            name: props.name,
            email: props.email,
            phone: props.phone,
        })
    }

    static restore(props: RestoreClientProps): Client {
        return new Client({
            id: props.id,
            name: props.name,
            email: props.email,
            phone: props.phone,
            createdAt: props.createdAt
        })
    }

    get id(){

        if (this.props.id === undefined){
            throw new Error("Client has not been persisted")
        }

        return this.props.id
    }

    get name(){
        return this.props.name
    }

    get email(){
        return this.props.email
    }

    get phone(){
        return this.props.phone
    }
}