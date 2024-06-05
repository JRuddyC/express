import Person from "../../common/models/person";
import IUser from "../interfaces/IUser";
import Permission from "../models/permission";
import Role from "../models/role";
import User from "../models/user";

class SequelizeUserRepository {
    async create(user: IUser) {
        const { username, password, person_id } = user
        const response = await User.create({ username, password, person_id })
        return response
    }

    async findAll() {
        const response = await User.findAll()
        return response
    }

    async findById(id: number | string) {
        const respnse = await User.findByPk(id)
        return respnse
    }
    async findOneAndUpdate(id: number | string, user: IUser) {
        const response = await User.update(user, { where: { id } })
        return response
    }

    async verifyUser(username: string) {
        const response = await User.findOne({
            attributes: ['id', 'username'],
            where: { username },
            include:
                [
                    {
                        model: Person,
                        attributes: ['name', 'surname', 'ci']
                    },
                    {
                        model: Role,
                        attributes: ['nameRole'],
                        through: {
                            attributes: []
                        },
                        include: [
                            {
                                model: Permission,
                                attributes: ['namePermission'],
                                through: {
                                    attributes: []
                                },
                            }
                        ]
                    }
                ]
        })
        return response
    }

    async veridyPassword(user: IUser) {
        const { username } = user
        const response = await User.findOne({ where: { username } })

        return response?.dataValues.password
    }
}

export default SequelizeUserRepository