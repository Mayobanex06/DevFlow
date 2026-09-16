import { Document } from "../domain/document.entity.js";
import { DocumentRepository } from "../domain/document.repository.js";

interface GetDocumentInput {
    id: number
}

export class GetDocumentUseCase {
    constructor(
        private documentRepository: DocumentRepository
    ) {}

    async execute(input: GetDocumentInput): Promise<Document | null> {

        return this.documentRepository.findById(input.id)
    }
}