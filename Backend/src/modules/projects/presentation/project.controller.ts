import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateProjectUseCase } from "../application/create-project.user-case.js";

interface CreateProjectBody {
    name: string, 
    description: string | null,
    clientId: number 
}

export class ProjectController {
    constructor(private createProjectUseCase: CreateProjectUseCase) {}

    async create(request: FastifyRequest<{
        Body: CreateProjectBody
    }>, reply: FastifyReply) {

        const body = request.body

        const project = await this.createProjectUseCase.execute({
            name: body.name,
            description: body.description,
            clientId: body.clientId
        })

        return reply.status(201).send({
            data: {
                id: project.id,
                name: project.name,
                description: project.description,
                state: project.state,
                clientId: project.clientId
            },
            meta: {
                requestId: request.id
            }
        })

    }
}