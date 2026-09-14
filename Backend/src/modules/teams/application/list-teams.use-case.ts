import { Team } from "../domain/team.entity.js";
import { TeamRepository } from "../domain/team.repository.js";

export class ListTeamsUseCase {
    constructor (
        private teamRepository: TeamRepository
    ) {}

    async execute(): Promise<Team[]>{
        return this.teamRepository.findAll()
    }
}