export interface TeamMemberPolicy {

    ensureValid(userId: number): Promise<void> 

}