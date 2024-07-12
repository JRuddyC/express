import Role from "../models/role";
import User from "../models/user";
import UserRole from "../models/userRole";

class SequelizeUserRoleRepository {

    async assignRole(user_id: string, role_id: string) {
        const response = await UserRole.create({ user_id, role_id })
        return response
    }

    async findAllUsersRoles() {
        const response = await UserRole.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Role,
                    attributes: ['id', 'nameRole']
                },
            ],
            attributes: ['user_id', 'role_id']
        })
        return response
    }

    async findUserRoleByUser(id: string) {
        const response = await User.findOne({
            where: { id },
            include: [{
                model: Role,
                as: 'roles',
                attributes: ['id', 'nameRole'],
                through: { attributes: [] }
            }],
            attributes: ['id']
        })
        return response
    }

    async findUserRoleByRole(role_id: string) {
        const response = await UserRole.findAll({
            where: { role_id },
            include: [{
                model: User,
                attributes: ['id', 'username']
            }],
            attributes: ['role_id']
        })
        return response
    }

    async removeUserRole(user_id: string, role_id: string) {
        const response = await UserRole.destroy({ where: { user_id, role_id } })
        return response
    }
}

export default SequelizeUserRoleRepository