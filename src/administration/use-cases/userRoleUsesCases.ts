import SequelizeUserRoleRepository from "../repositories/userRoleRepository"

class UserRoleUsesCases {
    private userRoleUsesCases: SequelizeUserRoleRepository

    constructor() {
        this.userRoleUsesCases = new SequelizeUserRoleRepository()
    }

    async assignRole(user_id: string, roles_ids: [string]) {
        try {
            roles_ids.map(async (item) => {
                await this.userRoleUsesCases.assignRole(user_id, item)
            })
            return {
                success: true,
                data: true
            }
        } catch (error) {
            return error
        }
    }

    async findAllUserRole() {
        const response = await this.userRoleUsesCases.findAllUsersRoles()
        if (response.length > 0) {
            return {
                success: true,
                data: response
            }
        }

        return {
            success: false,
            data: {
                key: 'userRole',
                error: 'No existen roles asignados a ningún usuario'
            }
        }
    }

    async findUserRoleByUser(user_id: string) {
        try {
            const response = await this.userRoleUsesCases.findUserRoleByUser(user_id)
            if (response.length > 0)
                return {
                    success: true,
                    data: response,
                }
            const error = {
                key: "id",
                msg: "No existe roles para el usuario con id: " + user_id
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

    async findUserRoleByRole(role_id: string) {
        try {
            const response = await this.userRoleUsesCases.findUserRoleByRole(role_id)
            if (response.length > 0)
                return {
                    success: true,
                    data: response,
                }
            const error = {
                key: "id",
                msg: "No existe usuarios para el rol con id: " + role_id
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

    async removeUserRole(user_id: string, roles_ids: [string]) {
        try {
            roles_ids.map(async (item) => {
                await this.userRoleUsesCases.removeUserRole(user_id, item)
            })
            return {
                success: true,
                data: true
            }
        } catch (error) {
            return error
        }
    }
}

export default UserRoleUsesCases