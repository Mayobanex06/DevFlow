import { ClientRepository } from "../domain/client.repository.js";
import { Client } from "../domain/client.entity.js"

interface CreateClientInput {
    name: string,
    email: string,
    phone: string | null
}

export class CreateClientUseCase {
    constructor( private clientRepository: ClientRepository) {}

    async execute(input: CreateClientInput): Promise<Client> {

        const client = Client.create({
            name: input.name,
            email: input.email,
            phone: input.phone
        })

        return this.clientRepository.create(client)
    }
}