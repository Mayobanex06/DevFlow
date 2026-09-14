import { ConflictError } from "../../../shared/errors/conflict-error.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { UserRepository } from "../../users/domain/user.repository.js";
import { TeamRepository } from "../domain/team.repository.js";

interface addMemberTeamInput {
    teamId: number,
    userId: number
}

export class AddMemberToTeamUseCase {
    constructor(
        private teamRepository: TeamRepository,
        private userRepository: UserRepository
    ) {}

    async execute(input: addMemberTeamInput): Promise<void> {

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

        if (userHasTeam){
            throw new ConflictError(
                "TEAM_MEMBER_ALREADY_EXISTS",
                "Team member already exists"
            )
        }

        return this.teamRepository.addMember(input.teamId, input.userId)

    }
}