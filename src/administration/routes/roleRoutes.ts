import { Router } from "express";
import RoleController from "../controllers/roleControllers";

const roleController = new RoleController()

const router = Router()

router.post('/role', roleController.createRoleController)
router.get('/role', roleController.findAllRolesController)
router.get('/role/:id', roleController.findByIdController)
router.put('/role/:id', roleController.findAndUpdateRoleController)
router.post('/assignPermission', roleController.assignPermissionToRoleController)
router.get('/assignPermission', roleController.findAllRolesController)
router.get('/assignPermission/:role_id', roleController.findRolePermissionsByRoleController)
router.delete('/assignPermission/:role_id', roleController.removeRolePermissionByRoleController)

export default router