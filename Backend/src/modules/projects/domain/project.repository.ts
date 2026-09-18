import { Project } from "./project.entity.js"
import { Team } from "../../teams/domain/team.entity.js"

export interface ProjectRepository {
    create(project: Project): Promise<Project>
    update(project: Project): Promise<Project>
    findById(id: number): Promise<Project | null>
    findAll(): Promise<Project[]>
    findAllTeams(projectId: number): Promise<Team[]>
    addTeam(projectId: number, teamId: number): Promise<void>
    removeTeam(projectId: number, teamId: number): Promise<void>
    hasTeam(projectId: number, teamId: number): Promise<boolean>
}
