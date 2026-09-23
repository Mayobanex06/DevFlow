import { TaskRepository } from "../domain/task.repository.js";
import { UserRepository } from "../../users/domain/user.repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ActivityRecorder } from "../../activities/domain/activity-recorder.js";
import { ActivityEntityType, ActivityType } from "../../activities/domain/activities.entity.js";

interface AssignTaskInput {
    taskId: number,
    userIdAssign: number,
    userId: number
}

export class AssignTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private userRepository: UserRepository,
        private activityRecorder: ActivityRecorder
    ){}

    async execute(input: AssignTaskInput): Promise<void> {

        const task = await this.taskRepository.findById(input.taskId)

        if(!task) {
            throw new NotFoundError(
                "TASK_NOT_FOUND",
                "Task not found"
            )
        }

        const user = await this.userRepository.findById(input.userIdAssign)

        if(!user) {
            throw new NotFoundError(
                "USER_NOT_FOUND",
                "User not found"
            )
        }

        await this.taskRepository.assignTask(input.taskId, input.userIdAssign)

        await this.activityRecorder.record({
            type: ActivityType.TASK_ASSIGNED,
            entityType: ActivityEntityType.TASK,
            entityId: task.id,
            projectId: task.projectId,
            userId: input.userId
        })
    }
}