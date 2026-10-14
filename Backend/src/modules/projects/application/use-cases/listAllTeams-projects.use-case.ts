import { ProjectRepository } from "../domain/project.repository.js";
import { Team } from "../../teams/domain/team.entity.js"
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

interface ListAllTeamsInput{
    id: number
}

export class ListAllTeamsProjectUseCase {
    constructor(
        private projectRepository: ProjectRepository
    ) {}

    async execute(input: ListAllTeamsInput): Promise<Team[]>{

        const project = await this.projectRepository.findById(input.id)

        if (!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        }

        return this.projectRepository.findAllTeams(input.id)
    }
}