/**
 * @swagger
 *  /admin/permission/get-all:
 *      get:
 *          tags: [RBAC (Admin-Panel)]
 *          summary: permission list
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          tags: [RBAC (Admin-Panel)]
 *          summary: add permission
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddPermission'
 *          responses:
 *              201:
 *                  description: created
 */

/**
 * @swagger
 *  /admin/permission/edit-by-id/{id}:
 *      patch:
 *          tags: [RBAC (Admin-Panel)]
 *          summary: edit permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: permission id
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddPermission'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/permission/remove/{id}:
 *      delete:
 *          tags: [RBAC (Admin-Panel)]
 *          summary: delete permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: permission id
 *          responses:
 *              200:
 *                  description: success
 */
