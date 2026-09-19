import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ProjectRepository } from "../../projects/domain/project.repository.js";
import { Activity } from "../domain/activities.entity.js";
import { ActivityRepository } from "../domain/activities.repository.js";

interface GetActivityInput {
    projectId: number
}

export class GetActivityUseCase {
    constructor(
        private activityRepository: ActivityRepository,
        private projectRepository: ProjectRepository
    ){}

    async execute(input: GetActivityInput): Promise<Activity[]> {

        const project = await this.projectRepository.findById(input.projectId)

        if (!project) {
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        }

        return this.activityRepository.findByProjectId(input.projectId)
    }
}