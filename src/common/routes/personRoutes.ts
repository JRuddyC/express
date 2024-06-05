import { Router } from "express";
import PersonController from "../controllers/personControllers";

const router = Router()
const personController = new PersonController()

router.get('/person', personController.findAllPersonController)
router.post('/person', personController.createPersonController)
router.get('/person/:id', personController.findByIdPersonController)
router.put('/person/:id', personController.findOneAndUpdatePersonController)

export default router