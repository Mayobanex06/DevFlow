import { PostgresProjectRepository } from "../infrastructure/postgres-project.repository.js";
import { PostgresClientRepository } from "../../clients/infrastructure/postgres-client.repository.js";

import { CreateProjectUseCase } from "../application/create-project.use-case.js";
import { UpdateProjectUseCase } from "../application/update-project.use-case.js";
import { ListProjectsUseCase } from "../application/list-project.use-case.js";
import { GetProjectUseCase } from "../application/get-project.use-case.js";

import { ProjectController } from "./project.controller.js";
import { PostgresTeamRepository } from "../../teams/infrastructure/postgres-team.repository.js";
import { ListAllTeamsProjectUseCase } from "../application/listAllTeams-projects.use-case.js";
import { AddTeamProjectUseCase } from "../application/addTeam-project.use-case.js";
import { RemoveTeamProjectUseCase } from "../application/removeTeam-project.use-case.js";


const projectRepository = new PostgresProjectRepository();
const clientRepository = new PostgresClientRepository();
const teamRepository = new PostgresTeamRepository();


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

const listAllTeamsProjectUseCase = new ListAllTeamsProjectUseCase(
    projectRepository
)

const addTeamProjectUseCase = new AddTeamProjectUseCase(
    projectRepository,
    teamRepository
)

const removeTeamProjectUseCase = new RemoveTeamProjectUseCase(
    projectRepository,
    teamRepository
)


export const projectController = new ProjectController(
    createProjectUseCase,
    updateProjectUseCase,
    listProjectsUseCase,
    getProjectUseCase,
    listAllTeamsProjectUseCase,
    addTeamProjectUseCase,
    removeTeamProjectUseCase
);