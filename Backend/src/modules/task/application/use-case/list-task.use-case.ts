import { NotFoundError } from "../../../../shared/errors/not-found-error.js";
import { RoleCode } from "../../../authorization/domain/role.js";
import { RoleRepository } from "../../../authorization/domain/role.repository.js";
import { UserRepository } from "../../../users/domain/user.repository.js";
import { Task } from "../../domain/task.entity.js";
import { TaskRepository } from "../../domain/task.repository.js";

interface ListTaskInput {
    userId: number
}

export class ListTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private userRepository: UserRepository,
        private roleRepository: RoleRepository
    ) { }

    async execute(input: ListTaskInput): Promise<Task[]> {
        
        const user = await this.userRepository.findById(input.userId)

        if (!user){
            throw new NotFoundError(
                "USER_NOT_FOUND",
                "User not found"
            )
        }

        const userRole = await this.roleRepository.findById(user.roleId)

        if (!userRole){
            throw new NotFoundError(
                "ROLE_NOT_FOUND",
                "Role not found"
            )
        }

        switch (userRole.code){

            case RoleCode.ADMIN:
            case RoleCode.MANAGER:
                return this.taskRepository.findAll()

            case RoleCode.PROJECT_MANAGER:
                return this.taskRepository.findByProjectManagerId(user.id)
            
            case RoleCode.DESIGNER:
            case RoleCode.DEVELOPER:
            case RoleCode.QA:
                return this.taskRepository.findByUserTeams(user.id)
            
            case RoleCode.CLIENT:
                if (user.clientId == null){
                    throw new NotFoundError(
                        "CLIENT_NOT_FOUND",
                        "Client not found"
                    )
                }
                return this.taskRepository.findByClientId(user.clientId)

            default:
                // TODO [ERRORS]: Replace with ForbiddenError.
                throw new Error("User does not have access to tasks")
        }
    }
}