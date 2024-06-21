const redisClient = require('../utils/init-redis')
const { HomeRoutes } = require('./api')
const { AuthRoutes } = require('./user/auth')

const router = require('express').Router()

redisClient.set('key', 'value', (error, reply) => {
    if (error) console.log('error : ', error.message)
    else console.log('reply: ', reply)
})

router.use('/auth', AuthRoutes)
router.use('/', HomeRoutes)

module.exports = {
    AllRoutes: router,
}
