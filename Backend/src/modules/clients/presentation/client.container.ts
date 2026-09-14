import { GetClientUseCase } from "../application/get-client.use-case.js";
import { ListClientsUseCase } from "../application/list-clients.use-case.js";
import { PostgresClientRepository } from "../infrastructure/postgres-client.repository.js";
import { ClientController } from "./client.controller.js";

const clientRepository = new PostgresClientRepository();

const getClientUseCase = new GetClientUseCase(
    clientRepository
);

const listClientUseCase = new ListClientsUseCase(
    clientRepository
);

export const clientController = new ClientController(
    listClientUseCase,
    getClientUseCase
)

