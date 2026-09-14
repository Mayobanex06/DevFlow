import type { FastifyInstance } from "fastify"
import { authorizationController } from "./authorization.container.js"

export async function authorizationRoutes(
    fastify: FastifyInstance
) {

    fastify.get(
        "/:id",
        authorizationController.getRole.bind(authorizationController)
    )

    fastify.get(
        "/roles",
        authorizationController.listRoles.bind(authorizationController)
    )

    fastify.get(
        "/roles/:code",
        authorizationController.getRoleByCode.bind(authorizationController)
    )

    fastify.get(
        "/roles/:code/permissions",
        authorizationController.getPermissionByRoleCode.bind(authorizationController)
    );

    fastify.get(
        "/permissions/:code",
        authorizationController.getPermissionByCode.bind(authorizationController)
    );

}