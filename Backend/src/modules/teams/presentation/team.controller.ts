import { FastifyReply, FastifyRequest } from "fastify"
import { AddMemberToTeamUseCase } from "../application/addMember-team.use-case.js"
import { CreateTeamUseCase } from "../application/create-team.use-case.js"
import { GetTeamUseCase } from "../application/get-team.use-case.js"
import { HasMemberTeamUseCase } from "../application/hasMember-team.use-case.js"
import { ListAllMembersTeamUseCase } from "../application/list-allMembers-team.use-case.js"
import { ListTeamsUseCase } from "../application/list-teams.use-case.js"
import { RemoveMemberFromTeamUseCase } from "../application/removeMember-team.use-case.js"
import { NotFoundError } from "../../../shared/errors/not-found-error.js"

export interface CreateTeamBody {
    name: string,
    description: string
}

export interface IdParams {
    id: number
}

export interface TeamIdParams {
    teamId: number
}

export interface TeamUserIdParams {
    teamId: number,
    userId: number
}

export class TeamController {
    constructor (
        private createTeamUseCase: CreateTeamUseCase,
        private getTeamUseCase: GetTeamUseCase,
        private listTeamsUseCase: ListTeamsUseCase,
        private listAllMembersTeamUseCase: ListAllMembersTeamUseCase,
        private hasMemberTeamUseCase: HasMemberTeamUseCase,
        private addMemberToTeamUseCase: AddMemberToTeamUseCase,
        private removeMemberFromTeamUseCase: RemoveMemberFromTeamUseCase
    ) {}

    async get(request: FastifyRequest<{
        Params: IdParams
    }>, reply: FastifyReply) {

        const id = request.params.id

        const team = await this.getTeamUseCase.execute({
            id: id
        })

        if(!team){
            throw new NotFoundError(
                "TEAM_NOT_FOUND",
                "Team not found"
            )
        }

        return reply.status(200).send({
            data: {
                id: Number(team.id),
                name: team.name,
                description: team.description
            },
            meta: {
                requestId: request.id
            }
        })
    }

    async create(request: FastifyRequest<{
        Body: CreateTeamBody
    }>, reply: FastifyReply) {

        const body = request.body

        const team = await this.createTeamUseCase.execute({
            name: body.name,
            description: body.description
        })

        reply.status(200).send({
            data: {
                id: Number(team.id),
                name: team.name,
                description: team.description
            },
            meta: {
                requestId: request.id
            }
        })
    }

    async list(request: FastifyRequest, reply: FastifyReply) {

        const teams = await this.listTeamsUseCase.execute()

        reply.status(200).send({
            data: teams.map((team) => ({
                id: team.id,
                name: team.name,
                description: team.description
            })),
            meta: {
                requestId: request.id
            }
        })
    }

    async listAllTeamMembers(request: FastifyRequest<{
        Params: TeamIdParams
    }>, reply: FastifyReply) {

        const teamId = request.params.teamId

        const users = await this.listAllMembersTeamUseCase.execute({
            teamId: teamId
        })

        reply.status(200).send({
            data: users.map((user) => ({
                id: user.name,
                authUserId: user.authUserId,
                name: user.name,
                roleId: user.roleId
            })),
            meta: {
                requestId: request.id
            }
        })
    }

    async hasMember(request: FastifyRequest<{
        Params: TeamUserIdParams
    }>, reply: FastifyReply) {

        const params = request.params

        const exists = await this.hasMemberTeamUseCase.execute({
            teamId: params.teamId,
            userId: params.userId   
        })

        reply.status(200).send({
            data: {
                exists: exists
            },
            meta: {
                requestId: request.id
            }
        })
    }

    async addMemberToTeam(request: FastifyRequest<{
        Params: TeamUserIdParams
    }>, reply: FastifyReply) {

        const params = request.params

        await this.addMemberToTeamUseCase.execute({
            teamId: params.teamId,
            userId: params.userId
        })

        reply.send(200).send({
            data: {
                success: true
            },
            meta: {
                requestId: request.id
            }
        })
    }

    async removeMemberFromTeam(request: FastifyRequest<{
        Params: TeamUserIdParams
    }>, reply: FastifyReply) {

        const params = request.params 

        await this.removeMemberFromTeamUseCase.execute({
            teamId: params.teamId,
            userId: params.userId
        })

        reply.status(200).send({
            data: {
                success: true
            },
            meta: {
                requestId: request.id
            }
        })
    }
}

