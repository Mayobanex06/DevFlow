import { ProjectRepository } from "../domain/project.repository.js";
import { Project } from "../domain/project.entity.js"
import { ClientRepository } from "../../client/domain/client.repository.js";

interface CreateProjectInput {
    name: string;
    description: string | null;
    clientId: number;
}

export class CreateProjectUseCase {
    constructor(
        private projectRepository: ProjectRepository, 
        private clientRepository: ClientRepository
    ) {}

    async execute(
        input: CreateProjectInput
    ): Promise<Project> {

        const client = await this.clientRepository.findId(
            input.clientId
        )

        if (!client){
            throw new Error("Client not found")
        }

        const project = Project.create({
            name: input.name,
            description: input.description,
            state: 1,
            clientId: input.clientId,
            completedAt: null
        })

        return this.projectRepository.create(project)
    }
}