import { Project } from "./project.entity.js"

export interface ProjectRepository {
    create(project: Project): Promise<Project>
    update(project: Project): Promise<Project>
    findAll(): Promise<Project[]>
    findById(id: number): Promise<Project | null>
}
