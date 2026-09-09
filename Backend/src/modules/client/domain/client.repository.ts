import { Client } from "./client.entity.js"

export interface ClientRepository {
    findById(id: number): Promise<Client | null>
    findAll(): Promise<Client[]>
}