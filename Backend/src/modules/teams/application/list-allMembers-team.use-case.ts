import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { User } from "../../users/domain/user.entity.js";
import { TeamRepository } from "../domain/team.repository.js";

interface ListAllMembersTeamInput {
    teamId: number
}

export class ListAllMembersTeamUseCase {
    constructor(
        private teamRepository: TeamRepository
    ) {}

    async execute(input: ListAllMembersTeamInput): Promise<User[]> {

        const team = await this.teamRepository.findById(input.teamId)

        if (!team){
            throw new NotFoundError(
                "TEAM_NOT_FOUND",
                "Team not found"
            )
        }

        return this.teamRepository.findAllMembers(input.teamId)
    }
}