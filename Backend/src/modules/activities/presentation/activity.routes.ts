import type { FastifyInstance } from 'fastify';
import { activityController } from './activity.containers.js';
import type { ProjectIdParams } from './activity.controller.js'
import { authorize } from '../../../shared/authorization/authorization-container.js';
import { PermissionCode } from '../../authorization/domain/permission.js';

export async function activityRoutes(
    fastify: FastifyInstance
) {
   
    fastify.get<{ Params: ProjectIdParams }>(
        "/:projectId",
        {
            preHandler: authorize(PermissionCode.ACTIVITY_READ)
        },
        activityController.getActivities.bind(activityController)
    )

}
