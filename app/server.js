const createError = require('http-errors')
const { AllRoutes } = require('./router/sections/router')

const cors = require('cors')

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const { redisClient } = require('./utils')

module.exports = class Application {
    #APP = express()
    #DB_URI
    #PORT
    constructor(PORT, DB_URI) {
        this.#PORT = PORT
        this.#DB_URI = DB_URI

        this.configApplication()
        this.connectToRedisDB()
        this.connectToMongoDB()
        this.createServer()
        this.createRoutes()
        this.errorHandling()
    }

    configApplication() {
        this.#APP.use(cors())
        this.#APP.use(express.json())
        this.#APP.use(express.urlencoded({ extended: true }))
        this.#APP.use(express.static(path.join(__dirname, '..', 'public')))
        this.#APP.use(morgan('dev'))
        this.#APP.use(
            '/api-doc',
            swaggerUi.serve,
            swaggerUi.setup(
                swaggerJSDoc({
                    swaggerDefinition: {
                        openapi: '3.0.0',
                        info: {
                            title: 'API Document',
                            version: '0.0.1',
                        },
                        servers: [
                            {
                                url: `http://localhost:${this.#PORT}`,
                                description: 'Development server',
                            },
                        ],
                        components: {
                            securitySchemes: {
                                BearerAuth: {
                                    type: 'http',
                                    scheme: 'bearer',
                                    bearerFormat: 'JWT',
                                },
                            },
                        },
                        security: [{ BearerAuth: [] }],
                    },
                    apis: ['./app/router/swagger/**/*.js'],
                }),
                { explorer: true }
            )
        )
    }
    createServer() {
        const http = require('http')
        http.createServer(this.#APP).listen(this.#PORT, () => {
            console.log('- http://localhost:' + this.#PORT)
        })
    }
    connectToMongoDB() {
        mongoose.connect(this.#DB_URI).catch((err) => {
            console.log(err?.message)
        })
        mongoose.connection.on('connected', () => {
            console.log('- mongo DB connected')
        })
        mongoose.connection.on('disconnected', () => {
            console.log('- DB disconnected')
        })
        process.on('SIGINT', async () => {
            console.log('- closing mongo & redis connection...')
            // disconnect mongoDB
            await mongoose.connection.close()
            // disconnect redisDB
            redisClient.disconnect()

            process.exit(0)
        })
    }
    createRoutes() {
        this.#APP.use(AllRoutes)
    }
    connectToRedisDB() {
        require('./utils/init-redis')
    }
    errorHandling() {
        this.#APP.use((req, res, next) => {
            next(createError.NotFound('آدرس موردنظر یافت نشد'))
        })
        this.#APP.use((err, req, res, next) => {
            const serverError = createError.InternalServerError()
            const statusCode = err?.status || serverError.status
            const message = err.message || serverError.message
            return res.status(statusCode).json({
                statusCode,
                message,
            })
        })
    }
}
