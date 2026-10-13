import { ConflictError } from "../../../../shared/errors/conflict-error.js"
import { NotFoundError } from "../../../../shared/errors/not-found-error.js"
import { ActivityType } from "../../../activities/domain/activities.entity.js"
import { ActivityRecorder } from "../../../activities/domain/activity-recorder.js"
import { UserRepository } from "../../../users/domain/user.repository.js"
import { TeamMemberPolicy } from "../../domain/team.policy.js"
import { TeamRepository } from "../../domain/team.repository.js"


interface addMemberTeamInput {
    teamId: number,
    userId: number
}

export class AddMemberToTeamUseCase {
    constructor(
        private teamRepository: TeamRepository,
        private teamMemberPolicy: TeamMemberPolicy,
        private activityRecorder: ActivityRecorder
    ) {}

    async execute(input: addMemberTeamInput): Promise<void> {

        const team = await this.teamRepository.findById(input.teamId)

        if (!team){
            throw new NotFoundError(
                "TEAM_NOT_FOUND",
                "Team not found"
            )
        }

        await this.teamMemberPolicy.ensureValid(input.userId)

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