import { Request, Response } from "express"
import PersonUsesCases from "../use-cases/personUsesCases"

const personUseCases = new PersonUsesCases()

class PersonController {

    async createPersonController(req: Request, res: Response) {
        const person = await personUseCases.create(req.body)
        res.send(person)
    }

    async findAllPersonController(req: Request, res: Response) {
        const allPeople = await personUseCases.findAll()
        res.send(allPeople)
    }

    async findByIdPersonController(req: Request, res: Response) {
        const { id } = req.params
        const person = await personUseCases.findById(id)
        res.send(person)
    }

    async findOneAndUpdatePersonController(req: Request, res: Response) {
        const { id } = req.params
        const person = await personUseCases.findOneAndUpdate(id, req.body)
        res.send(person)
    }
}

export default PersonController