import { PostgresProjectRepository } from "../../projects/infrastructure/postgres-project.repository.js";
import { PostgresTaskRepository } from "../../task/infrastructure/postgres-task.repository.js";
import { CreateDocumentUseCase } from "../application/create-document.use-case.js";
import { DeleteDocumentUseCase } from "../application/delete-document.use-case.js";
import { GetDocumentUseCase } from "../application/get-document.use-case.js";
import { GetByProjectIdDocumentUseCase } from "../application/getByProjectId-document.use-case.js";
import { GetByTaskIdDocumentUseCase } from "../application/getByTaskId-document.use-case.js";
import { PostgresDocumentRepository } from "../infrastructure/postgres-document.repository.js";
import { DocumentController } from "./document.controller.js";

const documentRepository = new PostgresDocumentRepository()
const projectRepository = new PostgresProjectRepository()
const taskRepository = new PostgresTaskRepository()

const getDocumentUseCase = new GetDocumentUseCase(documentRepository)
const getByProjectIdDocumentUseCase = new GetByProjectIdDocumentUseCase(
    documentRepository,
    projectRepository
)
const getByTaskIdDocumentUseCase = new GetByTaskIdDocumentUseCase(
    documentRepository,
    taskRepository
)
const createDocumentUseCase = new CreateDocumentUseCase(
    documentRepository,
    projectRepository,
    taskRepository
)
const deleteDocumentUseCase = new DeleteDocumentUseCase(
    documentRepository
)

export const documentController = new DocumentController(
    getDocumentUseCase,
    getByProjectIdDocumentUseCase,
    getByTaskIdDocumentUseCase,
    createDocumentUseCase,
    deleteDocumentUseCase
)