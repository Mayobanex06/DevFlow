import type { FastifyInstance } from "fastify";
import { projectRoutes } from "../../modules/projects/presentation/project.routes.js";

export async function apiRoutes(
    fastify: FastifyInstance
) {
    fastify.register(projectRoutes, {
        prefix: "/projects"
    });
}