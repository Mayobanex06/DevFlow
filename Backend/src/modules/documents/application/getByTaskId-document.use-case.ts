import { DocumentRepository } from "../domain/document.repository.js";
import { TaskRepository } from "../../task/domain/task.repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { Document } from "../domain/document.entity.js";

interface GetByTaskIdDocumentInput {
    taskId: number
}

export class GetByTaskIdDocumentUseCase {
    constructor(
        private documentRepository: DocumentRepository,
        private taskRepository: TaskRepository
    ) {}

    async execute(input: GetByTaskIdDocumentInput): Promise<Document[]> {

        const task = await this.taskRepository.findById(input.taskId)

        if (!task){
            throw new NotFoundError(
                "TASK_NOT_FOUND",
                "Task not found"
            )
        }

        return this.documentRepository.findByTask(input.taskId)
    }
}