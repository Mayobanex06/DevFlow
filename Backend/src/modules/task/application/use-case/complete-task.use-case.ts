import { NotFoundError } from "../../../../shared/errors/not-found-error.js"
import { ActivityEntityType, ActivityType } from "../../../activities/domain/activities.entity.js"
import { ActivityRecorder } from "../../../activities/domain/activity-recorder.js"
import { TaskRepository } from "../../domain/task.repository.js"


interface CompleteTaskInput {
    id: number
    userId: number
}

export class ChangeStateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private activityRecorder: ActivityRecorder
    ){}

    async execute(input: CompleteTaskInput): Promise<void> {

        const task = await this.taskRepository.findById(input.id)

        if(!task) {
            throw new NotFoundError(
                "TASK_NOT_FOUND",
                "Task not found"
            )
        }

        task.complete()

        await this.taskRepository.complete(task)

        await this.activityRecorder.record({
            type: ActivityType.TASK_COMPLETED,
            entityType: ActivityEntityType.TASK,
            entityId: task.id,
            projectId: task.projectId,
            userId: input.userId
        });
    }
}