import { TaskRepository } from "../domain/task.repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

interface ChangeStateTaskInput {
    id: number
}

export class ChangeStateTaskUseCase {
    constructor(private taskRepository: TaskRepository){}

    async execute(input: ChangeStateTaskInput): Promise<void> {

        const task = await this.taskRepository.findById(input.id)

        if(!task) {
            throw new NotFoundError(
                "TASK_NOT_FOUND",
                "Task not found"
            )
        }

        await this.taskRepository.changeState(input.id)
    }
}