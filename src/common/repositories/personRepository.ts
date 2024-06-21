
import { IntegerDataType } from "sequelize";
import IPerson from "../interfaces/IPerson";
import Person from "../models/person";

class SequelizeProductRepository {
    async create(person: IPerson): Promise<Person> {
        const { name, surname, ci, age, phone } = person
        const response = await Person.create({ name, surname, ci, age, phone })
        return response
    }
    async findAll() {
        const res = await Person.findAll()
        return res
    }
    async findById(id: number | string) {
        const res = await Person.findByPk(id,{
            attributes:['id','name','surname','ci','age','phone']
        })
        return res
    }

    async findOneAndUpdate(id: number | string, person: IPerson) {
        const res = await Person.update(person, { where: { id } })
        return res
    }
}
export default SequelizeProductRepository
