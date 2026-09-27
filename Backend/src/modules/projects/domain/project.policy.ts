import { Project } from "./project.entity.js";

export interface ProjectManagerPolicy {
    ensureValid(projectManagerId: number): Promise<void>;
}

export interface ProjectAccessPolicy {
    ensureCanAccess(project: Project, userId: number): Promise<void>; 
}