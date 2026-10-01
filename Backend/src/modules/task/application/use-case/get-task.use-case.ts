import { NotFoundError } from "../../../../shared/errors/not-found-error.js";
import { ProjectAccessPolicy } from "../../../projects/domain/project.policy.js";
import { ProjectRepository } from "../../../projects/domain/project.repository.js";
import { Task } from "../../domain/task.entity.js";
import { TaskRepository } from "../../domain/task.repository.js";


interface GetTaskInput {
    id: number,
    userId: number
}

export class GetTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private projectAccessPolicy: ProjectAccessPolicy,
        private projectRepository: ProjectRepository
    ) {}
    
    async execute(input: GetTaskInput): Promise<Task> {
        
        const task = await this.taskRepository.findById(input.id)

        if (!task){
            throw new NotFoundError(
                "TASK_NOT_FOUND",
                "Task not found"
            )
        }

        const project = await this.projectRepository.findById(task.projectId)

        if (!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        }

        await this.projectAccessPolicy.ensureCanAccess(project, input.userId)

        return task
    }
}