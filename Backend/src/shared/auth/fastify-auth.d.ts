import type { FastifyRequest } from "fastify";
import type { AuthenticatedUser } from "./authenticated-user.ts";

declare module "fastify" {
    interface FastifyRequest {
        user: AuthenticatedUser
    }
}