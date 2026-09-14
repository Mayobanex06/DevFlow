import { Team } from "../domain/team.entity.js";
import { TeamRepository } from "../domain/team.repository.js";

interface GetTeamInput {
    id: number
}

export class GetTeamUseCase {
    constructor(
        private teamRepository: TeamRepository
    ) {}

    async execute(input: GetTeamInput): Promise<Team | null> {

        return this.teamRepository.findById(input.id)
    }
}