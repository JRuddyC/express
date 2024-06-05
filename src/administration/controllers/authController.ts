import { Request, Response } from "express"
import AuthUsesCases from "../use-cases/authUsesCases"

const authUsesCases = new AuthUsesCases()
class AuthController {
    async createUserController(req: Request, res: Response) {
        const user = await authUsesCases.create(req.body)
        return res.send(user)
    }
    async authenticationUserController(req: Request, res: Response) {
        const user = await authUsesCases.authentication(req.body)
        const { success, data, token } = user
        return res.send({ success, data, token })
    }

    async refreshToken(req: Request, res: Response) {
        const token = req.headers["r-token"]
        const user = await authUsesCases.refreshToken(token as string)
        console.log(user);

        return res.send(user)
    }
}

export default AuthController