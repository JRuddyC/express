import IPermission from "../interfaces/IPermission";
import Permission from "../models/permission";

class SequelizePermissionRepository {

    async create(permission: IPermission) {
        const { namePermission } = permission
        const response = await Permission.create({ namePermission })
        return response
    }

    async findAll() {
        const response = await Permission.findAll()
        return response
    }

    async findById(id: number | string) {
        const response = await Permission.findByPk(id)
        return response
    }

    async findOneAndUpdate(id: number | string, permission: IPermission) {
        const response = await Permission.update(permission, { where: { id } })
        return response
    }
}

export default SequelizePermissionRepository