import { Request, Response } from "express";
import RoleUsesCases from "../use-cases/roleUsesCases";
import RolePermissionUsesCases from "../use-cases/rolePermissionsUsesCases";

const roleUsesCases = new RoleUsesCases()
const rolePermissionUsesCases = new RolePermissionUsesCases()

class RoleController {
    async createRoleController(req: Request, res: Response) {
        const role = await roleUsesCases.create(req.body)
        return  res.send(role)
    }

    async findAllRolesController(req: Request, res: Response) {
        const roles = await roleUsesCases.findAll()
        return  res.send(roles)
    }
    async findByIdController(req: Request, res: Response) {
        const { id } = req.params
        const role = await roleUsesCases.findById(id)
        return  res.send(role)
    }

    async findAndUpdateRoleController(req: Request, res: Response) {
        const { id } = req.params
        const role = await roleUsesCases.findOneAndUpdate(id, req.body)
        return  res.send(role)
    }

    async assignPermissionToRoleController(req: Request, res: Response) {
        const { role_id, permissions_ids } = req.body
        const assignPermissions = await rolePermissionUsesCases.assignPermissions(role_id, permissions_ids)
        return  res.send(assignPermissions)
    }

    async findAllRolePermissionsController(req: Request, res: Response) {
        const rolePermissions = await rolePermissionUsesCases.findAllRolePermissions()
        return  res.send(rolePermissions)
    }

    async findRolePermissionsByRoleController(req: Request, res: Response) {
        const { role_id } = req.params
        const rolePermission = await rolePermissionUsesCases.findRolePermissionsByRole(role_id)
        return  res.send(rolePermission)
    }

    async removeRolePermissionByRoleController(req: Request, res: Response) {
        const { role_id } = req.params
        const { permissions_ids } = req.body
        const rolePermissions = await rolePermissionUsesCases.removeRolePermissionsByRole(role_id, permissions_ids)
        return  res.send(rolePermissions)
    }
}

export default RoleController