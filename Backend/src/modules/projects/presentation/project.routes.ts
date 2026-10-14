import type { FastifyInstance } from "fastify";
import { projectController } from "./project.container.js";

import type {
    ProjectParams,
    ProjectTeamParams,
    CreateProjectBody,
    UpdateProjectBody
} from "./project.controller.js";

import { authorize } from "../../../shared/authorization/authorization-container.js";
import { PermissionCode } from "../../authorization/domain/permission.js";

export async function projectRoutes(
    fastify: FastifyInstance
) {

    fastify.get(
        "/",
        {
            preHandler: authorize(PermissionCode.PROJECT_READ)
        },
        projectController.list.bind(projectController)
    );

    fastify.get<{ Params: ProjectParams }>(
        "/:id",
        {
            preHandler: authorize(PermissionCode.PROJECT_READ)
        },
        projectController.get.bind(projectController)
    );

    fastify.get<{ Params: ProjectParams }>(
        "/:id/teams",
        {
            preHandler: authorize(PermissionCode.PROJECT_READ)
        },
        projectController.listAllTeams.bind(projectController)
    );

    fastify.post<{ Body: CreateProjectBody }>(
        "/",
        {
            preHandler: authorize(PermissionCode.PROJECT_CREATE)
        },
        projectController.create.bind(projectController)
    );

    fastify.post<{ Params: ProjectTeamParams }>(
        "/:projectId/team/:teamId",
        {
            preHandler: authorize(PermissionCode.PROJECT_ADD_TEAM)
        },
        projectController.addTeam.bind(projectController)
    );

    fastify.patch<{
        Params: ProjectParams,
        Body: UpdateProjectBody
    }>(
        "/:id",
        {
            preHandler: authorize(PermissionCode.PROJECT_UPDATE)
        },
        projectController.update.bind(projectController)
    );

    fastify.delete<{ Params: ProjectTeamParams }>(
        "/:projectId/team/:teamId",
        {
            preHandler: authorize(PermissionCode.PROJECT_REMOVE_TEAM)
        },
        projectController.removeTeam.bind(projectController)
    );
}