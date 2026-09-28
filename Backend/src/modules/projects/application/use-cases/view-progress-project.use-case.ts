import { NotFoundError } from "../../../../shared/errors/not-found-error.js";
import { TaskRepository } from "../../../task/domain/task.repository.js";
import { ProjectAccessPolicy } from "../../domain/project.policy.js";
import { ProjectRepository } from "../../domain/project.repository.js";

interface ProjectProgress {
    projectId: number;
    totalTasks: number;
    completedTasks: number;
    progress: number;
}

interface ViewProgressProjectInput {
    projectId: number,
    userId: number
}

export class ViewProgressProjectUseCase {
    constructor (
        private projectRepository: ProjectRepository,
        private projectAccessPolicy: ProjectAccessPolicy,
        private taskRepository: TaskRepository
    ) {}

    async execute(input: ViewProgressProjectInput): Promise<ProjectProgress> {

        const project = await this.projectRepository.findById(input.projectId)

        if (!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found"
            )
        }

        await this.projectAccessPolicy.ensureCanAccess(project, input.userId)

        const tasks = await this.taskRepository.getProjectTaskStats(input.projectId)
        
        const progress = tasks.totalTasks == 0 
        ? 0
        : Math.round(tasks.completedTasks / tasks.totalTasks * 100)

        return {
            projectId: input.projectId,
            totalTasks: tasks.totalTasks,
            completedTasks: tasks.completedTasks,
            progress
        }
    }
}