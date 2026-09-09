import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ProjectRepository } from "../../projects/domain/project.repository.js";
import { User } from "../domain/user.entity.js";
import { UserRepository } from "../domain/user.repository.js";

interface ListAssignableUsersInput {
    projectId: number
}

export class ListAssignableUsersUseCase {
    constructor(
        private userRepository: UserRepository,
        private projectRepository: ProjectRepository
    ) {}

    async execute(
        input: ListAssignableUsersInput
    ): Promise<User[]> {

        const project = await this.projectRepository.findById(
            input.projectId
        );

        if (!project) {
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            );
        }

        return this.userRepository.findAllAssignableByProjectId(
            input.projectId
        );
    }
}