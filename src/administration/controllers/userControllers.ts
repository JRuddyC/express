import { Request, Response } from "express";
import UserUsesCases from "../use-cases/userUsesCases";
import UserRoleUsesCases from "../use-cases/userRoleUsesCases";
const userUsesCases = new UserUsesCases()
const userRoleUsesCases = new UserRoleUsesCases()

class UserController {

    async findAllUserController(req: Request, res: Response) {
        const allUsers = await userUsesCases.findAll()
        return res.send(allUsers)
    }

    async findByIdUserController(req: Request, res: Response) {
        const { id } = req.params
        const user = await userUsesCases.findById(id)
        return res.send(user)
    }

    async findAndUpdateUserController(req: Request, res: Response) {
        const { id } = req.params
        const user = await userUsesCases.findOneAndUpdate(id, req.body)
        return res.send(user)
    }

    async assignRoleToUserController(req: Request, res: Response) {
        const { user_id, roles_ids } = req.body
        const assignRoles = await userRoleUsesCases.assignRole(user_id, roles_ids)
        return res.send(assignRoles)
    }

    async findAllUserRolesController(req: Request, res: Response) {
        const userRole = await userRoleUsesCases.findAllUserRole()
        return res.send(userRole)
    }

    async findUserRoleByUserController(req: Request, res: Response) {
        const { user_id } = req.params
        const userRole = await userRoleUsesCases.findUserRoleByUser(user_id)
        return res.send(userRole)
    }

    async findUserRoleByRoleController(req: Request, res: Response) {
        const { role_id } = req.params
        const userRole = await userRoleUsesCases.findUserRoleByRole(role_id)
        return res.send(userRole)
    }

    async removeUserRoleByRoleController(req: Request, res: Response) {
        const { user_id } = req.params
        const { roles_ids } = req.body
        const userRoles = await userRoleUsesCases.removeUserRole(user_id, roles_ids)
        return res.send(userRoles)
    }
}

export default UserController