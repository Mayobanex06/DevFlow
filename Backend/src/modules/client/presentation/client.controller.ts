import { FastifyReply, FastifyRequest } from "fastify";
import { GetClientUseCase } from "../application/get-client.use-case.js";
import { ListClientsUseCase } from "../application/list-clients.use-case.js";

interface ClientParams {
    id: number
}

export class ClientController { 
    constructor(
        private listClientUseCase: ListClientsUseCase,
        private getClientUseCase: GetClientUseCase
    ) {}

    async get(request: FastifyRequest<{
        Params: ClientParams
    }>, reply: FastifyReply) {

        const { id } = request.params

        const client = await this.getClientUseCase.execute({
            id: id
        })

        if (!client){
            return reply.status(404).send({
                error: {
                    "code": "CLIENT_NOT_FOUND",
                    "message": "Client not found",
                    "details": null
                },

                meta: {
                    requestId: request.id
                }
            })
        }

        return reply.status(200).send({
            data: {
                id: client.id,
                name: client.name,
                email: client.email,
                phone: client.phone,
            },

            meta: {
                requestId: request.id
            }
        })
    }

    async list(
        request: FastifyRequest,
        reply: FastifyReply
    ) {

        const clients = await this.listClientUseCase.execute()

        return reply.status(200).send({
            data: clients.map(client => ({
                id: client.id,
                name: client.name,
                email: client.email,
                phone: client.phone
            })),

            meta: {
                requestId: request.id
            }
        })

    }
}