const redisDB = require('redis')

const redisClient = redisDB.createClient()
redisClient.connect()
redisClient.on('ready', () => console.log('Connected to redis'))
redisClient.on('error', (err) => console.log('Redis error: ', err))
redisClient.on('end', () => console.log('Disconnected from redis'))

module.exports = redisClient
