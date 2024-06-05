
import Permission from "../models/permission"
import Role from "../models/role"
import RolePermission from "../models/rolePermission"

class SequelizeRolePermissionRepository {
    async assignPermission(role_id: number | string, permission_id: number | string) {
        const response = await RolePermission.create({ role_id, permission_id })
        return response
    }
    async findAllRolePermissions() {
        const response = await RolePermission.findAll({
            include: [
                {
                    model: Role,
                    attributes: ['nameRole']
                },
                {
                    model: Permission,
                    attributes: ['namePermission']
                },
            ],
            attributes: ['role_id', 'permission_id']
        })
        return response
    }

    async findRolePermissionsByRole(role_id: string) {
        const response = await RolePermission.findAll({
            where: { role_id },
            include: [{
                model: Permission,
                attributes: ['id','namePermission']
            }],
            attributes: ['role_id']
        })
        return response
    }

    async removeRolePermission(role_id: string, permission_id: string) {
        const response = await RolePermission.destroy({ where: { role_id, permission_id } })
        return response
    }
}

export default SequelizeRolePermissionRepository