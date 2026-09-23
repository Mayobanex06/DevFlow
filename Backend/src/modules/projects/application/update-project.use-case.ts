import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ActivityEntityType, ActivityType } from "../../activities/domain/activities.entity.js";
import { ActivityRecorder } from "../../activities/domain/activity-recorder.js";
import { ClientRepository } from "../../clients/domain/client.repository.js";
import { Project } from "../domain/project.entity.js";
import { ProjectRepository } from "../domain/project.repository.js";

interface UpdateProjectInput {
    id: number, 
    name?: string,
    description?: string | null,
    clientId?: number
    userId: number
}

export class UpdateProjectUseCase {
    constructor(
        private projectRepository: ProjectRepository,
        private clientRepository: ClientRepository,
        private activityRecorder: ActivityRecorder    
    ) {}

    async execute(input: UpdateProjectInput): Promise<Project> {

        const project = await this.projectRepository.findById(
            input.id
        )

        if (!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found")
        }

        if (input.name !== undefined){
            project.rename(input.name)
        }

        if (input.description !== undefined){
            project.changeDescription(input.description)
        }

        if (input.clientId !== undefined){

            const client = await this.clientRepository.findById(
                input.clientId
            )

            if (!client){
                throw new NotFoundError(
                    "CLIENT_NOT_FOUND",
                    "Client not found"
                )
            }

            project.changeClientId(input.clientId)
        }

        const hasChanges =
            input.name !== undefined ||
            input.description !== undefined ||
            input.clientId !== undefined;

        if (!hasChanges) {
            throw new Error("No fields provided to update");
        }

        const updatedProject = await this.projectRepository.update(project)

        await this.activityRecorder.record({
            type: ActivityType.PROJECT_UPDATED,
            entityType: ActivityEntityType.PROJECT,
            entityId: updatedProject.id,
            projectId: updatedProject.id,
            userId: input.userId
        })

        return updatedProject
    }
}