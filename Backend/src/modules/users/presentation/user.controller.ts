import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../application/create-user.use-case.js";
import { ListUsersUseCase } from "../application/list-users.use-case.js";
import { GetUserUseCase } from "../application/get-user.use-case.js";
import { ListAssignableUsersUseCase } from "../application/list-user-assignable-project.use-case.js";
import { GetUserByAuthUserIdUseCase } from "../application/get-auth-user.use-case.js";

interface UserIdParams {
    id: number
}

interface UserAuthIdParams {
    authUserId: string
}

interface CreateUserBody {
    authUserId: string,
    name: string,
    roleId: number
}

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private listUsersUseCase: ListUsersUseCase,
        private listAssignableUsersUseCase: ListAssignableUsersUseCase,
        private getUserUseCase: GetUserUseCase,
        private getUserByAuthUserIdUseCase: GetUserByAuthUserIdUseCase
    ) {}

    async create(request: FastifyRequest<{
        Body: CreateUserBody
    }>, reply: FastifyReply) {

        const body = request.body

        const user = await this.createUserUseCase.execute({
            authUserId: body.authUserId,
            name: body.name,
            roleId: body.roleId
        })

        return reply.status(201).send({
            data: {
                id: Number(user.id),
                authUserId: user.authUserId,
                name: user.name,
                roleId: Number(user.roleId)
            },
            meta: {
                requestId: request.id
            }
        })
    }

    async list(request: FastifyRequest, reply: FastifyReply) {

        const users = await this.listUsersUseCase.execute()

        return reply.status(200).send({
            data: users.map(user => ({
                id: Number(user.id),
                authUserId: user.authUserId,
                name: user.name,
                roleId: Number(user.roleId)
            })),
            meta: {
                requestId: request.id
            }
        })
    }

    async get(request: FastifyRequest<{
        Params: UserIdParams
    }>, reply: FastifyReply) {

        const params = request.params

        const user = await this.getUserUseCase.execute({
            id: Number(params.id)
        })

        if (!user){
            return reply.status(404).send({
                error: {
                    "code": "USER_NOT_FOUND",
                    "message": "User not found",
                    "details": null
                },
                meta: {
                    requestId: request.id
                }
            })
        }

        return reply.status(200).send({
            data: {
                id: Number(user.id),
                authUserId: user.authUserId,
                name: user.name,
                roleId: Number(user.roleId)
            },

            meta: {
                requestId: request.id
            }
        })
    }

    async listAssignable(request: FastifyRequest<{
        Querystring: {
            projectId: number
        }
    }>, reply: FastifyReply) {

        const query = request.query 

        const users = await this.listAssignableUsersUseCase.execute({
            projectId: query.projectId
        })

        return reply.status(200).send({
            data: users.map(user => ({
                id: Number(user.id),
                authUserId: user.authUserId,
                name: user.name,
                roleId: Number(user.roleId)
            })),
            meta: {
                requestId: request.id
            }
        })
    }

    async getByAuthUserId(request: FastifyRequest<{
        Params: UserAuthIdParams
    }>, reply: FastifyReply) {

        const params = request.params

        const user = await this.getUserByAuthUserIdUseCase.execute({
            authUserId: params.authUserId
        })

        if (!user){
            return reply.status(404).send({
                error: {
                    "code": "USER_NOT_FOUND",
                    "message": "User not found",
                    "details": null
                },
                meta: {
                    requestId: request.id
                }
            })
        }

        return reply.status(200).send({
            data: {
                id: Number(user.id),
                authUserId: user.authUserId,
                name: user.name,
                roleId: Number(user.roleId)
            },
            meta: {
                requestId: request.id
            }
        })
    }
}