import { ProjectRepository } from "../domain/project.repository.js";
import { Project } from "../domain/project.entity.js"
import { ClientRepository } from "../../clients/domain/client.repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ActivityRecorder } from "../../activities/domain/activity-recorder.js";
import { ActivityEntityType, ActivityType } from "../../activities/domain/activities.entity.js";


interface CreateProjectInput {
    name: string;
    description: string | null;
    clientId: number;
    userId: number;
}

export class CreateProjectUseCase {
    constructor(
        private projectRepository: ProjectRepository,
        private clientRepository: ClientRepository,
        private activityRecorder: ActivityRecorder
    ) { }

    async execute(
        input: CreateProjectInput
    ): Promise<Project> {

        const client = await this.clientRepository.findById(
            input.clientId
        )

        if (!client) {
            throw new NotFoundError(
                "CLIENT_NOT_FOUND",
                "Client not found"
            )
        }

        const project = Project.create({
            name: input.name,
            description: input.description,
            state: 1,
            clientId: input.clientId,
            completedAt: null
        })

        const createdProject = await this.projectRepository.create(project)

        await this.activityRecorder.record({
            type: ActivityType.PROJECT_CREATED,
            entityType: ActivityEntityType.PROJECT,
            entityId: createdProject.id,
            projectId: createdProject.id,
            userId: input.userId
        });

        return createdProject

    }
}