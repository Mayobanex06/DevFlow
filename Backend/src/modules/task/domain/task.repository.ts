import { Task } from "./task.entity.js";

export interface ProjectTaskStats {
    totalTasks: number,
    completedTasks: number
}

export interface TaskRepository {
    findById(id: number): Promise<Task | null>
    changeState(id: number): Promise<void>
    create(task: Task): Promise<Task>
    update(task: Task): Promise<Task>
    findAll(): Promise<Task[]>
    findAllAssigned(userId: number): Promise<Task[]>
    assignTask(taskId: number, userId: number): Promise<void>
    getProjectTaskStats(projectId: number): Promise<ProjectTaskStats>
}