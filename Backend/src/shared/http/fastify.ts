import Fastify from "fastify";
import { apiRoutes } from "./api.routes.js";
import { configureErrorHandler } from "./error-handler.js";
import { storage } from "../auth/auth-context.js";
import fastifyCookie from "@fastify/cookie";
import { authRoutes } from "../auth/auth.routes.js";

export const fastify = Fastify({
    logger: true
});

configureErrorHandler(fastify)

fastify.addHook("onRequest", async (request, reply) => {
    storage.enterWith({
        request: request,
        reply: reply
    })
})

fastify.register(fastifyCookie)

fastify.register(authRoutes, {
    prefix: "/api/auth"
})

fastify.register(apiRoutes, {
    prefix: "/api/v1"
});