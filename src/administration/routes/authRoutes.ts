import { Router } from "express"
import AuthController from "../controllers/authController"

const router = Router()
const authController = new AuthController()

router.post('/authentication', authController.authenticationUserController)
router.post('/register', authController.createUserController)
router.post('/refresh', authController.refreshToken)

export default router