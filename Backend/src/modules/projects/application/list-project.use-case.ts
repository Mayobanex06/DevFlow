import { Project } from "../domain/project.entity.js";
import { ProjectRepository } from "../domain/project.repository.js";

export class ListProjectsUseCase {
    constructor(private projectRepository: ProjectRepository){}

    async execute(): Promise<Project[]> {
        return this.projectRepository.findAll()
    }
}