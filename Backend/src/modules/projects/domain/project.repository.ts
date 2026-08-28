import { Project } from "./project.entity.js"

export interface ProjectRepository {
    create(project: Project): Promise<Project>;
    findById(id: number): Promise<Project | null>
    update(project: Project): Promise<Project> 
}
