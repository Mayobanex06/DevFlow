import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { ClientRepository } from "../../clients/domain/client.repository.js";
import { Project } from "../domain/project.entity.js";
import { ProjectRepository } from "../domain/project.repository.js";

interface UpdateProjectInput {
    id: number, 
    name?: string,
    description?: string | null,
    clientId?: number
}

export class UpdateProjectUseCase {
    constructor(
        private projectRepository: ProjectRepository,
        private clientRepository: ClientRepository    
    ) {}

    async execute(input: UpdateProjectInput): Promise<Project> {

        const project = await this.projectRepository.findById(
            input.id
        )

        if (!project){
            throw new NotFoundError(
                "PROJECT_NOT_FOUND",
                "Project not found")
        }

        if (input.name !== undefined){
            project.rename(input.name)
        }

        if (input.description !== undefined){
            project.changeDescription(input.description)
        }

        if (input.clientId !== undefined){

            const client = await this.clientRepository.findById(
                input.clientId
            )

            if (!client){
                throw new Error("Client not found")
            }

            project.changeClientId(input.clientId)
        }

        return this.projectRepository.update(project)
    }
}