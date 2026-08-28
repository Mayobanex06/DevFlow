import { Project } from "../domain/project.entity.js";
import { ProjectRepository } from "../domain/project.repository.js";

interface UpdateProjectInput {
    id: number, 
    name?: string,
    description?: string | null,
    clientId?: number
}

class UpdateProjectUseCase {
    constructor(private projectRepository: ProjectRepository) {}

    async execute(input: UpdateProjectInput): Promise<Project> {

        const project = await this.projectRepository.findById(
            input.id
        )

        if (!project){
            throw new Error("Project not found")
        }

        if (input.name !== undefined){
            project.rename(input.name)
        }

        if (input.description !== undefined){
            project.changeDescription(input.description)
        }

        return this.projectRepository.update(project)
    }
}