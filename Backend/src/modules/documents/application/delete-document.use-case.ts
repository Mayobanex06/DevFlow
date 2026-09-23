import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ActivityEntityType, ActivityType } from "../../activities/domain/activities.entity.js";
import { ActivityRecorder } from "../../activities/domain/activity-recorder.js";
import { DocumentRepository } from "../domain/document.repository.js";

interface DeleteDocumentInput {
    id: number
    userId: number
}

export class DeleteDocumentUseCase {
    constructor(
        private documentRepository: DocumentRepository,
        private activityRecorder: ActivityRecorder
    ) {}

    async execute(input: DeleteDocumentInput): Promise<void> {

        const document = await this.documentRepository.findById(input.id)

        if(!document){
            throw new NotFoundError(
                "DOCUMENT_NOT_FOUND",
                "Document not found"
            )
        }

        await this.documentRepository.delete(input.id) 

        await this.activityRecorder.record({
            type: ActivityType.DOCUMENT_DELETED,
            entityType: ActivityEntityType.DOCUMENT,
            entityId: document.id,
            projectId: document.projectId,
            userId: input.userId
        })
    }
}