import { PostgresUserRepository } from "../../users/infrastructure/postgres-user.repository.js";
import { PostgresTeamRepository } from "../infrastructure/postgres-team.repository.js";
import { ListTeamsUseCase } from "../application/use-cases/list-teams.use-case.js";
import { ListAllMembersTeamUseCase } from "../application/use-cases/list-allMembers-team.use-case.js";
import { HasMemberTeamUseCase } from "../application/use-cases/hasMember-team.use-case.js";
import { RemoveMemberFromTeamUseCase } from "../application/use-cases/removeMember-team.use-case.js";
import { TeamController } from "./team.controller.js";
import { GetTeamUseCase } from "../application/use-cases/get-team.use-case.js";
import { CreateTeamUseCase } from "../application/use-cases/create-team.use-case.js";
import { AddMemberToTeamUseCase } from "../application/use-cases/addMember-team.use-case.js";
import { DefaultTeamMemberPolicy } from "../application/policies/team-member.policy.js";
import { PostgresRoleRepository } from "../../authorization/infrastructure/postgres-role.repository.js";
import { RecordActivityUseCase } from "../../activities/application/record-activity.use-case.js";
import { PostgresActivityRepository } from "../../activities/infrastructure/postgres-activity.repository.js";

const teamRepository = new PostgresTeamRepository()
const userRepository = new PostgresUserRepository()
const roleRepository = new PostgresRoleRepository()
const activityRepository = new PostgresActivityRepository()

const activityRecorder = new RecordActivityUseCase(
    activityRepository
)

const teamMemberPolicy = new DefaultTeamMemberPolicy(
    userRepository,
    roleRepository
)

const getTeamUseCase = new GetTeamUseCase(teamRepository)
const createTeamUseCase = new CreateTeamUseCase(teamRepository)
const listTeamsUseCase = new ListTeamsUseCase(teamRepository)
const listAllMembersTeamUseCase = new ListAllMembersTeamUseCase(teamRepository)
const hasMemberTeamUseCase = new HasMemberTeamUseCase(teamRepository)
const addMemberToTeamUseCase = new AddMemberToTeamUseCase(
    teamRepository,
    teamMemberPolicy,
    activityRecorder
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