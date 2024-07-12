import { UniqueConstraintError, ValidationError } from "sequelize"
import EncryptionService from "../../utils/encryption/encryptionUtil"
import JsonWebTokenService from "../../utils/middleware/jsonWebTokenUtil"
import IUser from "../interfaces/IUser"
import SequelizeUserRepository from "../repositories/userRepository"
import { JsonWebTokenError } from "jsonwebtoken"
import IJwtPayload from "../interfaces/IJwtPayload"

class AuthUsesCases {
    private userRepository: SequelizeUserRepository
    private encryptionService: EncryptionService
    private jsonWebTokeService: JsonWebTokenService

    constructor() {
        this.userRepository = new SequelizeUserRepository(),
            this.encryptionService = new EncryptionService(),
            this.jsonWebTokeService = new JsonWebTokenService()
    }

    async create(user: IUser) {
        try {
            user.password = await this.encryptionService.hashPassword(user.password)
            const response = await this.userRepository.create(user)
            return {
                statusCode: 200,
                success: true,
                data: response
            }
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                const uniqueErrors = {
                    key: "ci",
                    msg: "El usuario ya esta en uso"
                }
                return {
                    statusCode: 400,
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
                    statusCode: 400,
                    success: false,
                    data: validationErrors
                };
            }
        }
    }

    async authentication(user: IUser) {
        const { username, password } = user
        try {
            const response = await this.userRepository.verifyUser(username)
            if (!response) {
                return {
                    statusCode: 400,
                    success: false,
                    data: {
                        key: 'username',
                        msg: 'Usuario no válido'
                    }
                }
            }

            const userPassword = await this.userRepository.veridyPassword(user)

            const verify = await this.encryptionService.verifyPassword(password, userPassword)

            if (!verify) {
                return {
                    statusCode: 400,
                    success: false,
                    data: {
                        key: 'password',
                        msg: 'Contraseña incorrecta'
                    }
                }
            }
            const token = this.jsonWebTokeService.auth(response.dataValues)
            return {
                statusCode: 200,
                success: true,
                data: {
                    user: response,
                },
                token
            }
        } catch (error) {
            return {
                statusCode: 400,
                success: false,
                data: {
                    key: 'auth',
                    msg: 'Error de autenticación'
                }
            }
        }
    }

    async refreshToken(token: string) {
        
        try {
            const verify = this.jsonWebTokeService.refreshToken(token) as IJwtPayload
            const { username } = verify
            const user = await this.userRepository.verifyUser(username as string)
            if (!user) {
                return {
                    statusCode: 401,
                    success: false,
                    data: {
                        key: 'auth',
                        msg: 'Error de token'
                    }
                }
            }

            const newToken = this.jsonWebTokeService.newToken(user.dataValues)
            return {
                statusCode: 200,
                success: true,
                data: {
                    user: user,
                },
                accessToken: newToken
            }
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                return {
                    statusCode: 401,
                    success: false,
                    data: {
                        key: 'refresh',
                        msg: 'Token inválido'
                    }
                }
            }
            return {
                statusCode: 401,
                success: false,
                data: {
                    key: 'auth',
                    msg: 'Error de token'
                }
            }
        }
    }
}

export default AuthUsesCases