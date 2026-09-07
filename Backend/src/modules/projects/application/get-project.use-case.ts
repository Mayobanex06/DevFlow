import { Project } from "../domain/project.entity.js";
import { ProjectRepository } from "../domain/project.repository.js";

interface GetProjectInput {
    id: number
}

export class GetProjectUseCase {
    constructor(
        private projectRepository: ProjectRepository
    ) {}

    async execute(input: GetProjectInput): Promise<Project | null> {
        
        return this.projectRepository.findById(Number(input.id))
    }
}