const { AllRoutes } = require('./router/router')

const express = require('express')
const mongoose = require('mongoose')
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
    }
    createServer() {
        const http = require('http')
        http.createServer(this.#APP).listen(this.#PORT, () => {
            console.log('run > http://localhost:' + this.#PORT)
        })
    }
    connectToDB() {
        mongoose
            .connect(this.#DB_URI)
            .then(() => {
                console.log('Connected to db')
            })
            .catch((err) => {
                console.log(err?.message)
            })
    }
    createRoutes() {
        this.#APP.use(AllRoutes)
    }
    errorHandling() {
        this.#APP.use((req, res, next) => {
            return res.json({
                statusCode: 404,
                message: 'آدرس مورد نظر یافت نشد!',
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
