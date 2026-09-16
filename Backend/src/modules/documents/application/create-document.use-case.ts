import { ProjectRepository } from "../../projects/domain/project.repository.js";
import { DocumentRepository } from "../domain/document.repository.js";
import { TaskRepository } from "../../task/domain/task.repository.js";
import { Document } from "../domain/document.entity.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ConflictError } from "../../../shared/errors/conflict-error.js";

interface CreateDocumentInput {
    name: string,
    original_name: string,
    storage_path: string,
    mime_type: string,
    size: number,
    projectId: number,
    taskId: number | null
}

export class CreateDocumentUseCase {
    constructor(
        private documentRepository: DocumentRepository,
        private projectRepository: ProjectRepository,
        private taskRepository: TaskRepository
    ) {}

    async execute(input: CreateDocumentInput): Promise<Document> {

        const project = await this.projectRepository.findById(input.projectId)

        if(!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        } 
        
        const task = await this.taskRepository.findById(input.taskId)

        if(!task){
            throw new NotFoundError(
                "TASK_NOT_FOUND",
                "Project not found"
            )
        }

        if(task.projectId !== input.projectId){
            throw new ConflictError(
                "TASK_NOT_BELONG_PROJECT",
                "Task does not belong to project"
            )
        }

        const document = Document.create({
            name: input.name,
            original_name: input.original_name,
            storage_path: input.storage_path,
            mime_type: input.mime_type,
            size: input.size,
            projectId: input.projectId,
            taskId: input.taskId
        })

        return this.documentRepository.create(document)
    }
} 