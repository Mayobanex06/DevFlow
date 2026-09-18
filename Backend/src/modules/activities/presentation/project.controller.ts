import type { FastifyRequest, FastifyReply } from 'fastify';

import type { CreateActivityUseCase } from '../application/activity-create.use-case.js';

interface CreateActivityProps {
    action: string;
    description: string | null;
    userId: number;
    projectId: number;
    taskId: number | null;
}

export class Activitycontroller {
    constructor(private createActivityUseCase: CreateActivityUseCase) { }

    async create(request: FastifyRequest<{
        Body: CreateActivityProps;
    }>, reply: FastifyReply) {

        const body = request.body;

        const activity = await this.createActivityUseCase.execute({
            action: body.action,
            description: body.description,
            userId: body.userId,
            projectId: body.projectId,
            taskId: body.taskId

        });

        return reply.status(201).send({
            data: {
                id: activity.id,
                action: activity.action,
                description: activity.description,
                userId: activity.userId,
                projectId: activity.projectId,
                taskId: activity.taskId
            },
            meta: {
                requestId: request.id
            }
        });

    }

}

