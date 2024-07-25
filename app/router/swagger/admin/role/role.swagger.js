/**
 * @swagger
 * /admin/role/get-all:
 *      get:
 *          tags: [RBAC (Admin-Panel)]
 *          summary: get All roles
 *          responses:
 *              200:
 *                  description: success
 *
 */

/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [RBAC (Admin-Panel)]
 *          summary: add role
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddRole'
 *          responses:
 *              201:
 *                  description: created
 */

/**
 * @swagger
 *  /admin/role/edit-by-id/{id}:
 *      patch:
 *          tags: [RBAC (Admin-Panel)]
 *          summary: edit role
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: role id
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditRole'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/role/remove/{field}:
 *      delete:
 *          tags: [RBAC (Admin-Panel)]
 *          summary: delete role
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *                  description: role id or role title
 *          responses:
 *              200:
 *                  description: success
 */
