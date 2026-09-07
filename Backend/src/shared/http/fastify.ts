import Fastify from "fastify";
import { apiRoutes } from "./api.routes.js";
import { configureErrorHandler } from "./error-handler.js";

export const fastify = Fastify({
    logger: true
});

configureErrorHandler(fastify)

fastify.register(apiRoutes, {
    prefix: "/api/v1"
});