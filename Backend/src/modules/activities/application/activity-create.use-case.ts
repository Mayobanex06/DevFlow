import { ProjectRepository } from "../../projects/domain/project.repository.js";
import { Activity } from "../domain/activities.entity.js";
import { ActivityRepository } from "../domain/activities.repository.js";

interface CreateActivityInput {
    action: string;
    description: string | null;
    userId: number,
    taskId: number | null;
    projectId: number
}

export class CreateActivityUseCase {
    constructor(
        private activityRepository: ActivityRepository,
        private userRepository: UserRepository,
        private taskRepository: TaskRepository,
        private projectRepository: ProjectRepository
    ) {}
    
    async execute(
        input: CreateActivityInput
    ): Promise<Activity> {

        const user = await this.userRepository.findId(
            input.userId
        )

        const task = await this.taskRepository.findId(
            input.taskId
        )
        const project = await this.projectRepository.findById(
            input.projectId
        )
        
        if (!user){
            throw new Error ("User not found")
        }
        if (!task){
            throw new Error ("task not found")
        }
        
        if (!project){
            throw new Error ("project not found")
        }

        const activity = Activity.create({
            action: input.action,
            description: input.description,
            userId: input.userId,
            taskId: input.taskId,
            projectId: input.projectId
   })
        return this.activityRepository.create(activity)
        }
    }

     

