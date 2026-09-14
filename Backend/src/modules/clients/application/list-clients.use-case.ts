import { Client } from "../domain/client.entity.js";
import { ClientRepository } from "../domain/client.repository.js";

export class ListClientsUseCase {
    constructor(
        private clientRepository: ClientRepository
    ) {}

    async execute(): Promise<Client[]> {

        return this.clientRepository.findAll()
    }
}