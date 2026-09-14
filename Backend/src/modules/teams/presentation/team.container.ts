import { CreateTeamDialog } from "@neondatabase/neon-js/auth/react";
import { PostgresUserRepository } from "../../users/infrastructure/postgres-user.repository.js";
import { GetTeamUseCase } from "../application/get-team.use-case.js";
import { PostgresTeamRepository } from "../infrastructure/postgres-team.repository.js";
import { CreateTeamUseCase } from "../application/create-team.use-case.js";
import { ListTeamsUseCase } from "../application/list-teams.use-case.js";
import { ListAllMembersTeamUseCase } from "../application/list-allMembers-team.use-case.js";
import { HasMemberTeamUseCase } from "../application/hasMember-team.use-case.js";
import { AddMemberToTeamUseCase } from "../application/addMember-team.use-case.js";
import { RemoveMemberFromTeamUseCase } from "../application/removeMember-team.use-case.js";
import { TeamController } from "./team.controller.js";

const teamRepository = new PostgresTeamRepository()
const userRepository = new PostgresUserRepository()

const getTeamUseCase = new GetTeamUseCase(teamRepository)
const createTeamUseCase = new CreateTeamUseCase(teamRepository)
const listTeamsUseCase = new ListTeamsUseCase(teamRepository)
const listAllMembersTeamUseCase = new ListAllMembersTeamUseCase(teamRepository)
const hasMemberTeamUseCase = new HasMemberTeamUseCase(teamRepository)
const addMemberToTeamUseCase = new AddMemberToTeamUseCase(
    teamRepository,
    userRepository
)
const removeMemberFromTeam = new RemoveMemberFromTeamUseCase(
    teamRepository,
    userRepository
)

export const teamController = new TeamController(
    createTeamUseCase,
    getTeamUseCase,
    listTeamsUseCase,
    listAllMembersTeamUseCase,
    hasMemberTeamUseCase,
    addMemberToTeamUseCase,
    removeMemberFromTeam
)