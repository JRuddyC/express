import IRole from "../interfaces/IRole";
import Role from "../models/role";

class SequelizeRoleRepository {

    async create(role: IRole) {
        const { nameRole } = role
        const response = await Role.create({ nameRole })
        return response
    }

    async findAll() {
        const response = await Role.findAll()
        return response
    }

    async findById(id: number | string) {
        const response = await Role.findByPk(id)
        return response
    }

    async findOneAndUpdate(id: number | string, role: IRole) {
        const response = await Role.update(role, { where: { id } })
        return response
    }
}

export default SequelizeRoleRepository