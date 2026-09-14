import { PostgresProjectRepository } from "../infrastructure/postgres-project.repository.js";
import { PostgresClientRepository } from "../../clients/infrastructure/postgres-client.repository.js";

import { CreateProjectUseCase } from "../application/create-project.use-case.js";
import { UpdateProjectUseCase } from "../application/update-project.use-case.js";
import { ListProjectsUseCase } from "../application/list-project.use-case.js";
import { GetProjectUseCase } from "../application/get-project.use-case.js";

import { ProjectController } from "./project.controller.js";


const projectRepository = new PostgresProjectRepository();
const clientRepository = new PostgresClientRepository();


const createProjectUseCase = new CreateProjectUseCase(
    projectRepository,
    clientRepository
);

const updateProjectUseCase = new UpdateProjectUseCase(
    projectRepository,
    clientRepository
);

const listProjectsUseCase = new ListProjectsUseCase(
    projectRepository
);

const getProjectUseCase = new GetProjectUseCase(
    projectRepository
);


export const projectController = new ProjectController(
    createProjectUseCase,
    updateProjectUseCase,
    listProjectsUseCase,
    getProjectUseCase
);