import { Document } from "./document.entity.js";

export interface DocumentRepository {
    findById(id: number): Promise<Document | null>
    create(document: Document): Promise<Document>
    findByProject(projectId: number): Promise<Document[]>
    findByTask(taskId: number): Promise<Document[]>
    delete(id: number): Promise<void> 
}