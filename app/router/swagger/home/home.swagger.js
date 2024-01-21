/**
 * @swagger
 *
 * tags:
 *  name: Home
 */

/**
 * @swagger
 * /:
 *  get:
 *      tags:
 *          -   Home
 *      summary: index of routes
 *      description: get all need data for index page
 *      parameters:
 *      -   in: header
 *          name: access-token
 *          example: bearer <Your_Access_Token>
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
