import SequelizeRolePermissionRepository from "../repositories/rolePermissionRepository";

class RolePermissionUsesCases {
    private rolePermissionRepository: SequelizeRolePermissionRepository

    constructor() {
        this.rolePermissionRepository = new SequelizeRolePermissionRepository()
    }


    async assignPermissions(role_id: string, permissions_ids: [string]) {

        try {
            permissions_ids.map(async (item) => {
                await this.rolePermissionRepository.assignPermission(role_id, item)
            })
            return {
                success: true,
                data: true
            }
        } catch (error) {
            return error
        }
    }

    async findAllRolePermissions() {
        const response = await this.rolePermissionRepository.findAllRolePermissions()
        if (response.length > 0) {
            return {
                success: true,
                data: response
            }
        }

        return {
            success: false,
            data: {
                key: 'rolePermission',
                error: 'No existen permisos asignados a ningún rol'
            }
        }
    }

    async findRolePermissionsByRole(role_id: string) {
        try {
            const response = await this.rolePermissionRepository.findRolePermissionsByRole(role_id)
            if (response.length > 0)
                return {
                    success: true,
                    data: response,
                }
            const error = {
                key: "id",
                msg: "No existe permisos para el rol con id: " + role_id
            }
            return {
                success: false,
                data: error,
            };
        } catch (error) {
            const typeIdError = {
                key: "id",
                msg: "Tipo de llave incorrecto"
            }
            return {
                success: false,
                data: typeIdError
            };
        }
    }

    async removeRolePermissionsByRole(role_id: string, permissions_ids: [string]) {
        try {
            permissions_ids.map(async (item) => {
                await this.rolePermissionRepository.removeRolePermission(role_id, item)
            })
            return {
                success: true,
                data: true
            }
        } catch (error) {
            return error
        }
    }
}

export default RolePermissionUsesCases