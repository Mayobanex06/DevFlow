import { FastifyReply, FastifyRequest} from "fastify"
import { GetPermissionByCodeUseCase } from "../application/get-permission-bycode.user-case.js";
import { GetPermissionByRoleCodeUseCase } from "../application/get-permission-byrolecode.user-case.js";
import { GetByCodeRoleUseCase } from "../application/get-role-bycode.use-case.js";
import { GetRoleUseCase } from "../application/get-role.use-case.js";
import { ListRolesUseCase } from "../application/list-role.use-case.js";
import { RoleCode } from "../domain/role.js";
import { PermissionCode } from "../domain/permission.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";

export interface RoleIdParams {
    id: number
}

export interface RoleCodeParams {
    code: RoleCode
}

export interface PermissionCodeParams {
    code: PermissionCode
}

export class AuthorizationController {
    constructor(
        private getRoleByCodeUseCase: GetByCodeRoleUseCase,
        private getRoleUseCase: GetRoleUseCase,
        private listRolesUseCase: ListRolesUseCase,
        private getPermissionByCodeUseCase: GetPermissionByCodeUseCase,
        private getPermissionByRoleCodeUseCase: GetPermissionByRoleCodeUseCase
    ) {}

    async getRole(request: FastifyRequest<{
        Params: RoleIdParams
    }>, reply: FastifyReply) {

        const id = request.params.id

        const role = await this.getRoleUseCase.execute({
            id: id
        })

        if(!role){
            throw new NotFoundError(
                "ROLE_NOT_FOUND",
                "Role not found"
            )
        }

        return reply.status(200).send({
            data: {
                id: Number(role.id),
                name: role.name,
                code: role.code
            },
            meta: {
                requesId: request.id
            }
        })
    }

    async getRoleByCode(request: FastifyRequest<{
        Params: RoleCodeParams
    }>, reply: FastifyReply) {

        const code = request.params.code

        const role = await this.getRoleByCodeUseCase.execute({
            code: code
        })

        if(!role){
            throw new NotFoundError(
                "ROLE_NOT_FOUND",
                "Role not found"
            )
        }

        return reply.status(200).send({
            data: {
                id: Number(role.id),
                name: role.name,
                code: role.code
            },
            meta: {
                requesId: request.id
            }
        })
    }

    async listRoles(request: FastifyRequest, reply: FastifyReply){

        const roles = await this.listRolesUseCase.execute()

        return reply.status(200).send({
            data: roles.map(role => ({
                id: Number(role.id),
                name: role.name,
                code: role.code
            })),
            meta: {
                requestId: request.id
            }
        })
    }

    async getPermissionByCode(request: FastifyRequest<{
        Params: PermissionCodeParams
    }>, reply: FastifyReply) {

        const code = request.params.code

        const permission = await this.getPermissionByCodeUseCase.execute({
            code: code
        })

        if (!permission){
            throw new NotFoundError(
                "PERMISSION_NOT_FOUND",
                "Permission not found"
            )
        }

        return reply.status(200).send({
            data: {
                id: permission.id,
                code: permission.code,
                description: permission.description
            },
            meta: {
                requestId: request.id
            }
        })
    }

    async getPermissionByRoleCode(request: FastifyRequest<{
        Params: RoleCodeParams
    }>, reply: FastifyReply) {

        const code = request.params.code

        const permissions = await this.getPermissionByRoleCodeUseCase.execute({
            roleCode: code
        })
        
        return reply.status(200).send({
            data: permissions.map(permission => ({
                id: permission.id,
                code: permission.code,
                description: permission.description
            })),
            meta: {
                requestId: request.id
            }
        })
    }
}