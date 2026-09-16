import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ProjectRepository } from "../../projects/domain/project.repository.js";
import { Document } from "../domain/document.entity.js";
import { DocumentRepository } from "../domain/document.repository.js";

interface GetByProjectIdDocumentInput {
    projectId: number
}

export class GetByProjectIdDocumentUseCase {
    constructor(
        private documentRepository: DocumentRepository,
        private projectRepository: ProjectRepository
    ) {}

    async execute(input: GetByProjectIdDocumentInput): Promise<Document[]> {

        const project = await this.projectRepository.findById(input.projectId)

        if (!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        }

        return this.documentRepository.findByProject(input.projectId)
    }
}