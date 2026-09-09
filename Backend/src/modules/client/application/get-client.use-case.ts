import { Client } from "../domain/client.entity.js";
import { ClientRepository } from "../domain/client.repository.js";

interface GetClientInput {
    id: number
}

export class GetClientUseCase {
    constructor(
        private clientRepository: ClientRepository
    ) {}

    async execute(input: GetClientInput): Promise<Client | null> {

        return this.clientRepository.findById(input.id)
    }
}