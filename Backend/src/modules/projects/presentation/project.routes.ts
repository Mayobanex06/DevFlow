import type { FastifyInstance } from "fastify";
import { projectController } from "./project.container.js";

export async function projectRoutes(
    fastify: FastifyInstance
) {
    fastify.post(
        "/",
        projectController.create.bind(projectController)
    );

}