import { RecordActivityUseCase } from "../../activities/application/record-activity.use-case.js";
import { PostgresActivityRepository } from "../../activities/infrastructure/postgres-activity.repository.js";
import { PostgresRoleRepository } from "../../authorization/infrastructure/postgres-role.repository.js";
import { DefaultProjectAccessPolicy } from "../../projects/application/policies/default-project-access.policy.js";
import { PostgresProjectRepository } from "../../projects/infrastructure/postgres-project.repository.js";
import { PostgresUserRepository } from "../../users/infrastructure/postgres-user.repository.js";
import { DefaultTaskAssignPolicy } from "../application/policies/default-task-assign.policy.js";
import { AssignTaskUseCase } from "../application/use-case/assign-task.use-case.js";
import { CompleteTaskUseCase } from "../application/use-case/complete-task.use-case.js";
import { CreateTaskUseCase } from "../application/use-case/create-task-use-case.js";
import { GetTaskUseCase } from "../application/use-case/get-task.use-case.js";
import { ListTaskUseCase } from "../application/use-case/list-task.use-case.js";
import { ListAssignedTaskUseCase } from "../application/use-case/listAssigned-task.use-case.js";
import { UpdateTaskUseCase } from "../application/use-case/update-task-use-case.js";

import { PostgresTaskRepository } from "../infrastructure/postgres-task.repository.js";
import { TaskController } from "./task.controller.js";

const taskRepository = new PostgresTaskRepository()
const userRepository = new PostgresUserRepository()
const projectRepository = new PostgresProjectRepository()
const roleRepository = new PostgresRoleRepository()
const activityRepository = new PostgresActivityRepository()

const projectAccessPolicy = new DefaultProjectAccessPolicy(
    userRepository,
    roleRepository,
    projectRepository
)

const taskAssignPolicy = new DefaultTaskAssignPolicy(
    projectRepository,
    userRepository,
    roleRepository
)

const activityRecorder = new RecordActivityUseCase(
    activityRepository
)

const getTaskUseCase = new GetTaskUseCase(
    taskRepository,
    projectAccessPolicy,
    projectRepository
)
const listTasksUseCase = new ListTaskUseCase(
    taskRepository,
    userRepository,
    roleRepository
)
const listAllAssignedUseCase = new ListAssignedTaskUseCase(
    taskRepository,
    userRepository
)
const createTaskUseCase = new CreateTaskUseCase(
    taskRepository,
    projectRepository,
    taskAssignPolicy,
    activityRecorder
)
const updateTaskUseCase = new UpdateTaskUseCase(
    taskRepository,
    activityRecorder
)
const assignTaskUseCase = new AssignTaskUseCase(
    taskRepository,
    taskAssignPolicy,
    activityRecorder
)
const completeTaskUseCase = new CompleteTaskUseCase(
    taskRepository,
    activityRecorder
)

export const taskController = new TaskController(
    getTaskUseCase,
    listTasksUseCase,
    listAllAssignedUseCase,
    createTaskUseCase,
    updateTaskUseCase,
    assignTaskUseCase,
    completeTaskUseCase
)