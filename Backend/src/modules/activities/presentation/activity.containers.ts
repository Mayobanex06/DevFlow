import { PostgresProjectRepository } from '../../projects/infrastructure/postgres-project.repository.js';
import { PostgresActivityRepository } from '../infrastructure/postgres=activity.repository.js';
import { PostgresTaskrRepository } from '../task/infrastructure/postgres-task.repository.js';
import { PostgresUserRepository } from '../user/infrastructure/postgres-user.repository.js';
import { CreateActivityUseCase } from '../application/activity-create.use-case.js';
import { ActivityController } from './activity.routes.js';

const activityRepository = new PostgresActivityRepository();
const userRepository = new PostgresUserRepository();
const taskRepository = new PostgresTaskrRepository();
const projectRepository = new PostgresProjectRepository();

const CreateActivityUseCase = new CreateActivityUseCase(
    activityRepository,
    userRepository,
    taskRepository,
    projectReposity
);

export const activityController = new ActivityController(
    CreateActivityUseCase
);
