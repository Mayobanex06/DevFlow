import { NOTFOUND } from "node:dns";
import { TaskRepository } from "../domain/task.repository.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

class ChangeStateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository

    ) { }

    async execute(
        input: 
) {
        const task = await this.taskRepository.findById(
            input.id)
   )

        if (!task) {
            throw new NotFoundError(
                "TASK_NOT_FOUND", "Task not found"
            )
        }

        if (task.completedAt === null)
   }

}
   
}

}
