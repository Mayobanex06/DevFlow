import type { FastifyInstance } from "fastify";
import { projectRoutes } from "../../modules/projects/presentation/project.routes.js";
import { clientRoutes } from "../../modules/client/presentation/client.routes.js";

export async function apiRoutes(
    fastify: FastifyInstance
) {
    fastify.register(projectRoutes, {
        prefix: "/projects"
    });

    fastify.register(clientRoutes, {
        prefix: "/clients"
    });
}