import type { FastifyInstance } from "fastify";
import { projectController } from "./project.container.js";

export async function projectRoutes(
    fastify: FastifyInstance
) {

    fastify.get(
        "/",
        projectController.list.bind(projectController)
    );

    fastify.get(
        "/:id",
        projectController.get.bind(projectController)
    );

    fastify.post(
        "/",
        projectController.create.bind(projectController)
    );

    fastify.patch(
        "/:id",
        projectController.update.bind(projectController)
    )

}