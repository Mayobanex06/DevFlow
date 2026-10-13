import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { Client } from "../domain/client.entity.js";
import { ClientRepository } from "../domain/client.repository.js";

interface GetClientInput {
    id: number
}

export class GetClientUseCase {
    constructor(
        private clientRepository: ClientRepository
    ) {}

    async execute(input: GetClientInput): Promise<Client> {

        const client = await this.clientRepository.findById(input.id)

        if (!client){
            throw new NotFoundError(
                "CLIENT_NOT_FOUND",
                "Client not found"
            )
        }

        return client
    }
}