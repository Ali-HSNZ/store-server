const redisDB = require('redis')
const redisClient = redisDB.createClient()

redisClient.connect()
redisClient.on('ready', () => console.log('- redis DB connected'))
redisClient.on('error', (error) => console.log('- redis DB error: ', error.message))
redisClient.on('end', () => console.log('- redis DB disconnected '))

module.exports = redisClient
