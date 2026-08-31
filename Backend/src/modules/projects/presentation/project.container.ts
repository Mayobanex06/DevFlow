import { CreateProjectUseCase } from "../application/create-project.user-case.js";
import { PostgresProjectRepository } from "../infrastructure/postgres-project.repository.js";
import { PostgresClientRepository } from "../../client/infrastructure/postgres-client.repository.js";
import { ProjectController } from "./project.controller.js";

const projectRepository = new PostgresProjectRepository();
const clientRepository = new PostgresClientRepository();

const createProjectUseCase = new CreateProjectUseCase(
    projectRepository,
    clientRepository
);

export const projectController = new ProjectController(
    createProjectUseCase
);