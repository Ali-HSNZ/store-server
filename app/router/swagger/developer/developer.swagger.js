/**
 * @swagger
 *  tags:
 *      Developer
 */

/**
 * @swagger
 * /developer/hash/{value}:
 *  post:
 *      summary: hash text/value with bcrypt
 *      tags:
 *          -   Developer
 *      parameters:
 *          -   name: value
 *              in: path
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description:    Success
 *          201:
 *              description:    Created
 *          203:
 *             description:     No Content(empty)
 *          400:
 *              description:    Bad Request
 *          401:
 *              description:    Unauthorized
 *          403:
 *              description:    Not Access(forbidden)
 *          404:
 *              description:    Not Found
 *          500:
 *              description:    Internal Server Error
 */

/**
 * @swagger
 * /developer/generate-number/{count}:
 *  post:
 *      summary: hash text/count with bcrypt
 *      tags:
 *          -   Developer
 *      parameters:
 *          -   in: path
 *              name: count
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description:    Success
 *          201:
 *              description:    Created
 *          203:
 *             description:     No Content(empty)
 *          400:
 *              description:    Bad Request
 *          401:
 *              description:    Unauthorized
 *          403:
 *              description:    Not Access(forbidden)
 *          404:
 *              description:    Not Found
 *          500:
 *              description:    Internal Server Error
 */
