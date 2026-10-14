import type { FastifyInstance } from "fastify";
import { taskController } from "./task.container.js";

import type {
    IdParams,
    UserIdParams,
    AssignTaskParams,
    TaskBody
} from "./task.controller.js";

import { authorize } from "../../../shared/authorization/authorization-container.js";
import { PermissionCode } from "../../authorization/domain/permission.js";

export async function taskRoutes(fastify: FastifyInstance) {

    fastify.get(
        "/",
        {
            preHandler: authorize(PermissionCode.TASK_READ)
        },
        taskController.list.bind(taskController)
    );

    fastify.get<{ Params: IdParams }>(
        "/:id",
        {
            preHandler: authorize(PermissionCode.TASK_READ)
        },
        taskController.get.bind(taskController)
    );

    fastify.get<{ Params: UserIdParams }>(
        "/:userId/assigned",
        {
            preHandler: authorize(PermissionCode.TASK_READ)
        },
        taskController.listAssigned.bind(taskController)
    );

    fastify.post<{ Body: TaskBody }>(
        "/",
        {
            preHandler: authorize(PermissionCode.TASK_CREATE)
        },
        taskController.create.bind(taskController)
    );

    fastify.patch<{
        Params: IdParams,
        Body: TaskBody
    }>(
        "/:id",
        {
            preHandler: authorize(PermissionCode.TASK_UPDATE)
        },
        taskController.update.bind(taskController)
    );

    fastify.patch<{ Params: AssignTaskParams }>(
        "/:taskId/assign/:userId",
        {
            preHandler: authorize(PermissionCode.TASK_ASSIGN)
        },
        taskController.assignTask.bind(taskController)
    );

    fastify.patch<{ Params: IdParams }>(
        "/:id/complete",
        {
            preHandler: authorize(PermissionCode.TASK_CHANGE_STATE)
        },
        taskController.changeState.bind(taskController)
    );
}