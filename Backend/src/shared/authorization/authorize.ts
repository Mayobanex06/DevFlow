import type { preHandlerHookHandler } from "fastify";
import { PermissionRepository } from "../../modules/authorization/domain/permission.repository.js";
import { RoleRepository } from "../../modules/authorization/domain/role.repository.js";
import { PermissionCode } from "../../modules/authorization/domain/permission.js";


export function createAuthorize(
    roleRepository: RoleRepository,
    permissionRepository: PermissionRepository
) {

    return function authorize(permissionCode: PermissionCode): preHandlerHookHandler {
        
        return async function (request, reply) {
            
        const roleId = request.user.roleId
        const role = await roleRepository.findById(roleId)

        if(role === null){
            reply.status(403).send({
                data: {
                    success: false,
                    message: "Insufficient permissions"
                },
                meta: {
                    requestId: request.id
                }
            })

            return
        }

        const permissions = await permissionRepository.findByRoleCode(role.code)
        const hasPermission = permissions.some((permission) => (permission.code === permissionCode))

            if(!hasPermission){
                reply.status(403).send({
                    data: {
                        success: false,
                        message: "Insufficient permissions"
                    },
                    meta: {
                        requestId: request.id
                    }
                })

                return
            }
        }
    }
}