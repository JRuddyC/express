import { Request, Response } from "express"
import PersonUsesCases from "../use-cases/personUsesCases"

const personUseCases = new PersonUsesCases()

class PersonController {

    async createPersonController(req: Request, res: Response) {
        const person = await personUseCases.create(req.body)
        res.status(person?.statusCode as number).send(person)
    }

    async findAllPersonController(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query
            const allPeople = await personUseCases.findAll(page as number, limit as number)
            res.status(allPeople?.statusCode).send(allPeople)
        } catch (error) {
            res.status(400).send({
                statusCode: 400,
                success: false,
                data: {
                    key: "person",
                    error: "Error al obtener personas"
                }
            })
        }
    }

    async findByIdPersonController(req: Request, res: Response) {
        const { id } = req.params
        const person = await personUseCases.findById(id)
        res.status(person.statusCode).send(person)
    }

    async findOneAndUpdatePersonController(req: Request, res: Response) {
        const { id } = req.params
        const person = await personUseCases.findOneAndUpdate(id, req.body)
        res.status(person?.statusCode as number).send(person)
    }
}

export default PersonController