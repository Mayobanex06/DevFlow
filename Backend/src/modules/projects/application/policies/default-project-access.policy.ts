import { NotFoundError } from "../../../../shared/errors/not-found-error.js";
import { RoleCode } from "../../../authorization/domain/role.js";
import { RoleRepository } from "../../../authorization/domain/role.repository.js";
import { UserRepository } from "../../../users/domain/user.repository.js";
import { Project } from "../../domain/project.entity.js";
import { ProjectAccessPolicy } from "../../domain/project.policy.js";
import { ProjectRepository } from "../../domain/project.repository.js";

export class DefaultProjectAccessPolicy implements ProjectAccessPolicy {
    constructor (
        private userRepository: UserRepository,
        private roleRepository: RoleRepository,
        private projectRepository: ProjectRepository
    ) {}

    async ensureCanAccess(project: Project, userId: number): Promise<void> {

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

        switch (roleUser.code){

            case RoleCode.ADMIN:
            case RoleCode.MANAGER:
                return;
            
            case RoleCode.PROJECT_MANAGER:
                if (project.projectManagerId !== user.id){
                    // TODO [ERRORS]: Replace with ForbiddenError.
                    throw new Error("User does not have access to this project");
                } return;
            
            case RoleCode.DESIGNER:
            case RoleCode.DEVELOPER:
            case RoleCode.QA:
                const hasAssignedTeamToProject = await this.projectRepository.hasUserThroughTeam(project.id, userId)
                if (!hasAssignedTeamToProject){
                    // TODO [ERRORS]: Replace with ForbiddenError.
                    throw new Error("User does not have access to this project");
                } return;
            
            case RoleCode.CLIENT:
                if (project.clientId !== user.clientId){
                    // TODO [ERRORS]: Replace with ForbiddenError.
                    throw new Error("User does not have access to this project");
                } return;
            
            default:
                // TODO [ERRORS]: Replace with ForbiddenError.
                throw new Error("User does not have access to this project");
        }
    }
}