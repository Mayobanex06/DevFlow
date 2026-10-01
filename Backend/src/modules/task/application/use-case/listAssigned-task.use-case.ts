import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { UserRepository } from "../../users/domain/user.repository.js";
import { Task } from "../domain/task.entity.js";
import { TaskRepository } from "../domain/task.repository.js";

interface ListAssignedTaskInput {
    userId: number;
}

export class ListAssignedTaskUseCase {
    constructor(private taskRepository: TaskRepository,
        private userRepository: UserRepository
    ) { }

    async execute(input: ListAssignedTaskInput): Promise<Task[]> {
        const user = await this.userRepository.findById(
            input.userId
        )

        if (!user) {
            throw new NotFoundError(
                "USER_NOT_FOUND",
                "User not found"
            )
        }
        return this.taskRepository.findAllAssigned(input.userId)

    }
}