import { PostgresProjectRepository } from '../../projects/infrastructure/postgres-project.repository.js';
import { GetActivityUseCase } from '../application/get-activity.use-case.js';
import { RecordActivityUseCase } from '../application/record-activity.use-case.js';
import { PostgresActivityRepository } from '../infrastructure/postgres-activity.repository.js';
import { ActivityController } from './activity.controller.js';


const activityRepository = new PostgresActivityRepository();
const projectRepository = new PostgresProjectRepository();

const getActivityUseCase = new GetActivityUseCase(
    activityRepository,
    projectRepository
)

export const activityController = new ActivityController(
    getActivityUseCase
);
