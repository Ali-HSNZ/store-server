/**
 * @swagger
 * /admin/blogs/get-all:
 *  get:
 *      tags: [Blog (Admin-Panel)]
 *      summary: get all blogs
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/blogs/get-by-id/{id}:
 *  get:
 *      tags: [Blog (Admin-Panel)]
 *      summary: get blog by id
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/blogs/add:
 *  post:
 *      tags: [Blog (Admin-Panel)]
 *      summary: create blog
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/AddBlog'
 *      responses:
 *          200:
 *              description: success
 *          201:
 *              description: created successfully
 */

/**
 * @swagger
 * /admin/blogs/edit-by-id/{id}:
 *  patch:
 *      tags: [Blog (Admin-Panel)]
 *      summary: update blog
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/EditBlog'
 *      responses:
 *          200:
 *              description: success
 *          201:
 *              description: created successfully
 */

/**
 * @swagger
 * /admin/blogs/remove/{id}:
 *  delete:
 *      tags: [Blog (Admin-Panel)]
 *      summary: delete blog by id
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 */
