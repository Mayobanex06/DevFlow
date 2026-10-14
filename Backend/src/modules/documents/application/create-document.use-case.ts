import { ProjectRepository } from "../../projects/domain/project.repository.js";
import { DocumentRepository } from "../domain/document.repository.js";
import { TaskRepository } from "../../task/domain/task.repository.js";
import { Document } from "../domain/document.entity.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ConflictError } from "../../../shared/errors/conflict-error.js";
import { ActivityRecorder } from "../../activities/domain/activity-recorder.js";
import { ActivityEntityType, ActivityType } from "../../activities/domain/activities.entity.js";

interface CreateDocumentInput {
    name: string,
    original_name: string,
    storage_path: string,
    mime_type: string,
    size: number,
    projectId: number,
    taskId: number | null
    userId: number
}

export class CreateDocumentUseCase {
    constructor(
        private documentRepository: DocumentRepository,
        private projectRepository: ProjectRepository,
        private taskRepository: TaskRepository,
        private activityRecorder: ActivityRecorder
    ) {}

    async execute(input: CreateDocumentInput): Promise<Document> {

        const project = await this.projectRepository.findById(input.projectId)

        if(!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        } 

        if (input.taskId !== null) {
            const task = await this.taskRepository.findById(input.taskId);

            if (!task) {
                throw new NotFoundError(
                    "TASK_NOT_FOUND",
                    "Task not found"
                );
            }

            if (task.projectId !== input.projectId) {
                throw new ConflictError(
                    "TASK_NOT_BELONG_PROJECT",
                    "Task does not belong to project"
                );
            }
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

        const createdDocument = await this.documentRepository.create(document)

        await this.activityRecorder.record({
            type: ActivityType.DOCUMENT_ATTACHED,
            entityType: ActivityEntityType.DOCUMENT,
            entityId: createdDocument.id,
            projectId: createdDocument.projectId,
            userId: input.userId
        })

        return createdDocument
    }
} 