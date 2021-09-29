import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
var bodyparser = require('body-parser')
import path from 'path'

dotenv.config()

class Application {
    app: express.Express = express()
    constructor() {
        this.extensions()
        this.listen()
    }

    public extensions() {
        this.app.use(cors())
        this.app.use(bodyparser.urlencoded({extended: true}));
        this.app.use(bodyparser.json())
        useExpressServer(this.app, {
            routePrefix: '/api/v1/',
            controllers: [path.join(__dirname, "controllers/*.controllers.ts")],
            cors: [],
        })
        console.log(this.app._router)
    }
    public listen() {
        this.app.listen(process.env.PORT,() => {
            console.log(`application run http://localhost:${process.env.PORT}`)
        })
    }
}

export const app = new Application()