import { FastifyReply, FastifyRequest } from "fastify"
import { CreateDocumentUseCase } from "../application/create-document.use-case.js"
import { DeleteDocumentUseCase } from "../application/delete-document.use-case.js"
import { GetDocumentUseCase } from "../application/get-document.use-case.js"
import { GetByProjectIdDocumentUseCase } from "../application/getByProjectId-document.use-case.js"
import { GetByTaskIdDocumentUseCase } from "../application/getByTaskId-document.use-case.js"
import { NotFoundError } from "../../../shared/errors/not-found-error.js"

export interface IdParams {
    id: number
}

export interface ProjectIdParams {
    projectId: number
}

export interface TaskIdParams {
    taskId: number
}

export interface DocumentBody {
    name: string,
    original_name: string,
    storage_path: string,
    mime_type: string,
    size: number,
    projectId: number,
    taskId: number | null
}

export class DocumentController {
    constructor(
        private getDocumentUseCase: GetDocumentUseCase,
        private getByProjectIdDocumentUseCase: GetByProjectIdDocumentUseCase,
        private getByTaskIdDocumentUseCase: GetByTaskIdDocumentUseCase,
        private createDocumentUseCase: CreateDocumentUseCase,
        private deleteDocumentUseCase: DeleteDocumentUseCase
    ) {}

    async get(request: FastifyRequest<{
        Params: IdParams
    }>, reply: FastifyReply) {

        const id = request.params.id

        const document = await this.getDocumentUseCase.execute({
            id: id
        })

        if(!document){
            throw new NotFoundError(
                "DOCUMENT_NOT_FOUND",
                "Document not found"
            )
        }

        return reply.status(200).send({
            data: {
                id: Number(document.id),
                name: document.name,
                original_name: document.original_name,
                storage_path: document.storage_path,
                mime_type: document.mime_type,
                size: document.size,
                projectId: document.projectId,
                taskId: document.taskId
            }, 
            meta: {
                requestId: request.id
            }
        })
    }

    async getByProjectId(request: FastifyRequest<{
        Params: ProjectIdParams
    }>, reply: FastifyReply){

        const projectId = request.params.projectId

        const documents = await this.getByProjectIdDocumentUseCase.execute({
            projectId: projectId
        })

        return reply.status(200).send({
            data: documents.map(document => ({
                id: Number(document.id),
                name: document.name,
                original_name: document.original_name,
                storage_path: document.storage_path,
                mime_type: document.mime_type,
                size: document.size,
                projectId: document.projectId,
                taskId: document.taskId
            })),
            meta: {
                requestId: request.id
            }
        })
    }

    async getByTaskId(request: FastifyRequest<{
        Params: TaskIdParams
    }>, reply: FastifyReply){

        const taskId = request.params.taskId

        const documents = await this.getByTaskIdDocumentUseCase.execute({
            taskId: taskId
        })

        return reply.status(200).send({
            data: documents.map(document => ({
                id: Number(document.id),
                name: document.name,
                original_name: document.original_name,
                storage_path: document.storage_path,
                mime_type: document.mime_type,
                size: document.size,
                projectId: document.projectId,
                taskId: document.taskId
            })),
            meta: {
                requestId: request.id
            }
        })
    }

    async create(request: FastifyRequest<{
        Body: DocumentBody
    }>, reply: FastifyReply){

        const body = request.body

        const document = await this.createDocumentUseCase.execute({
            name: body.name,
            original_name: body.original_name,
            storage_path: body.storage_path,
            mime_type: body.mime_type,
            size: body.size,
            projectId: body.projectId,
            taskId: body.taskId,
            userId: request.user.id
        })

        return reply.status(201).send({
            data: {
                id: Number(document.id),
                name: document.name,
                original_name: document.original_name,
                storage_path: document.storage_path,
                mime_type: document.mime_type,
                size: document.size,
                projectId: document.projectId,
                taskId: document.taskId
            },
            meta: {
                requestId: request.id
            }
        })
    }

    async delete(request: FastifyRequest<{
        Params: IdParams
    }>, reply: FastifyReply){

        const id = request.params.id

        await this.deleteDocumentUseCase.execute({
            id: id,
            userId: request.user.id
        })

        return reply.status(200).send({
            data: {
                success: true
            },
            meta: {
                requestId: request.id
            }
        })
    }
}