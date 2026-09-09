import { FastifyInstance } from "fastify";
import { clientController } from "./client.container.js";

export async function clientRoutes(
    fastify: FastifyInstance
) {

    fastify.get(
        "/",
        clientController.list.bind(clientController)
    );

    fastify.get(
        "/:id",
        clientController.get.bind(clientController)
    );

}