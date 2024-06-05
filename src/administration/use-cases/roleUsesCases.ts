import { ValidationError } from "sequelize";
import IRole from "../interfaces/IRole";
import SequelizeRoleRepository from "../repositories/roleRepository";

class RoleUsesCases {
    private roleRepository: SequelizeRoleRepository

    constructor() {
        this.roleRepository = new SequelizeRoleRepository()
    }

    async create(role: IRole) {
        try {
            const response = await this.roleRepository.create(role)
            return {
                success: true,
                data: response
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                const validationErrors = error.errors.map((err) => {
                    return {
                        key: err.path,
                        msg: err.message
                    }
                })

                return {
                    success: false,
                    data: validationErrors
                }
            }
        }
    }

    async findAll() {
        const response = await this.roleRepository.findAll()
        if (response.length > 0) {
            return {
                success: true,
                data: response
            }
        }

        return {
            success: false,
            data: {
                key: 'role',
                error: 'No existen roles registrados'
            }
        }
    }

    async findById(id: number | string) {
        try {
            const response = await this.roleRepository.findById(id)
            if (response)
                return {
                    success: true,
                    data: response,
                }
            const error = {
                key: "id",
                msg: "No existe el rol con id: " + id
            }
            return {
                success: false,
                data: error,
            };
        } catch (error) {
            const typeIdError = {
                key: "id",
                msg: "Tipo de llave incorrecto"
            }
            return {
                success: false,
                data: typeIdError
            };
        }
    }

    async findOneAndUpdate(id: number | string, role: IRole) {
        try {
            const userUpdated = await this.roleRepository.findOneAndUpdate(id, role)
            if (userUpdated[0]) {
                return {
                    success: true,
                    data: userUpdated
                }
            }
            const error = {
                key: 'id',
                msg: 'No existe rol con id: ' + id
            }

            return {
                success: false,
                data: error
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                const validationErrors = error.errors.map((err) => {
                    return {
                        key: err.path,
                        msg: err.message
                    }
                })

                return {
                    success: false,
                    data: validationErrors
                }
            }
        }
    }
}

export default RoleUsesCases