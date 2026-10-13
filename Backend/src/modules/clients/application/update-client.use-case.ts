import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { Client } from "../domain/client.entity.js";
import { ClientRepository } from "../domain/client.repository.js";

interface UpdateClientInput {
    clientId: number,
    name?: string,
    email?: string,
    phone?: string | null
}

export class UpdateClientUseCase {
    constructor(
        private clientRepository: ClientRepository
    ) {}

    async execute(input: UpdateClientInput): Promise<Client> {

        const client = await this.clientRepository.findById(input.clientId)

        if (!client){
            throw new NotFoundError(
                "CLIENT_NOT_FOUND",
                "Client not found"
            )
        }

        if (input.name === undefined &&
            input.email === undefined &&
            input.phone === undefined
        ) {
            // TODO [ERRORS]: Replace with ValidationError.
            throw new Error("At least one field must be provided")
        }

        client.updateDetails({
            name: input.name,
            email: input.email,
            phone: input.phone
        })

        const updatedClient = await this.clientRepository.update(client)

        return updatedClient
    }
}