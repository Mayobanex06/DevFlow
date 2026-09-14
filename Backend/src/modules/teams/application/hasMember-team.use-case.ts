import { TeamRepository } from "../domain/team.repository.js";

interface HasMemberTeamInput {
    teamId: number;
    userId: number;
}

export class HasMemberTeamUseCase {
    constructor(
        private teamRepository: TeamRepository
    ) {}

    async execute(input: HasMemberTeamInput): Promise<boolean> {
        return this.teamRepository.hasMember(
            input.teamId,
            input.userId
        );
    }
}