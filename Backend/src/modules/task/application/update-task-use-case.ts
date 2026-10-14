import { Task } from "../domain/task.entity.js";
import { TaskRepository } from "../domain/task.repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ActivityRecorder } from "../../activities/domain/activity-recorder.js";
import { ActivityEntityType, ActivityType } from "../../activities/domain/activities.entity.js";

interface UpdateTaskUseInput {
    id: number;
    name?: string;
    description?: string | null;
    userId: number;
}

export class UpdateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private activityRecorder: ActivityRecorder
    ) { }

    async execute(input: UpdateTaskUseInput): Promise<Task> {

        const task = await this.taskRepository.findById(
            input.id
        )

        if (!task) {
            throw new NotFoundError(
                "TASK_NOT_FOUND",
                "Task not found"
            )
        }

        if (input.name !== undefined) {
            task.rename(input.name)
        }

        if (input.description !== undefined) {
            task.changeDescription(input.description)
        }

        const hasChanges =
            input.name !== undefined ||
            input.description !== undefined

        if (!hasChanges) {
            throw new Error("No fields provided to update");
        }

        const updatedTask = await this.taskRepository.update(task)

        await this.activityRecorder.record({
            type: ActivityType.TASK_UPDATED,
            entityType: ActivityEntityType.TASK,
            entityId: updatedTask.id,
            projectId: updatedTask.projectId,
            userId: input.userId
        })

        return updatedTask
    }

}