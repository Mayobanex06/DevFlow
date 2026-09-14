import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { UserRepository } from "../../users/domain/user.repository.js";
import { TeamRepository } from "../domain/team.repository.js";

interface RemoveMemberTeamInput {
    teamId: number,
    userId: number
}

export class RemoveMemberFromTeamUseCase {
    constructor(
        private teamRepository: TeamRepository,
        private userRepository: UserRepository
    ) {}

    async execute(input: RemoveMemberTeamInput): Promise<void> {

        const team = await this.teamRepository.findById(input.teamId)

        if (!team){
            throw new NotFoundError(
                "TEAM_NOT_FOUND",
                "Team not found"
            )
        }

        const user = await this.userRepository.findById(input.userId)

        if (!user){
            throw new NotFoundError(
                "USER_NOT_FOUND",
                "User not found"
            )
        }

        const userHasTeam = await this.teamRepository.hasMember(input.teamId, input.userId)

        if (!userHasTeam){
            throw new NotFoundError(
                "TEAM_MEMBER_NOT_FOUND",
                "Team member not found"
            )
        }

        return this.teamRepository.removeMember(input.teamId, input.userId)

    }
}