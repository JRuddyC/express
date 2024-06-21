import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

class JsonWebTokenService {

    auth(payload: object) {
        const accessToken = jwt.sign(payload, secret as string, { expiresIn: '1h' })
        const refreshToken = jwt.sign(payload, secret as string, { expiresIn: '1d' })
        return {
            accessToken,
            refreshToken
        }
    }

    newToken(payload: object) {
        const accessToken = jwt.sign(payload, secret as string, { expiresIn: '1h' })
        return accessToken
    }

    verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers["authorization"]
            if (!token) {
                return res.status(401).send({
                    success: false,
                    data: {
                        key: 'auth',
                        msg: 'No autorizado'
                    }
                })
            }
            jwt.verify(token, secret as string)
            next()
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return res.status(400).send({
                    success: false,
                    data: {
                        key: 'auth',
                        msg: 'Sesión expirada'
                    }
                })
            }
            if (error instanceof JsonWebTokenError) {
                return res.send({
                    success: false,
                    data: {
                        key: 'token',
                        msg: 'Token inválido'
                    }
                })
            }
            return res.send({
                success: false,
                data: {
                    key: 'auth',
                    msg: 'Error de token'
                }
            })
        }
    }

    refreshToken(token: string) {
        const user = jwt.verify(token, secret as string)
        return user
    }
}

export default JsonWebTokenService