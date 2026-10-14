import { NotFoundError } from "../../../../shared/errors/not-found-error.js";
import { RoleCode } from "../../../authorization/domain/role.js";
import { RoleRepository } from "../../../authorization/domain/role.repository.js";
import { UserRepository } from "../../../users/domain/user.repository.js";
import { Project } from "../../domain/project.entity.js";
import { ProjectRepository } from "../../domain/project.repository.js";

interface ListProjectsInput {
    userId: number
}

export class ListProjectsUseCase {
    constructor(
        private projectRepository: ProjectRepository,
        private userRepository: UserRepository,
        private roleRepository: RoleRepository
    ){}

    async execute(input: ListProjectsInput): Promise<Project[]> {
        
        const user = await this.userRepository.findById(input.userId)

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
                return await this.projectRepository.findAll()
            
            case RoleCode.PROJECT_MANAGER:
                return await this.projectRepository.findByProjectManagerId(user.id)

            case RoleCode.DESIGNER:
            case RoleCode.DEVELOPER:
            case RoleCode.QA:
                return await this.projectRepository.findByUserTeams(user.id)

            case RoleCode.CLIENT:
                if (user.clientId == null){
                    throw new NotFoundError(
                        "CLIENT_NOT_FOUND",
                        "Client not found"
                    )
                } return await this.projectRepository.findByClientId(user.clientId)
            
            default:
                // TODO [ERRORS]: Replace with ForbiddenError.
                throw new Error("User does not have access to this project");
        }
    }
}