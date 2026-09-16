import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { DocumentRepository } from "../domain/document.repository.js";

interface DeleteDocumentInput {
    id: number
}

export class DeleteDocumentUseCase {
    constructor(
        private documentRepository: DocumentRepository
    ) {}

    async execute(input: DeleteDocumentInput): Promise<void> {

        const document = await this.documentRepository.findById(input.id)

        if(!document){
            throw new NotFoundError(
                "DOCUMENT_NOT_FOUND",
                "Document not found"
            )
        }

        return this.documentRepository.delete(input.id) 
    }
}