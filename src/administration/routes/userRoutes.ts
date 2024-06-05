import { Router } from "express";
import UserController from "../controllers/userControllers";


const router = Router()

const userController = new UserController()

router.get('/user', userController.findAllUserController)
router.get('/user/:id', userController.findByIdUserController)
router.put('/user/:id', userController.findAndUpdateUserController)
router.post('/assignRole', userController.assignRoleToUserController)
router.get('/assignRole', userController.findAllUserRolesController)
router.get('/assignRoleByUser/:user_id', userController.findUserRoleByUserController)
router.get('/assignRoleByRole/:role_id', userController.findUserRoleByRoleController)
router.delete('/assignRole/:user_id', userController.removeUserRoleByRoleController)

export default router