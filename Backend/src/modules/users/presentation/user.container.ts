import { CreateUserUseCase } from "../application/create-user.use-case.js";
import { PostgresUserRepository } from "../infrastructure/postgres-user.repository.js";
import { ListUsersUseCase } from "../application/list-users.use-case.js";
import { GetUserUseCase } from "../application/get-user.use-case.js";
import { ListAssignableUsersUseCase } from "../application/list-user-assignable-project.use-case.js";
import { GetUserByAuthUserIdUseCase } from "../application/get-auth-user.use-case.js";
import { PostgresAuthUserRepository } from "../infrastructure/postgres-authUser.repository.js";

import { PostgresRoleRepository } from "../../authorization/infrastructure/postgres-role.repository.js";
import { PostgresProjectRepository } from "../../projects/infrastructure/postgres-project.repository.js";
import { UserController } from "./user.controller.js";

const userRepository = new PostgresUserRepository();
const authUserRepository = new PostgresAuthUserRepository();
const roleRepository = new PostgresRoleRepository();
const projectRepository = new PostgresProjectRepository();

const createUserUseCase = new CreateUserUseCase(
    userRepository, 
    authUserRepository,
    roleRepository
);

const listUsersUseCase = new ListUsersUseCase(
    userRepository
);
const listAssignableUsersUseCase = new ListAssignableUsersUseCase(
    userRepository,
    projectRepository
);
const getUserUseCase = new GetUserUseCase(
    userRepository
);
const getUserByAuthUserIdUseCase = new GetUserByAuthUserIdUseCase(
    userRepository
);

export const userController = new UserController(
    createUserUseCase,
    listUsersUseCase,
    listAssignableUsersUseCase,
    getUserUseCase,
    getUserByAuthUserIdUseCase
);
