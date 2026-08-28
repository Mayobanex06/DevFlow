import { ProjectRepository } from "../domain/project.repository.js";
import { Project } from "../domain/project.entity.js"

type ClientRepository = 0 /* Temporal */

export class CreateProjectUseCase {
    constructor(
        private projectRepository: ProjectRepository, 
        private clientRepostiroy: ClientRepository
    ) {}

    async execute(
        input: CreateProjectInput
    ): Promise<Project> {

        const client = await this.clientRepostiroy.findId(
            input.clientId
        )

        if (!client){
            throw new Error("Client not found")
        }

        const project = new Project({
            name: input.name,
            description: input.description,
            state: 1,
            clientId: input.clientId,
            completedAt: null
        })

    }
}