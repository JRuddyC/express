import { ValidationError } from "sequelize"
import IPermission from "../interfaces/IPermission"
import SequelizePermissionRepository from "../repositories/permissionRepository"

class PermissionUsesCases {
    private permissionUsesCases: SequelizePermissionRepository

    constructor() {
        this.permissionUsesCases = new SequelizePermissionRepository()
    }

    async create(permission: IPermission) {
        try {
            const response = await this.permissionUsesCases.create(permission)
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
                });
                return {
                    success: false,
                    data: validationErrors
                };
            }
        }
    }

    async findAll() {
        const response = await this.permissionUsesCases.findAll()
        if (response.length > 0) {
            return {
                success: true,
                data: response
            }
        }

        return {
            success: false,
            data: {
                key: 'permission',
                error: 'No existen permisos registrados'
            }
        }
    }

    async findById(id: number | string) {
        try {
            const response = await this.permissionUsesCases.findById(id)
            if (response)
                return {
                    success: true,
                    data: response,
                }
            const error = {
                key: "id",
                msg: "No existe el permiso con id: " + id
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

    async findOneAndUpdate(id: number | string, permission: IPermission) {
        try {
            const userUpdated = await this.permissionUsesCases.findOneAndUpdate(id, permission)

            if (userUpdated[0]) {
                return {
                    success: true,
                    data: userUpdated,
                }
            }
            const error = {
                key: "id",
                msg: "No existe permiso con id: " + id
            }
            return {
                success: false,
                data: error,
            };
        } catch (error) {
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

export default PermissionUsesCases