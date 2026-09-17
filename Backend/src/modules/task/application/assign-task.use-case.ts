import { TaskRepository } from "../domain/task.repository.js";
import { UserRepository } from "../../users/domain/user.repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

interface AssignTaskInput {
    taskId: number,
    userId: number
}

export class AssignTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private userRepository: UserRepository 
    ){}

    async execute(input: AssignTaskInput): Promise<void> {

        const task = await this.taskRepository.findById(input.taskId)

        if(!task) {
            throw new NotFoundError(
                "TASK_NOT_FOUND",
                "Task not found"
            )
        }

        const user = await this.userRepository.findById(input.userId)

        if(!user) {
            throw new NotFoundError(
                "USER_NOT_FOUND",
                "User not found"
            )
        }

        await this.taskRepository.assignTask(input.taskId, input.userId)
    }
}