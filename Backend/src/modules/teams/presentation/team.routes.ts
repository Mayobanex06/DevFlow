import type { FastifyInstance } from "fastify"
import { teamController } from "./team.container.js"

export async function teamRoutes(
    fastify: FastifyInstance
) {

    fastify.get(
        "/",
        teamController.list.bind(teamController)
    )

    fastify.get(
        "/:id",
        teamController.get.bind(teamController)
    )


    fastify.get(
        "/:teamId/members",
        teamController.listAllTeamMembers.bind(teamController)
    )

    fastify.post(
        "/",
        teamController.create.bind(teamController)
    )

    fastify.delete(
        "/:teamId/members/:userId",
        teamController.removeMemberFromTeam.bind(teamController)
    )

    fastify.post(
        "/:teamId/members/:userId",
        teamController.addMemberToTeam.bind(teamController)
    )
}