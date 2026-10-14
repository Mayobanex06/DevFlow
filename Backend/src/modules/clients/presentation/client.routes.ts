import type { FastifyInstance } from "fastify";
import { clientController } from "./client.container.js";

import type {
    ClientParams
} from "./client.controller.js";

import { authorize } from "../../../shared/authorization/authorization-container.js";
import { PermissionCode } from "../../authorization/domain/permission.js";

export async function clientRoutes(
    fastify: FastifyInstance
) {

    fastify.get(
        "/",
        {
            preHandler: authorize(PermissionCode.CLIENT_READ)
        },
        clientController.list.bind(clientController)
    );

    fastify.get<{ Params: ClientParams }>(
        "/:id",
        {
            preHandler: authorize(PermissionCode.CLIENT_READ)
        },
        clientController.get.bind(clientController)
    );
}