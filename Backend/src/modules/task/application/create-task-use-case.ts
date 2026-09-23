
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ProjectRepository } from "../../projects/domain/project.repository.js";
import { UserRepository } from "../../users/domain/user.repository.js";
import { TaskRepository } from "../domain/task.repository.js";
import { Task } from "../domain/task.entity.js";
import { ActivityRecorder } from "../../activities/domain/activity-recorder.js";
import { ActivityEntityType, ActivityType } from "../../activities/domain/activities.entity.js";


interface CreateTaskInput {
    name: string;
    description: string | null;
    projectId: number;
    assignedUserId: number;
    userId: number
}


export class CreateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private projectRepository: ProjectRepository,
        private userRepository: UserRepository,
        private activityRecorder: ActivityRecorder
    ) { }

    async execute(input: CreateTaskInput): Promise<Task> {
        const project = await this.projectRepository.findById(
            input.projectId
        )

        if (!project) {
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        }
        const user = await this.userRepository.findById(
            input.assignedUserId
        )

        if (!user) {
            throw new NotFoundError(
                "USER_NOT_FOUND",
                "User not found"
            )
        }

        const task = Task.create({
            name: input.name,
            description: input.description,
            projectId: input.projectId,
            assignedUserId: input.assignedUserId
        })

        
        const createdTask = await this.taskRepository.create(task)

        await this.activityRecorder.record({
            type: ActivityType.TASK_CREATED,
            entityType: ActivityEntityType.TASK,
            entityId: createdTask.id,
            projectId: createdTask.projectId,
            userId: input.userId
        })

        return createdTask
    }  
}