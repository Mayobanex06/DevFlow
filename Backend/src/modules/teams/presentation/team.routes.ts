import type { FastifyInstance } from "fastify";
import { teamController } from "./team.container.js";

import type {
    CreateTeamBody,
    IdParams,
    TeamIdParams,
    TeamUserIdParams
} from "./team.controller.js";

import { authorize } from "../../../shared/authorization/authorization-container.js";
import { PermissionCode } from "../../authorization/domain/permission.js";

export async function teamRoutes(
    fastify: FastifyInstance
) {

    fastify.get(
        "/",
        {
            preHandler: authorize(PermissionCode.TEAM_READ)
        },
        teamController.list.bind(teamController)
    );

    fastify.get<{ Params: IdParams }>(
        "/:id",
        {
            preHandler: authorize(PermissionCode.TEAM_READ)
        },
        teamController.get.bind(teamController)
    );

    fastify.get<{ Params: TeamIdParams }>(
        "/:teamId/members",
        {
            preHandler: authorize(PermissionCode.TEAM_READ)
        },
        teamController.listAllTeamMembers.bind(teamController)
    );

    fastify.post<{ Body: CreateTeamBody }>(
        "/",
        {
            preHandler: authorize(PermissionCode.TEAM_CREATE)
        },
        teamController.create.bind(teamController)
    );

    fastify.delete<{ Params: TeamUserIdParams }>(
        "/:teamId/members/:userId",
        {
            preHandler: authorize(PermissionCode.TEAM_REMOVE_MEMBER)
        },
        teamController.removeMemberFromTeam.bind(teamController)
    );

    fastify.post<{ Params: TeamUserIdParams }>(
        "/:teamId/members/:userId",
        {
            preHandler: authorize(PermissionCode.TEAM_ADD_MEMBER)
        },
        teamController.addMemberToTeam.bind(teamController)
    );
}