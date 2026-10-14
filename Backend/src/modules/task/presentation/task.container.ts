import { PostgresProjectRepository } from "../../projects/infrastructure/postgres-project.repository.js";
import { PostgresUserRepository } from "../../users/infrastructure/postgres-user.repository.js";
import { AssignTaskUseCase } from "../application/assign-task.use-case.js";
import { ChangeStateTaskUseCase } from "../application/changeState-task.use-case.js";
import { CreateTaskUseCase } from "../application/create-task-use-case.js";
import { GetTaskUseCase } from "../application/get-task.use-case.js";
import { ListTaskUseCase } from "../application/list-task.use-case.js";
import { ListAssignedTaskUseCase } from "../application/listAssigned-task.use-case.js";
import { UpdateTaskUseCase } from "../application/update-task-use-case.js";
import { PostgresTaskRepository } from "../infrastructure/postgres-task.repository.js";
import { TaskController } from "./task.controller.js";

const taskRepository = new PostgresTaskRepository()
const userRepository = new PostgresUserRepository()
const projectRepository = new PostgresProjectRepository()

const getTaskUseCase = new GetTaskUseCase(taskRepository)
const listTasksUseCase = new ListTaskUseCase(taskRepository)
const listAllAssignedUseCase = new ListAssignedTaskUseCase(
    taskRepository,
    userRepository
)
const createTaskUseCase = new CreateTaskUseCase(
    taskRepository,
    projectRepository,
    userRepository
)
const updateTaskUseCase = new UpdateTaskUseCase(
    taskRepository,
    userRepository
)
const assignTaskUseCase = new AssignTaskUseCase(
    taskRepository,
    userRepository
)
const changeStateTaskUseCase = new ChangeStateTaskUseCase(
    taskRepository
)

export const taskController = new TaskController(
    getTaskUseCase,
    listTasksUseCase,
    listAllAssignedUseCase,
    createTaskUseCase,
    updateTaskUseCase,
    assignTaskUseCase,
    changeStateTaskUseCase
)