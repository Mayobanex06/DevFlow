import type { FastifyInstance } from "fastify";
import { documentController } from "./document.container.js";

import type {
    IdParams,
    ProjectIdParams,
    TaskIdParams,
    DocumentBody
} from "./document.controller.js";

import { authorize } from "../../../shared/authorization/authorization-container.js";
import { PermissionCode } from "../../authorization/domain/permission.js";

export async function documentRoutes(
    fastify: FastifyInstance
) {

    fastify.get<{ Params: IdParams }>(
        "/:id",
        {
            preHandler: authorize(PermissionCode.DOCUMENT_READ)
        },
        documentController.get.bind(documentController)
    );

    fastify.get<{ Params: ProjectIdParams }>(
        "/:projectId/project",
        {
            preHandler: authorize(PermissionCode.DOCUMENT_READ)
        },
        documentController.getByProjectId.bind(documentController)
    );

    fastify.get<{ Params: TaskIdParams }>(
        "/:taskId/task",
        {
            preHandler: authorize(PermissionCode.DOCUMENT_READ)
        },
        documentController.getByTaskId.bind(documentController)
    );

    fastify.post<{ Body: DocumentBody }>(
        "/",
        {
            preHandler: authorize(PermissionCode.DOCUMENT_CREATE)
        },
        documentController.create.bind(documentController)
    );

    fastify.delete<{ Params: IdParams }>(
        "/:id/delete",
        {
            preHandler: authorize(PermissionCode.DOCUMENT_DELETE)
        },
        documentController.delete.bind(documentController)
    );
}