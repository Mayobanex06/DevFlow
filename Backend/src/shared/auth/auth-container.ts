import { PostgresUserRepository } from "../../modules/users/infrastructure/postgres-user.repository.js";
import { createAuthenticate } from "./authenticate.js";

const userRepository = new PostgresUserRepository()

export const authenticate = createAuthenticate(userRepository)