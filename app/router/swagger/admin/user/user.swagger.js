/**
 * @swagger
 *  /admin/users/get-all:
 *      get:
 *          tags: [User (Admin-Panel)]
 *          summary: get all users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search user (firstName, lastName, userName, mobile)
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/users/edit:
 *      patch:
 *          tags: [User (Admin-Panel)]
 *          summary: update user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditProfile'
 *          responses:
 *              200:
 *                  description: success
 *
 */
