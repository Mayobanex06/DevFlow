import { Task } from "../domain/task.entity.js";
import { TaskRepository } from "../domain/task.repository.js";

interface GetTaskInput {
    id: number
}

export class GetTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}
    
    async execute(input: GetTaskInput): Promise<Task | null> {
        return await this.taskRepository.findById(id);
    }
}