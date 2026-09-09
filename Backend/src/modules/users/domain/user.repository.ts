import { User } from "./user.entity.js";

export interface UserRepository {
    create(user: User): Promise<User>
    findAll(): Promise<User[]>
    findById(id: number): Promise<User | null>
    findAllAssignableByProjectId(projectId: number): Promise<User[]>
    findByAuthUserId(authUserId: string): Promise<User | null>; 
}