import { NotFoundError } from "../../../../shared/errors/not-found-error.js";
import { ActivityEntityType, ActivityType } from "../../../activities/domain/activities.entity.js";
import { ActivityRecorder } from "../../../activities/domain/activity-recorder.js";
import { ProjectState } from "../../domain/project.entity.js";
import { ProjectRepository } from "../../domain/project.repository.js";

interface ChangeStateInput {
    projectId: number,
    newState: ProjectState,
    userId: number
}

export class ChangeStateProjectUseCase { 
    constructor (
        private projectRepository: ProjectRepository,
        private activityRecorder: ActivityRecorder
    ) {}

    async execute(input: ChangeStateInput): Promise<void> {

        const project = await this.projectRepository.findById(input.projectId)

        if (!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        }

        project.changeState(input.newState)

        await this.projectRepository.changeState(input.projectId, project.state, project.completedAt)

        await this.activityRecorder.record({
            type: ActivityType.PROJECT_UPDATED,
            entityType: ActivityEntityType.PROJECT,
            entityId: input.projectId,
            projectId: input.projectId,
            userId: input.userId
        })
    }
}