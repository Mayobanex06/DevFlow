import { ConflictError } from "../../../shared/errors/conflict-error.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ActivityEntityType, ActivityType } from "../../activities/domain/activities.entity.js";
import { ActivityRecorder } from "../../activities/domain/activity-recorder.js";
import { TeamRepository } from "../../teams/domain/team.repository.js";
import { ProjectRepository } from "../domain/project.repository.js";

interface addTeamProjectInput {
    projectId: number,
    teamId: number,
    userId: number
} 

export class AddTeamProjectUseCase {
    constructor(
        private projectRepository: ProjectRepository,
        private teamRepository: TeamRepository,
        private activityRecorder: ActivityRecorder
    ) {}

    async execute(input: addTeamProjectInput): Promise<void> {

        const project = await this.projectRepository.findById(input.projectId)

        if (!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        }

        const team = await this.teamRepository.findById(input.teamId)
        
        if (!team){
            throw new NotFoundError(
                "TEAM_NOT_FOUND",
                "Team not found"
            )
        }

        const hasTeam = await this.projectRepository.hasTeam(input.projectId, input.teamId)

        if (hasTeam){
            throw new ConflictError(
                "TEAM_PROJECT_ALREADY_EXISTS",
                "Team is already assigned to project"
            )
        }

        await this.projectRepository.addTeam(input.projectId, input.teamId)

        await this.activityRecorder.record({
            type: ActivityType.TEAM_ADDED_TO_PROJECT,
            entityType: ActivityEntityType.TEAM,
            entityId: input.teamId,
            projectId: input.projectId,
            userId: input.userId
        })

    }
}