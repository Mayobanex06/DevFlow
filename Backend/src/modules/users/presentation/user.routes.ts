import type { FastifyInstance } from "fastify";
import { userController } from "./user.container.js";

export async function userRoutes(
    fastify: FastifyInstance
) {

    fastify.get(
        "/",
        userController.list.bind(userController)
    )

    fastify.get(
        "/:id",
        userController.get.bind(userController)
    )

    fastify.get(
        "/assignable",
        userController.listAssignable.bind(userController)
    )

    fastify.get(
        "/auth/:authUserId",
        userController.getByAuthUserId.bind(userController)
    )

    fastify.post(
        "/",
        userController.create.bind(userController)
    )

}
