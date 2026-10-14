import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserRepository } from "../../modules/users/domain/user.repository.js";

import { neonServer } from "./neon-auth-server.js";

export function createAuthenticate(userRepository: UserRepository) {

    return async function authenticate(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void> {

        const result = await neonServer.getSession();
        
        if (result.error) {
            throw new Error("Failed to validate authentication session");
        }

        const data = result.data;

        if (data === null) {
            reply.code(401).send({
                data: {
                    success: false,
                    message: "User not authenticated"
                },
                meta: {
                    requestId: request.id
                }
            });

            return;
        }

        const authUserId = data.user.id;

        const user = await userRepository.findByAuthUserId(authUserId);

        if (user === null) {
            reply.code(403).send({
                data: {
                    success: false,
                    message: "User does not have access to DevFlow"
                },
                meta: {
                    requestId: request.id
                }
            })

            return;
        }

        request.user = {
            id: user.id,
            authUserId: user.authUserId,
            name: user.name,
            roleId: user.roleId
        }

        request.log.info({
            authenticatedUser: request.user
        })
    }
}