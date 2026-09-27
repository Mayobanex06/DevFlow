import { NotFoundError } from "../../../../shared/errors/not-found-error.js";
import { RoleCode } from "../../../authorization/domain/role.js";
import { RoleRepository } from "../../../authorization/domain/role.repository.js";
import { UserRepository } from "../../../users/domain/user.repository.js";
import { ProjectManagerPolicy } from "../../domain/project.policy.js";

export class DefaultProjectManagerPolicy implements ProjectManagerPolicy {

    constructor(
        private userRepository: UserRepository,
        private roleRepository: RoleRepository
    ) {}

    async ensureValid(userId: number): Promise<void> {

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError(
                "USER_NOT_FOUND",
                "User not found"
            );
        }

        const role = await this.roleRepository.findById(
            user.roleId
        );

        if (!role) {
            throw new NotFoundError(
                "ROLE_NOT_FOUND",
                "Role not found"
            );
        }

        if (role.code !== RoleCode.PROJECT_MANAGER) {
            // TODO [ERRORS]: Replace with a validation error.
            throw new Error(
                "Selected user must have PROJECT_MANAGER role"
            );
        }
    }
}