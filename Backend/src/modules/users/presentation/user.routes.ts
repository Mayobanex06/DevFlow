import type { FastifyInstance } from "fastify";
import { userController } from "./user.container.js";

import type {
    UserIdParams,
    UserAuthIdParams,
    CreateUserBody
} from "./user.controller.js";

import { authorize } from "../../../shared/authorization/authorization-container.js";
import { PermissionCode } from "../../authorization/domain/permission.js";

export async function userRoutes(
    fastify: FastifyInstance
) {

    fastify.get(
        "/",
        {
            preHandler: authorize(PermissionCode.USER_READ)
        },
        userController.list.bind(userController)
    );

    fastify.get<{ Params: UserIdParams }>(
        "/:id",
        {
            preHandler: authorize(PermissionCode.USER_READ)
        },
        userController.get.bind(userController)
    );

    fastify.get<{
        Querystring: {
            projectId: number
        }
    }>(
        "/assignable",
        {
            preHandler: authorize(PermissionCode.USER_READ)
        },
        userController.listAssignable.bind(userController)
    );

    fastify.get<{ Params: UserAuthIdParams }>(
        "/auth/:authUserId",
        {
            preHandler: authorize(PermissionCode.USER_READ)
        },
        userController.getByAuthUserId.bind(userController)
    );

    fastify.post<{ Body: CreateUserBody }>(
        "/",
        {
            preHandler: authorize(PermissionCode.USER_CREATE)
        },
        userController.create.bind(userController)
    );
}
