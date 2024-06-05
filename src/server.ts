import express, { Application } from "express";
import personRoutes from './common/routes/personRoutes'
import userRoutes from './administration/routes/userRoutes'
import roleRoutes from './administration/routes/roleRoutes'
import permissionRoutes from './administration/routes/permissionRoutes'
import authRoutes from './administration/routes/authRoutes'
import dotenv from 'dotenv'
import sequelize from "./db/sequelizeDbConection";
import cors from 'cors'
import JsonWebTokenService from "./utils/middleware/jsonWebTokenUtil";

class Server {
    private app: Application
    private port: string | undefined
    private jsonWebToken : JsonWebTokenService

    constructor() {
        this.app = express()
        this.config()
        this.jsonWebToken = new JsonWebTokenService()
        this.middlewares()
        this.routes()
        this.port = process.env.APP_PORT
    }

    async config() {
        dotenv.config()
        await sequelize.authenticate()
        await sequelize.sync()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    routes() {
        this.app.use('/api', authRoutes)
        this.app.use('/api',this.jsonWebToken.verifyToken, personRoutes)
        this.app.use('/api',this.jsonWebToken.verifyToken, userRoutes)
        this.app.use('/api',this.jsonWebToken.verifyToken, roleRoutes)
        this.app.use('/api',this.jsonWebToken.verifyToken, permissionRoutes)
    }

    start() {
        this.app.listen(this.port, () => {
            console.log("running at port: " + this.port);

        })
    }
}

export default Server