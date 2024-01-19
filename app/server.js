const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const { AllRoutes } = require('./router/router')
const morgan = require('morgan')
const createError = require('http-errors')
const { swaggerConfig } = require('./config/swagger.config')
const cors = require('cors')
class Application {
    #App = express()
    #DB_URI
    #PORT
    constructor(PORT, DB_URI) {
        this.#PORT = PORT
        this.#DB_URI = DB_URI

        this.configApplication()
        this.connectToMongoDB()
        this.initRedis()
        this.createServer()
        this.createRoutes()
        this.errorHandling()
    }
    configApplication() {
        this.#App.use(cors())
        this.#App.use(express.json())
        this.#App.use(express.urlencoded({ extended: true }))
        this.#App.use(express.static(path.join(__dirname, '..', 'public')))
        swaggerConfig(this.#App)
    }
    createServer() {
        this.#App.use(morgan('dev'))
        const http = require('http')
        http.createServer(this.#App).listen(this.#PORT, () => {
            console.log(`Server Started on port: ${this.#PORT}`)
        })
    }

    connectToMongoDB() {
        mongoose
            .connect(this.#DB_URI)
            .then(() => {
                console.log('Connected to DB')
            })
            .catch((err) => {
                console.log(err?.message)
            })
        mongoose.connection.on('disconnected', () => {
            console.log('DB disconnected')
        })
        process.on('SIGINT', async () => {
            await mongoose.connection.close()
            process.exit(0)
        })
    }
    initRedis() {
        require('./utils/redis/init.redis')
    }

    createRoutes() {
        this.#App.use(AllRoutes)
    }
    errorHandling() {
        // Not found
        this.#App.use((req, res, next) => {
            next(createError.NotFound('آدرس مورد نظر یافت نشد'))
        })

        // Error
        this.#App.use((err, req, res, next) => {
            const serverError = createError.InternalServerError()
            const statusCode = err.status || serverError.status
            const message = err.message || serverError.message
            return res.status(statusCode).json({
                errors: {
                    status: statusCode,
                    message,
                },
            })
        })
    }
}

module.exports = Application
