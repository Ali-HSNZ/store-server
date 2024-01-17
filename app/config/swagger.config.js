const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const swaggerConfig = (app) => {
    app.use(
        '/api-doc',
        swaggerUi.serve,
        swaggerUi.setup(
            swaggerJsdoc({
                swaggerDefinition: {
                    info: {
                        title: 'Store',
                        version: '2.0.0',
                        contact: {
                            name: 'Ali Hassnazdeh ARB',
                            email: 'aliatraby@gmail.com',
                        },
                    },
                },
                apis: [process.cwd() + '/app/router/**/*.js'],
            })
        )
    )
}
module.exports = {
    swaggerConfig,
}
