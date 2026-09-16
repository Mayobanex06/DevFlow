import { Task } from "../domain/task.entity.js";
import { TaskRepository } from "../domain/task.repository.js";
import { UserRepository } from "../../users/domain/user.repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

interface UpdateTaskUseInput {
    id: number;
    name?: string;
    description?: string | null;
    updateAt?: Date;
    assignedUserId: number;
}

export class UpdateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private userRepository: UserRepository
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


        if (input.assignedUserId !== undefined) {

            const user = await this.userRepository.findById(
                input.assignedUserId
            )

            if (!user) {
                throw new NotFoundError(
                    "USER_NOT_FOUND",
                    "User not found"
                )
            }

            task.changeAssignedUserId(input.assignedUserId)
        }
        return this.taskRepository.update(task)
    }
}