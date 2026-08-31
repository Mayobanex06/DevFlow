import { Client } from "./client.entity.js"

export interface ClientRepository {
    create(client: Client): Promise<Client>
    findId(id: number): Promise<Client | null>
}