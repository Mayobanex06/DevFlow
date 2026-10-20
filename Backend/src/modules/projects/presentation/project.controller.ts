import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateProjectUseCase } from "../application/use-cases/create-project.use-case.js";
import { UpdateProjectUseCase } from "../application/use-cases/update-project.use-case.js";
import { ListProjectsUseCase } from "../application/use-cases/list-project.use-case.js";
import { GetProjectUseCase } from "../application/use-cases/get-project.use-case.js";
import { ListAllTeamsProjectUseCase } from "../application/use-cases/listAllTeams-projects.use-case.js";
import { AddTeamProjectUseCase } from "../application/use-cases/addTeam-project.use-case.js";
import { RemoveTeamProjectUseCase } from "../application/use-cases/removeTeam-project.use-case.js";

export interface ProjectParams {
    projectId: number
}

export interface ProjectTeamParams {
    projectId: number,
    teamId: number
}

export interface CreateProjectBody {
    name: string, 
    description: string | null,
    clientId: number,
    projectManagerId: number
}

export interface UpdateProjectBody {
    name?: string,
    description?: string | null,
    clientId?: number
}

export class ProjectController {
    constructor(
        private createProjectUseCase: CreateProjectUseCase,
        private updateProjectUseCase: UpdateProjectUseCase,
        private listProjectsUseCase: ListProjectsUseCase,
        private getProjectUseCase: GetProjectUseCase,
        private listAllTeamsProjectUseCase: ListAllTeamsProjectUseCase,
        private addTeamProjectUseCase: AddTeamProjectUseCase,
        private removeTeamProjectUseCase: RemoveTeamProjectUseCase
    ) {}

    async create(request: FastifyRequest<{
        Body: CreateProjectBody
    }>, reply: FastifyReply) {

        const body = request.body

        const project = await this.createProjectUseCase.execute({
            name: body.name,
            description: body.description,
            clientId: body.clientId,
            projectManagerId: body.projectManagerId,
            userId: request.user.id
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

    async update(
        request: FastifyRequest<{
            Params: ProjectParams, 
            Body: UpdateProjectBody
         }>,
        reply: FastifyReply
    ) {

        const { projectId } = request.params
        const body = request.body
        
        const project = await this.updateProjectUseCase.execute({
            id: Number(projectId),
            name: body.name,
            description: body.description,
            clientId: body.clientId,
            userId: request.user.id
        })

        return reply.status(200).send({
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

    async list(
        request: FastifyRequest,
        reply: FastifyReply
    ) {

        const projects = await this.listProjectsUseCase.execute({
            userId: request.user.id
        })

        return reply.status(200).send({
            data: projects.map(project => ({
                id: project.id,
                name: project.name,
                description: project.description,
                state: project.state,
                clientId: project.clientId
            })),

            meta: {
                requestId: request.id
            }
        })

    }

    async get(
        request: FastifyRequest<{
            Params: ProjectParams
        }>,
        reply: FastifyReply
    ) {

        const { projectId } = request.params

        const project = await this.getProjectUseCase.execute({
            projectId: projectId,
            userId: request.user.id
        })

        if (!project){
            return reply.status(404).send({
                error: {
                    "code": "PROJECT_NOT_FOUND",
                    "message": "Project not found",
                    "details": null
                },
                meta: {
                    requestId: request.id
                }
            })
        }

        return reply.status(200).send({
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

    async listAllTeams(request: FastifyRequest<{
        Params: ProjectParams
    }>, reply: FastifyReply) {

        const projectId = request.params.projectId

        const teams = await this.listAllTeamsProjectUseCase.execute({
            projectId: projectId,
            userId: request.user.id
        })

        return reply.status(200).send({
            data: teams.map(team => ({
                id: team.id,
                name: team.name,
                description: team.description
            })),
            meta: {
                requestId: request.id
            }
        })
    }

    async addTeam(request: FastifyRequest<{
        Params: ProjectTeamParams
    }>, reply: FastifyReply) {

        const params = request.params

        await this.addTeamProjectUseCase.execute({
            projectId: params.projectId,
            teamId: params.teamId,
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

    async removeTeam(request: FastifyRequest<{
        Params: ProjectTeamParams
    }>, reply: FastifyReply) {

        const params = request.params

        await this.removeTeamProjectUseCase.execute({
            projectId: params.projectId,
            teamId: params.teamId,
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