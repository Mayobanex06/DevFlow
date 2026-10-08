import { NotFoundError } from "../../../../shared/errors/not-found-error.js";
import { RoleCode } from "../../../authorization/domain/role.js";
import { RoleRepository } from "../../../authorization/domain/role.repository.js";
import { UserRepository } from "../../../users/domain/user.repository.js";
import { TeamMemberPolicy } from "../../domain/team.policy.js";

export class DefaultTeamMemberPolicy implements TeamMemberPolicy {
    
    constructor(
        private userRepository: UserRepository,
        private roleRepository: RoleRepository
    ) {}

    async ensureValid(userId: number): Promise<void> {
        
        const user = await this.userRepository.findById(userId)

        if (!user){
            throw new NotFoundError(
                "USER_NOT_FOUND",
                "User not found"
            )
        }

        const roleUser = await this.roleRepository.findById(user.roleId)

        if (!roleUser) {
            throw new NotFoundError(
                "ROLE_NOT_FOUND",
                "Role not found"
            )
        }

        switch (roleUser.code){

            case RoleCode.ADMIN:
            case RoleCode.MANAGER:
            case RoleCode.PROJECT_MANAGER:
            case RoleCode.CLIENT:
                // TODO [ERRORS]: Replace with appropriate domain error.
                throw new Error("User role is not allowed to join a team");
            
            case RoleCode.DESIGNER:
            case RoleCode.DEVELOPER:
            case RoleCode.QA:
                return

            default:
                // TODO [ERRORS]: Replace with appropriate domain error.
                throw new Error("User role is not allowed to join a team");
        }
    }

}