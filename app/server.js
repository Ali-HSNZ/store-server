const { AllRoutes } = require('./router/router')

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

module.exports = class Application {
    #APP = express()
    #DB_URI
    #PORT
    constructor(PORT, DB_URI) {
        this.#PORT = PORT
        this.#DB_URI = DB_URI

        this.configApplication()
        this.connectToDB()
        this.createServer()
        this.createRoutes()
        this.errorHandling()
    }

    configApplication() {
        this.#APP.use(express.json())
        this.#APP.use(express.urlencoded())
        this.#APP.use(express.static(path.join(__dirname, '..', 'public')))
        this.#APP.use(morgan('dev'))
    }
    createServer() {
        const http = require('http')
        http.createServer(this.#APP).listen(this.#PORT, () => {
            console.log('run > http://localhost:' + this.#PORT)
        })
    }
    connectToDB() {
        mongoose.connect(this.#DB_URI).catch((err) => {
            console.log(err?.message)
        })
        mongoose.connection.on('connected', () => {
            console.log('DB connected')
        })
        mongoose.connection.on('disconnected', () => {
            console.log('DB disconnected')
        })
        process.on('SIGINT', async () => {
            console.log('Received SIGINT. Closing DB connection...')
            await mongoose.connection.close()
            process.exit(0)
        })
    }
    createRoutes() {
        this.#APP.use(AllRoutes)
    }
    errorHandling() {
        this.#APP.use((req, res, next) => {
            return res.json({
                statusCode: 404,
                message: 'آدرس مورد نظر یافت نشد',
            })
        })
        this.#APP.use((err, req, res, next) => {
            const statusCode = err?.status || 500
            const message = err.message || 'Internal Server Error'

            return res.static(statusCode).json({
                statusCode,
                message,
            })
        })
    }
}
