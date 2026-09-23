import type { FastifyInstance } from "fastify";
import { authorizationController } from "./authorization.container.js";

import type {
    RoleIdParams,
    RoleCodeParams,
    PermissionCodeParams
} from "./authorization.controller.js";

import { authorize } from "../../../shared/authorization/authorization-container.js";
import { PermissionCode } from "../domain/permission.js";

export async function authorizationRoutes(
    fastify: FastifyInstance
) {

    fastify.get<{ Params: RoleIdParams }>(
        "/:id",
        {
            preHandler: authorize(PermissionCode.ROLE_READ)
        },
        authorizationController.getRole.bind(authorizationController)
    );

    fastify.get(
        "/roles",
        {
            preHandler: authorize(PermissionCode.ROLE_READ)
        },
        authorizationController.listRoles.bind(authorizationController)
    );

    fastify.get<{ Params: RoleCodeParams }>(
        "/roles/:code",
        {
            preHandler: authorize(PermissionCode.ROLE_READ)
        },
        authorizationController.getRoleByCode.bind(authorizationController)
    );

    fastify.get<{ Params: RoleCodeParams }>(
        "/roles/:code/permissions",
        {
            preHandler: authorize(PermissionCode.PERMISSION_READ)
        },
        authorizationController.getPermissionByRoleCode.bind(authorizationController)
    );

    fastify.get<{ Params: PermissionCodeParams }>(
        "/permissions/:code",
        {
            preHandler: authorize(PermissionCode.PERMISSION_READ)
        },
        authorizationController.getPermissionByCode.bind(authorizationController)
    );
}