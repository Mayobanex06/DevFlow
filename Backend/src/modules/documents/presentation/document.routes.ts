import type { FastifyInstance } from "fastify"
import { documentController } from "./document.container.js"

export async function documentRoutes(
    fastify: FastifyInstance
) {

    fastify.get(
        "/:id",
        documentController.get.bind(documentController)
    )

    fastify.get(
        "/:projectId/project",
        documentController.getByProjectId.bind(documentController)
    )

    fastify.get(
        "/:taskId/task",
        documentController.getByTaskId.bind(documentController)
    )

    fastify.post(
        "/",
        documentController.create.bind(documentController)
    )

    fastify.delete(
        "/:id/delete",
        documentController.delete.bind(documentController)
    )
}