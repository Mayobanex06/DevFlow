import { Task } from "../domain/task.entity.js";
import { TaskRepository } from "../domain/task.repository.js";

export class ListTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(): Promise<Task[]> {
        return this.taskRepository.findAll()
    }
}