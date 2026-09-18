import { FastifyReply, FastifyRequest } from "fastify";
import { AssignTaskUseCase } from "../application/assign-task.use-case.js";
import { ChangeStateTaskUseCase } from "../application/changeState-task.use-case.js";
import { CreateTaskUseCase } from "../application/create-task-use-case.js";
import { GetTaskUseCase } from "../application/get-task.use-case.js";
import { ListTaskUseCase } from "../application/list-task.use-case.js";
import { UpdateTaskUseCase } from "../application/update-task-use-case.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ListAssignedTaskUseCase } from "../application/listAssigned-task.use-case.js";

interface IdParams {
    id: number
}

interface UserIdParams {
    userId: number
}

interface AssignTaskParams {
    taskId: number,
    userId: number
}

interface TaskBody {
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
        private changeStateTaskUseCase: ChangeStateTaskUseCase
    ) {}

    async get(request: FastifyRequest<{
        Params: IdParams
    }>, reply: FastifyReply) {

        const id = request.params.id

        const task = await this.getTaskUseCase.execute({
            id: id
        })

        if(!task){
            throw new NotFoundError(
                "TASK_NOT_FOUND",
                "Task not found"
            )
        }

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

        const tasks = await this.listTasksUseCase.execute()

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
            assignedUserId: body.assignedUserId
        })

        return reply.send(200).send({
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
            assignedUserId: body.assignedUserId
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
            userId: params.userId
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

    async changeState(request: FastifyRequest<{
        Params: IdParams
    }>, reply: FastifyReply) {

        const id = request.params.id

        await this.changeStateTaskUseCase.execute({
            id: id
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