import { User } from "../../users/domain/user.entity.js";
import { Team } from "./team.entity.js";

export interface TeamRepository {
    findById(id: number): Promise<Team | null>
    create(team: Team): Promise<Team>
    findAll(): Promise<Team[]> 
    findAllMembers(teamId: number): Promise<User[]>
    addMember(teamId: number, userId: number): Promise<void> 
    removeMember(teamId: number, userId: number): Promise<void>
    hasMember(teamId: number, userId: number): Promise<boolean> 
}