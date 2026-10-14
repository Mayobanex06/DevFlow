import type { FastifyReply, FastifyRequest } from "fastify";
import { AsyncLocalStorage } from "node:async_hooks";

interface AuthContext {
    request: FastifyRequest,
    reply: FastifyReply
}

export const storage = new AsyncLocalStorage<AuthContext>()