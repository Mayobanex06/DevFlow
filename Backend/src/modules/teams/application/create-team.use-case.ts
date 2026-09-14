import { Team } from "../domain/team.entity.js";
import { TeamRepository } from "../domain/team.repository.js";

interface CreateTeamInput {
    name: string,
    description: string,
}
export class CreateTeamUseCase {
    constructor (
        private teamRepository: TeamRepository
    ) {}

    async execute(input: CreateTeamInput): Promise<Team> {

        const team = Team.create({
            name: input.name,
            description: input.description
        })

        return this.teamRepository.create(team)
    }
}