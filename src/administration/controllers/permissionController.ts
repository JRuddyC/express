import { Request, Response } from "express";
import PermissionUsesCases from "../use-cases/permissionUsesCases";
const permissionUsesCases = new PermissionUsesCases()

class PermissionController {

    async createPermissionController(req: Request, res: Response) {
        const permission = await permissionUsesCases.create(req.body)
        return res.send(permission)
    }

    async findAllPermissionsController(req: Request, res: Response) {
        const allPermissions = await permissionUsesCases.findAll()
        return  res.send(allPermissions)
    }

    async findByIdPermissionController(req: Request, res: Response) {
        const { id } = req.params
        const permission = await permissionUsesCases.findById(id)
        return res.send(permission)
    }

    async findOneAndUpdatePermissionController(req: Request, res: Response) {
        const { id } = req.params
        const permission = await permissionUsesCases.findOneAndUpdate(id, req.body)
        return res.send(permission)
    }
}

export default PermissionController