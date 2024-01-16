const express = require('express')
const { connect } = require('mongoose')
const path = require('path')
const { AllRoutes } = require('./router/router')

class Application {
    #App = express()
    #DB_URI
    #PORT
    constructor(PORT, DB_URI) {
        this.#PORT = PORT
        this.#DB_URI = DB_URI

        this.configApplication()
        this.connectToMongoDB()
        this.createServer()
        this.createRoutes()
        this.errorHandling()
    }
    configApplication() {
        this.#App.use(express.json())
        this.#App.use(express.urlencoded({ extended: true }))
        this.#App.use(express.static(path.join(__dirname, '..', 'public')))
    }
    createServer() {
        const http = require('http')
        http.createServer(this.#App).listen(this.#PORT, () => {
            console.log(`Server Started on port: ${this.#PORT}`)
        })
    }

    connectToMongoDB() {
        connect(this.#DB_URI)
            .then(() => {
                console.log('Connected to DB')
            })
            .catch(() => {
                console.log('Failed to connect to MongoDB')
            })
    }
    createRoutes() {
        this.#App.use(AllRoutes)
    }
    errorHandling() {
        // Not found
        this.#App.use((req, res, next) => {
            res.status(404).json({
                statusCode: 404,
                message: 'آدرس مورد نظر یافت نشد',
            })
        })

        // Error
        this.#App.use((err, req, res, next) => {
            const statusCode = err.status || 500
            const message = err.message || 'InternalServerError'
            return res.status(statusCode).json({
                status: statusCode,
                message,
            })
        })
    }
}

module.exports = Application
