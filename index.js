const Application = require('./app/server')
const dotenv = require('dotenv')

// config dotEnv
dotenv.config()

const {
    MONGO_CONNECTION_URL: mongoUrl,
    MONGO_DB_NAME: dbName,
    APPLICATION_PORT: port,
} = process.env

new Application(port, `${mongoUrl}/${dbName}`)
