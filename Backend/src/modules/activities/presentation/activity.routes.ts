import type { FastifyInstance } from 'fastify';

import { activityController } from './activity.containers.js';

export async function activityRoutes(
    fastify: FastifyInstance
) {
    fastify.post(
        '/',
        activityController.create.bind(activityController)
    );
}
