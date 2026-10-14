import { ConflictError } from "../../../../shared/errors/conflict-error.js";
import { NotFoundError } from "../../../../shared/errors/not-found-error.js";
import { ActivityEntityType, ActivityType } from "../../../activities/domain/activities.entity.js";
import { ActivityRecorder } from "../../../activities/domain/activity-recorder.js";
import { ProjectManagerPolicy } from "../../domain/project.policy.js";
import { Project } from "../../domain/project.entity.js";
import { ProjectRepository } from "../../domain/project.repository.js";

interface AssignProjectManagerInput {
    projectId: number,
    projectManagerId: number,
    userId: number
}

export class AssignProjectManagerUseCase {
    constructor (
        private projectRepository: ProjectRepository,
        private projectManagerPolicy: ProjectManagerPolicy,
        private activityRecorder: ActivityRecorder
    ) {}

    async execute(input: AssignProjectManagerInput): Promise<Project> {

        const project = await this.projectRepository.findById(input.projectId)

        if (!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        }

        if (project.projectManagerId === input.projectManagerId){
            throw new ConflictError(
                "PROJECT_MANAGER_ALREADY_ASSIGNED",
                "Project manager is already assigned to this project"
            )
        }

        await this.projectManagerPolicy.ensureValid(input.projectManagerId)

        const assignedProject = await this.projectRepository.assignProjectManager(input.projectId, input.projectManagerId)

        await this.activityRecorder.record({
            type: ActivityType.PROJECT_MANAGER_CHANGED,
            entityType: ActivityEntityType.PROJECT,
            entityId: input.projectId,
            projectId: input.projectId,
            userId: input.userId
        })

        return assignedProject
    }
}