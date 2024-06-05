import { UniqueConstraintError, ValidationError } from "sequelize";
import IUser from "../interfaces/IUser";
import SequelizeUserRepository from "../repositories/userRepository";

class UserUsesCases {
    private userRepository: SequelizeUserRepository
    constructor() {
        this.userRepository = new SequelizeUserRepository()
    }

    async findAll() {
        const response = await this.userRepository.findAll()
        if (response.length > 0) {
            return {
                success: true,
                data: response
            }
        }

        return {
            success: false,
            data: {
                key: 'user',
                error: 'No existen usuarios registrados'
            }
        }
    }

    async findById(id: number | string) {
        try {
            const response = await this.userRepository.findById(id)
            if (response)
                return {
                    success: true,
                    data: response,
                }
            const error = {
                key: "id",
                msg: "No existe el usuario con id: " + id
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

    async findOneAndUpdate(id: number | string, user: IUser) {
        try {
            const userUpdated = await this.userRepository.findOneAndUpdate(id, user)

            if (userUpdated[0]) {
                return {
                    success: true,
                    data: userUpdated,
                }
            }
            const error = {
                key: "id",
                msg: "No existe usuario con id: " + id
            }
            return {
                success: false,
                data: error,
            };
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                const uniqueErrors = {
                    key: "ci",
                    msg: "El usuario ya esta en uso"
                }
                return {
                    success: false,
                    data: uniqueErrors,
                };
            }
            if (error instanceof ValidationError) {

                const validationErrors = error.errors.map((err) => {
                    return {
                        key: err.path,
                        msg: err.message
                    }
                });
                return {
                    success: false,
                    data: validationErrors
                };
            }
        }
    }
}

export default UserUsesCases