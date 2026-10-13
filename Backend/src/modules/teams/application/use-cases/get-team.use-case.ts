import { NotFoundError } from "../../../../shared/errors/not-found-error.js"
import { Team } from "../../domain/team.entity.js"
import { TeamRepository } from "../../domain/team.repository.js"


interface GetTeamInput {
    id: number
}

export class GetTeamUseCase {
    constructor(
        private teamRepository: TeamRepository
    ) {}

    async execute(input: GetTeamInput): Promise<Team> {

        const team = await this.teamRepository.findById(input.id)

        if (!team){
            throw new NotFoundError(
                "TEAM_NOT_FOUND",
                "Team not found"
            )
        }

        return team 
    }
}