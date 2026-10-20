import type { FastifyRequest, FastifyReply } from 'fastify';
import { GetActivityUseCase } from '../application/get-activity.use-case.js';

export interface ProjectIdParams {
    projectId: number
}

export class ActivityController {
    constructor(
        private getActivityUseCase: GetActivityUseCase
    ) { }

    async getActivities(request: FastifyRequest<{
        Params: ProjectIdParams
        }>, reply: FastifyReply
    ) {

        const projectId = request.params.projectId

        const activities = await this.getActivityUseCase.execute({
            projectId: projectId
        })

        reply.status(200).send({
            data: activities.map(activity => ({
                id: activity.id,
                type: activity.type,
                description: activity.description,
                entityType: activity.entityType,
                projectId: activity.projectId,
                userId: activity.userId,
            })),
            meta: {
                requestId: request.id
            }
        })

    }   

}

