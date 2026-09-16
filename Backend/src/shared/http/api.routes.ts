import type { FastifyInstance } from "fastify";
import { projectRoutes } from "../../modules/projects/presentation/project.routes.js";
import { clientRoutes } from "../../modules/clients/presentation/client.routes.js";
import { userRoutes } from "../../modules/users/presentation/user.routes.js"; 
import { authorizationRoutes } from "../../modules/authorization/presentation/authorization.routes.js";
import { teamRoutes } from "../../modules/teams/presentation/team.routes.js"
import { documentRoutes } from "../../modules/documents/presentation/document.routes.js";

export async function apiRoutes(
    fastify: FastifyInstance
) {
    fastify.register(projectRoutes, {
        prefix: "/projects"
    });

    fastify.register(clientRoutes, {
        prefix: "/clients"
    });

    fastify.register(userRoutes, {
        prefix: "/users"
    })

    fastify.register(authorizationRoutes, {
        prefix: "/authorization"
    })

    fastify.register(teamRoutes, {
        prefix: "/teams"
    })

    fastify.register(documentRoutes, {
        prefix: "/documents"
    })
}