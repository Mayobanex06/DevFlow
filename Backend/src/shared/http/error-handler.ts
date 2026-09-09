import type { FastifyInstance } from "fastify";
import { NotFoundError } from "../errors/not-found-error.js";
import { ConflictError } from "../errors/conflict-error.js";

export function configureErrorHandler(
    fastify: FastifyInstance
) {
    fastify.setErrorHandler((error, request, reply) => {

        if (error instanceof NotFoundError) {
            return reply.status(404).send({
                error: {
                    code: error.code,
                    message: error.message,
                    details: null
                },
                meta: {
                    requestId: request.id
                }
            });
        }

        if (error instanceof ConflictError) {
            return reply.status(409).send({
                error: {
                    code: error.code,
                    message: error.message,
                    details: null
                },
                meta: {
                    requestId: request.id
                }
            })
        }

        request.log.error(error);

        return reply.status(500).send({
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal server error",
                details: null
            },
            meta: {
                requestId: request.id
            }
        });
    });
}