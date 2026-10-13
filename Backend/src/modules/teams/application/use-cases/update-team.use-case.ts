import { NotFoundError } from "../../../../shared/errors/not-found-error.js"
import { ActivityType } from "../../../activities/domain/activities.entity.js"
import { ActivityRecorder } from "../../../activities/domain/activity-recorder.js"
import { TeamRepository } from "../../domain/team.repository.js"

interface UpdateTeamInput {
    teamId: number,
    name?: string,
    description?: string | null,
    userId: number
}

export class UpdateTeamUseCase {
    constructor (
        private teamRepository: TeamRepository,
    ) {}

    async execute(input: UpdateTeamInput){

        const team = await this.teamRepository.findById(input.teamId)

        if (!team){
            throw new NotFoundError(
                "TEAM_NOT_FOUND",
                "Team not found"
            )
        }

        if (input.name === undefined && input.description === undefined){
            // TODO [ERRORS]: Replace with validation error.
            throw new Error("No fields provided to update team")
        }

        team.updateDetails({
            name: input.name,
            description: input.description
        })

        const updatedTeam = await this.teamRepository.update(team)

        return updatedTeam
    }
}