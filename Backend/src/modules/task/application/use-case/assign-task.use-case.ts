import { NotFoundError } from "../../../../shared/errors/not-found-error.js"
import { ActivityEntityType, ActivityType } from "../../../activities/domain/activities.entity.js"
import { ActivityRecorder } from "../../../activities/domain/activity-recorder.js"
import { TaskAssignPolicy } from "../../domain/task.policy.js"
import { TaskRepository } from "../../domain/task.repository.js"


interface AssignTaskInput {
    taskId: number,
    userIdAssign: number,
    userId: number
}

export class AssignTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private taskAssignPolicy: TaskAssignPolicy,
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

        await this.taskAssignPolicy.ensureValid(task.projectId, input.userIdAssign)

        task.assignTo(input.userIdAssign)

        await this.taskRepository.assignTask(task)

        await this.activityRecorder.record({
            type: ActivityType.TASK_ASSIGNED,
            entityType: ActivityEntityType.TASK,
            entityId: task.id,
            projectId: task.projectId,
            userId: input.userId
        })
    }
}