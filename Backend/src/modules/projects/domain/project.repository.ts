import { Project, ProjectState } from "./project.entity.js"
import { Team } from "../../teams/domain/team.entity.js"

export interface ProjectRepository {
    create(project: Project): Promise<Project>
    update(project: Project): Promise<Project>
    findById(id: number): Promise<Project | null>
    findAll(): Promise<Project[]>
    findByProjectManagerId(projectManagerId: number): Promise<Project[]>
    findByUserTeams(userId: number): Promise<Project[]>
    findByClientId(clientId: number): Promise<Project[]>
    findAllTeams(projectId: number): Promise<Team[]>
    assignProjectManager(projectId: number, projectManagerId: number): Promise<Project>
    changeState(projectId: number, newState: ProjectState, completedAt: Date | null): Promise<void>
    addTeam(projectId: number, teamId: number): Promise<void>
    removeTeam(projectId: number, teamId: number): Promise<void>
    hasTeam(projectId: number, teamId: number): Promise<boolean>
    hasUserThroughTeam(projectId: number, userId: number): Promise<boolean>;
}
