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

interface UpdateClientDetails {
    name?: string,
    email?: string,
    phone?: string | null
}

export class Client {
    private constructor(private props: ClientProps) {}

    static create(props: CreateClientProps): Client {
        return new Client({
            ...props,
            name: this.validateName(props.name),
            email: this.validateEmail(props.email)
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

    private static validateName(name: string): string{
        const normalized = name.trim()

        if (normalized.length === 0){
            // TODO [ERRORS]: Replace with domain validation error.
            throw new Error("Client name cannot be empty")
        }

        return normalized
    }

    private static validateEmail(email: string): string {
        const normalized = email.trim().toLowerCase()

        if (normalized.length === 0) {
            // TODO [ERRORS]: Replace with domain validation error.
            throw new Error("Client email cannot be empty")
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(normalized)) {
            // TODO [ERRORS]: Replace with domain validation error.
            throw new Error("Invalid client email format")
        }

        return normalized
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

    updateDetails(details: UpdateClientDetails): void {
        if (details.name !== undefined){
            this.props.name = Client.validateName(details.name)
        }

        if (details.email !== undefined){
            this.props.email = Client.validateEmail(details.email)
        }

        if (details.phone !== undefined){
            this.props.phone = details.phone
        }
    }
}