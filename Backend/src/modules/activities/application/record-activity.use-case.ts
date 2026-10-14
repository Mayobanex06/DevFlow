import { Activity } from "../domain/activities.entity.js";
import { ActivityRepository } from "../domain/activities.repository.js";
import { ActivityRecorder, RecordActivityInput } from "../domain/activity-recorder.js";

export class RecordActivityUseCase implements ActivityRecorder {
    constructor(
        private activityRepository: ActivityRepository
    ){}

    async record(input: RecordActivityInput): Promise<void> {

        const activity = Activity.create({
            ...input,
            description: input.description ?? null
        })

        await this.activityRepository.create(activity)
    }
}