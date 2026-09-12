export enum RoleCode {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    PROJECT_MANAGER = "PROJECT_MANAGER",
    DEVELOPER = "DEVELOPER",
    QA = "QA",
    DESIGNER = "DESIGNER",
    CLIENT = "CLIENT",
}

export interface Role {
    id: number,
    name: string,
    code: RoleCode,
}