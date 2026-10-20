import { FastifyReply, FastifyRequest } from "fastify";
import { GetTaskUseCase } from "../application/use-case/get-task.use-case.js";
import { ListTaskUseCase } from "../application/use-case/list-task.use-case.js";
import { ListAssignedTaskUseCase } from "../application/use-case/listAssigned-task.use-case.js";
import { CreateTaskUseCase } from "../application/use-case/create-task-use-case.js";
import { UpdateTaskUseCase } from "../application/use-case/update-task-use-case.js";
import { AssignTaskUseCase } from "../application/use-case/assign-task.use-case.js";
import { CompleteTaskUseCase } from "../application/use-case/complete-task.use-case.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";


export interface IdParams {
    id: number
}

export interface UserIdParams {
    userId: number
}

export interface AssignTaskParams {
    taskId: number,
    userId: number
}

export interface TaskBody {
    name: string;
    description: string | null;
    projectId: number;
    assignedUserId: number;
}

export class TaskController {
    constructor(
        private getTaskUseCase: GetTaskUseCase,
        private listTasksUseCase: ListTaskUseCase,
        private listAllAssignedUseCase: ListAssignedTaskUseCase,
        private createTaskUseCase: CreateTaskUseCase,
        private updateTaskUseCase: UpdateTaskUseCase,
        private assignTaskUseCase: AssignTaskUseCase,
        private completeTaskUseCase: CompleteTaskUseCase
    ) {}

    async get(request: FastifyRequest<{
        Params: IdParams
    }>, reply: FastifyReply) {

        const id = request.params.id

        const task = await this.getTaskUseCase.execute({
            id: id,
            userId: request.user.id
        })

        return reply.status(200).send({
            data: {
                id: task.id,
                name: task.name,
                description: task.description,
                completedAt: task.completedAt,
                projectId: task.projectId,
                assignedUserId: task.assignedUserId
            },
            meta: {
                requestId: request.id
            }
        })
    }

    async list(request: FastifyRequest, reply: FastifyReply){

        const tasks = await this.listTasksUseCase.execute({
            userId: request.user.id
        })

        return reply.status(200).send({
            data: tasks.map(task => ({
                id: task.id,
                name: task.name,
                description: task.description,
                completedAt: task.completedAt,
                projectId: task.projectId,
                assignedUserId: task.assignedUserId
            })),
            meta: {
                requestId: request.id
            }
        })
    }

    async listAssigned(request: FastifyRequest<{
        Params: UserIdParams
    }>, reply: FastifyReply){

        const userId = request.params.userId

        const tasks = await this.listAllAssignedUseCase.execute({
            userId: userId
        })

        return reply.status(200).send({
            data: tasks.map(task => ({
                id: task.id,
                name: task.name,
                description: task.description,
                completedAt: task.completedAt,
                projectId: task.projectId,
                assignedUserId: task.assignedUserId
            })),
            meta: {
                requestId: request.id
            }
        })

    }

    async create(request: FastifyRequest<{
        Body: TaskBody
    }>, reply: FastifyReply){

        const body = request.body

        const task = await this.createTaskUseCase.execute({
            name: body.name,
            description: body.description,
            projectId: body.projectId,
            assignedUserId: body.assignedUserId,
            userId: request.user.id
        })

        return reply.status(201).send({
            data: {
                id: task.id,
                name: task.name,
                description: task.description,
                completedAt: task.completedAt,
                projectId: task.projectId,
                assignedUserId: task.assignedUserId
            }, 
            meta: {
                requestId: request.id
            }
        })
    }

    async update(request: FastifyRequest<{
        Params: IdParams
        Body: TaskBody
    }>, reply: FastifyReply){

        const id = request.params.id
        const body = request.body

        const task = await this.updateTaskUseCase.execute({
            id: id,
            name: body.name,
            description: body.description,
            userId: request.user.id
        })

        return reply.status(200).send({
            data: {
                id: task.id,
                name: task.name,
                description: task.description,
                completedAt: task.completedAt,
                projectId: task.projectId,
                assignedUserId: task.assignedUserId
            },
            meta: {
                requestId: request.id
            }
        })
    }

    async assignTask(request: FastifyRequest<{
        Params: AssignTaskParams
    }>, reply: FastifyReply){

        const params = request.params

        await this.assignTaskUseCase.execute({
            taskId: params.taskId,
            userIdAssign: params.userId,
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

    async complete(request: FastifyRequest<{
        Params: IdParams
    }>, reply: FastifyReply) {

        const id = request.params.id

        await this.completeTaskUseCase.execute({
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