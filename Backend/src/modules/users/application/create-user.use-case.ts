import { ConflictError } from "../../../shared/errors/conflict-error.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { RoleRepository } from "../../role/domain/role.repository.js";
import { AuthUserRepository } from "../domain/auth-user.repository.js";
import { User } from "../domain/user.entity.js";
import { UserRepository } from "../domain/user.repository.js";


interface CreateUserInput {
    authUserId: string,
    name: string,
    roleId: number,
}

export class CreateUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private authUserRepository: AuthUserRepository,
        private roleRepository: RoleRepository
    ) {}

    async execute(input: CreateUserInput): Promise<User> {

        const authUserId = await this.authUserRepository.findByid(
            input.authUserId
        )

        if (!authUserId){
            throw new NotFoundError(
                "AUTH_USER_NOT_FOUND",
                "Auth user not found"
            )
        }

        const existingUser = await this.userRepository.findByAuthUserId(
            input.authUserId
        )

        if (existingUser){
            throw new ConflictError(
                "USER_ALREADY_REGISTERED",
                "User already registered"
            )
        }

        const role = await this.roleRepository.findById(
            input.roleId
        )

        if (!role){
            throw new NotFoundError(
                "ROLE_NOT_FOUND",
                "Role not found"
            )
        }

        const user = User.create({
            authUserId: input.authUserId,
            name: input.name,
            roleId: input.roleId
        })

        return this.userRepository.create(user)
    }
}