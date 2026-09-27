import { NotFoundError } from "../../../../shared/errors/not-found-error.js";
import { Project } from "../../domain/project.entity.js";
import { ProjectAccessPolicy } from "../../domain/project.policy.js";
import { ProjectRepository } from "../../domain/project.repository.js";

interface GetProjectInput {
    projectId: number,
    userId: number
}

export class GetProjectUseCase {
    constructor(
        private projectRepository: ProjectRepository,
        private projectAccessPolicy: ProjectAccessPolicy
    ) {}

    async execute(input: GetProjectInput): Promise<Project> {
        
        const project = await this.projectRepository.findById(input.projectId)

        if (!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        }

        await this.projectAccessPolicy.ensureCanAccess(project, input.userId)

        return project
    }
}