import { db } from "../../../shared/database/postgres.js"
import { Document } from "../domain/document.entity.js"
import { DocumentRepository } from "../domain/document.repository.js"

interface DocumentRows {
    id: number,
    name: string,
    original_name: string,
    storage_path: string,
    mime_type: string,
    size: number,
    created_at: Date,
    project_id: number,
    task_id: number | null
}

export class PostgresDocumentRepository implements DocumentRepository {
    
    private toDomain(row: DocumentRows): Document {
        return Document.restore({
            id: Number(row.id),
            name: row.name,
            original_name: row.original_name,
            storage_path: row.storage_path,
            mime_type: row.mime_type,
            size: row.size,
            createdAt: row.created_at,
            projectId: row.project_id,
            taskId: row.task_id
        })
    }

    async findById(id: number): Promise<Document | null> {
        
        const result = await db.query(`
            SELECT *
            FROM documents
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

    async findByProject(projectId: number): Promise<Document[]> {
        
        const result = await db.query(`
            SELECT *
            FROM documents
            WHERE project_id = $1
            `,
            [
                projectId
            ]
        )

        return result.rows.map(row => (this.toDomain(row)))
    }

    async findByTask(taskId: number): Promise<Document[]> {

        const result = await db.query(`
            SELECT *
            FROM documents
            WHERE task_id = $1
            `,
            [
                taskId
            ]
        )

        return result.rows.map(row => (this.toDomain(row)))
    }

    async create(document: Document): Promise<Document> {
        
        const result = await db.query(`
            INSERT INTO documents (
            name,
            original_name,
            storage_path,
            mime_type,
            size,
            project_id,
            task_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            `,
            [
                document.name,
                document.original_name,
                document.storage_path,
                document.mime_type,
                document.size,
                document.projectId,
                document.taskId
            ]
        )

        return this.toDomain(result.rows[0])
    }

    async delete(id: number): Promise<void> {
        
        await db.query(`
            DELETE FROM documents
            WHERE id = $1
            `,
            [
                id
            ]
        )
    }

}