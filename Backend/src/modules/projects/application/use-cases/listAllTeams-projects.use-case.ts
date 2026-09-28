import { NotFoundError } from "../../../../shared/errors/not-found-error.js"
import { Team } from "../../../teams/domain/team.entity.js"
import { ProjectAccessPolicy } from "../../domain/project.policy.js"
import { ProjectRepository } from "../../domain/project.repository.js"

interface ListAllTeamsInput{
    projectId: number,
    userId: number
}

export class ListAllTeamsProjectUseCase {
    constructor(
        private projectRepository: ProjectRepository,
        private projectAccessPolicy: ProjectAccessPolicy
    ) {}

    async execute(input: ListAllTeamsInput): Promise<Team[]>{

        const project = await this.projectRepository.findById(input.projectId)

        if (!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        }

        await this.projectAccessPolicy.ensureCanAccess(project, input.userId)

        return this.projectRepository.findAllTeams(input.projectId)
    }
}