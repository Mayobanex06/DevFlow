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

    async findAll(): Promise<Client[]> {

        const result = await db.query(`
            SELECT *
            FROM clients
            `
        )
        
        return result.rows.map(row => this.toDomain(row))

    }

    async create(client: Client): Promise<Client> {
        
        const result = await db.query(`
            INSERT INTO clients (
            name,
            email,
            phone
            ) VALUES ($1, $2, $3)
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

    async update(client: Client): Promise<Client> {
        
        const result = await db.query(`
            UPDATE clients
            SET
            name = $1,
            email = $2,
            phone = $3
            WHERE id = $4
            RETURNING *
            `, 
            [
                client.name,
                client.email,
                client.phone,
                client.id
            ]
        )

        return this.toDomain(result.rows[0])
    }
}