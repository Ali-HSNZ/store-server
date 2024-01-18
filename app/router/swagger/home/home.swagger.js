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
 *          201:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 *
 */
