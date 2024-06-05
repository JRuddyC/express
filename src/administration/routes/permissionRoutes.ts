import { Router } from "express";
import PermissionController from "../controllers/permissionController";

const permissionController = new PermissionController()
const router = Router()

router.post('/permission', permissionController.createPermissionController)
router.get('/permission', permissionController.findAllPermissionsController)
router.get('/permission/:id', permissionController.findByIdPermissionController)
router.put('/permission/:id', permissionController.findOneAndUpdatePermissionController)

export default router