import { TaskRepository } from "../domain/task.repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ActivityRecorder } from "../../activities/domain/activity-recorder.js";
import { ActivityEntityType, ActivityType } from "../../activities/domain/activities.entity.js";

interface ChangeStateTaskInput {
    id: number
    userId: number
}

export class ChangeStateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private activityRecorder: ActivityRecorder
    ){}

    async execute(input: ChangeStateTaskInput): Promise<void> {

        const task = await this.taskRepository.findById(input.id)

        if(!task) {
            throw new NotFoundError(
                "TASK_NOT_FOUND",
                "Task not found"
            )
        }

        await this.taskRepository.changeState(input.id)

        await this.activityRecorder.record({
            type: ActivityType.TASK_STATE_CHANGED,
            entityType: ActivityEntityType.TASK,
            entityId: task.id,
            projectId: task.projectId,
            userId: input.userId
        });
    }
}