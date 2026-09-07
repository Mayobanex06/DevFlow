import { Team } from "./team.entity.js";

export interface TeamRepository {
    findId(id: number): Promise<Team>
}