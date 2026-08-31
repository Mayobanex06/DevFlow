import { PostgresProjectRepository } from "./src/modules/projects/infrastructure/postgres-project.repository.js";
import { CreateProjectUseCase } from "./src/modules/projects/application/create-project.user-case.js";
import { PostgresClientRepository } from "./src/modules/client/infrastructure/postgres-client.repository.js";
import { CreateClientUseCase } from "./src/modules/client/application/create-client.user-case.js"
import { db } from "./src/shared/database/postgres.js"

const projectRepository = new PostgresProjectRepository();

const clientRepository = new PostgresClientRepository();

const createProject = new CreateProjectUseCase(
    projectRepository,
    clientRepository
);

const createClient = new CreateClientUseCase(
    clientRepository
)

const client = await createClient.execute({
    name: "Jose Armando",
    email: "josearmando@hotmail.com",
    phone: "809-456-3985"
})

console.log({
    clientId: client.id,
    clientName: client.name,
    clientEmail: client.email,
    clientPhone: client.phone,
})

const project = await createProject.execute({
    name: "SpaceDumb",
    description: "Una aplicacion hecha exclusivamente para astronautas",
    clientId: client.id
})

console.log({
    projectId: project.id,
    projectName: project.name,
    projectDescription: project.description,
    projectState: project.state,
    projectClientId: project.clientId
})