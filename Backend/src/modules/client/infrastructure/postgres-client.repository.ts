import { ClientRepository } from "../domain/client.repository.js";
import { Client } from "../domain/client.entity.js";
import { db } from "../../../shared/database/postgres.js"

interface ClientRow {
    id: string,
    name: string,
    email: string,
    phone: string | null,
    created_at: Date
}

export class PostgresClientRepository implements ClientRepository {
    
    private toDomain(row: ClientRow): Client {
        return Client.restore({
            id: Number(row.id),
            name: row.name,
            email: row.email,
            phone: row.phone,
            createdAt: row.created_at
        })
    }

    async create(client: Client): Promise<Client> {

        const result = await db.query(`
            INSERT INTO clients (
            name,
            email,
            phone
            )
            VALUES($1, $2, $3)
            RETURNING *
            `,
            [
                client.name,
                client.email,
                client.phone
            ]
        )

        return this.toDomain(result.rows[0])
    }

    async findById(id: number): Promise<Client | null> {

        const result = await db.query(`
            SELECT *
            FROM clients
            WHERE id = $1
            `,
            [
                id
            ]
        )

        if (result.rows.length === 0){
            return null
        }

        return this.toDomain(result.rows[0])
    }
}