import type { FastifyInstance } from "fastify"
import { taskController } from "./task.container.js"

export async function taskRoutes(fastify: FastifyInstance){

    fastify.get(
        "/",
        taskController.list.bind(taskController)
    )

    fastify.get(
        "/:id",
        taskController.get.bind(taskController)
    )

    fastify.get(
        "/:userId/assigned",
        taskController.listAssigned.bind(taskController)
    )

    fastify.post(
        "/",
        taskController.create.bind(taskController)
    )

    fastify.patch(
        "/:id",
        taskController.update.bind(taskController)
    )

    fastify.patch(
        "/:taskId/assign/:userId",
        taskController.assignTask.bind(taskController)
    )

    fastify.patch(
        "/:id/complete",
        taskController.changeState.bind(taskController)
    )
}