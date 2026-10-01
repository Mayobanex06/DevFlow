export interface TaskAssignPolicy {

    ensureValid(projectId: number, userId: number): Promise<void> 

}