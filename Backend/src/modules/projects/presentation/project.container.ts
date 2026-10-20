import { PostgresProjectRepository } from "../infrastructure/postgres-project.repository.js";
import { PostgresClientRepository } from "../../clients/infrastructure/postgres-client.repository.js";

import { CreateProjectUseCase } from "../application/use-cases/create-project.use-case.js";
import { UpdateProjectUseCase } from "../application/use-cases/update-project.use-case.js";
import { ListProjectsUseCase } from "../application/use-cases/list-project.use-case.js";
import { GetProjectUseCase } from "../application/use-cases/get-project.use-case.js";

import { ProjectController } from "./project.controller.js";
import { PostgresTeamRepository } from "../../teams/infrastructure/postgres-team.repository.js";
import { ListAllTeamsProjectUseCase } from "../application/use-cases/listAllTeams-projects.use-case.js";
import { AddTeamProjectUseCase } from "../application/use-cases/addTeam-project.use-case.js";
import { RemoveTeamProjectUseCase } from "../application/use-cases/removeTeam-project.use-case.js";
import { PostgresUserRepository } from "../../users/infrastructure/postgres-user.repository.js";
import { PostgresRoleRepository } from "../../authorization/infrastructure/postgres-role.repository.js";
import { DefaultProjectManagerPolicy } from "../application/policies/default-project-manager.policy.js";
import { PostgresActivityRepository } from "../../activities/infrastructure/postgres-activity.repository.js";
import { RecordActivityUseCase } from "../../activities/application/record-activity.use-case.js";
import { DefaultProjectAccessPolicy } from "../application/policies/default-project-access.policy.js";
import { ViewProgressProjectUseCase } from "../application/use-cases/view-progress-project.use-case.js";
import { PostgresTaskRepository } from "../../task/infrastructure/postgres-task.repository.js";
import { ChangeStateProjectUseCase } from "../application/use-cases/change-state-project.use-case.js";
import { AssignProjectManagerUseCase } from "../application/use-cases/assign-project-manager.use-case.js";

const projectRepository = new PostgresProjectRepository();
const clientRepository = new PostgresClientRepository();
const teamRepository = new PostgresTeamRepository();
const userRepository = new PostgresUserRepository();
const roleRepository = new PostgresRoleRepository();
const activityRepository = new PostgresActivityRepository();
const taskRepository = new PostgresTaskRepository();

const projectManagerPolicy = new DefaultProjectManagerPolicy(
    userRepository,
    roleRepository
);
const projectAccessPolicy = new DefaultProjectAccessPolicy(
    userRepository,
    roleRepository,
    projectRepository
)
const activityRecorder = new RecordActivityUseCase(
    activityRepository
)


const createProjectUseCase = new CreateProjectUseCase(
    projectRepository,
    projectManagerPolicy,
    clientRepository,
    activityRecorder
);

const updateProjectUseCase = new UpdateProjectUseCase(
    projectRepository,
    clientRepository,
    activityRecorder
);

const listProjectsUseCase = new ListProjectsUseCase(
    projectRepository,
    userRepository,
    roleRepository
);

const getProjectUseCase = new GetProjectUseCase(
    projectRepository,
    projectAccessPolicy
);

const listAllTeamsProjectUseCase = new ListAllTeamsProjectUseCase(
    projectRepository,
    projectAccessPolicy
)

const addTeamProjectUseCase = new AddTeamProjectUseCase(
    projectRepository,
    teamRepository,
    activityRecorder
)

const removeTeamProjectUseCase = new RemoveTeamProjectUseCase(
    projectRepository,
    teamRepository,
    activityRecorder
)

const viewProgressProjectUseCase = new ViewProgressProjectUseCase(
    projectRepository,
    projectAccessPolicy,
    taskRepository
)

const changeStateProjectUseCase = new ChangeStateProjectUseCase(
    projectRepository,
    activityRecorder
)

const assignProjectManager = new AssignProjectManagerUseCase(
    projectRepository,
    projectManagerPolicy,
    activityRecorder
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