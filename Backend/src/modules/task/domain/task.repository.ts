import { Task } from "./task.entity.js";

export interface ProjectTaskStats {
    totalTasks: number,
    completedTasks: number
}

export interface TaskRepository {
    findById(id: number): Promise<Task | null>
    complete(task: Task): Promise<void>
    create(task: Task): Promise<Task>
    update(task: Task): Promise<Task>
    findAll(): Promise<Task[]>
    findByProjectManagerId(projectManagerId: number): Promise<Task[]>;
    findByUserTeams(userId: number): Promise<Task[]>;
    findByClientId(clientId: number): Promise<Task[]>;
    findByAssignedUserId(userId: number): Promise<Task[]>
    assignTask(task: Task): Promise<void>
    getProjectTaskStats(projectId: number): Promise<ProjectTaskStats>
}