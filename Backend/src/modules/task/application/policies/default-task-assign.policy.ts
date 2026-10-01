import { NotFoundError } from "../../../../shared/errors/not-found-error.js";
import { RoleCode } from "../../../authorization/domain/role.js";
import { RoleRepository } from "../../../authorization/domain/role.repository.js";
import { ProjectRepository } from "../../../projects/domain/project.repository.js";
import { UserRepository } from "../../../users/domain/user.repository.js";
import { TaskAssignPolicy } from "../../domain/task.policy.js";

export class DefaultTaskAssignPolicy implements TaskAssignPolicy {
    constructor (
        private projectRepository: ProjectRepository,
        private userRepository: UserRepository,
        private roleRepository: RoleRepository
    ) {}

    async ensureValid(projectId: number, userId: number): Promise<void> {

        const user = await this.userRepository.findById(userId)

        if (!user){
            throw new NotFoundError(
                "USER_NOT_FOUND",
                "User not found"
            )
        }

        const roleUser = await this.roleRepository.findById(user.roleId)

        if (!roleUser){
            throw new NotFoundError(
                "ROLE_NOT_FOUND",
                "Role not found"
            )
        }

        switch (roleUser.code) {

            case RoleCode.ADMIN:
            case RoleCode.MANAGER:
            case RoleCode.PROJECT_MANAGER:
            case RoleCode.CLIENT:
                // TODO [ERRORS]: Replace with appropriate assignment/domain error.
                throw new Error("User cannot be assigned to tasks")
            
            case RoleCode.DESIGNER:
            case RoleCode.DEVELOPER:
            case RoleCode.QA:
                const hasProject = await this.projectRepository.hasUserThroughTeam(projectId, user.id)
                if (!hasProject){
                    // TODO [ERRORS]: Replace with appropriate assignment/domain error.
                    throw new Error("User cannot be assigned to tasks")
                } return;
            
            default:
                // TODO [ERRORS]: Replace with appropriate assignment/domain error.
                throw new Error("User cannot be assigned to tasks")

        }

    }
}