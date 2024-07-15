/**
 * @swagger
 *  /admin/products/get-all:
 *      get:
 *          tags: [Product (Admin-Panel)]
 *          summary: get all products list
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/products/get-by-id/{id}:
 *      get:
 *          tags: [Product (Admin-Panel)]
 *          summary: get product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of product
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product (Admin-Panel)]
 *          summary: create product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddProduct'
 *          responses:
 *              201:
 *                  description: created successfully
 *              200:
 *                  description: ok request
 *
 */

/**
 * @swagger
 *  /admin/products/delete-by-id/{id}:
 *      delete:
 *          tags: [Product (Admin-Panel)]
 *          summary: delete product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of product
 *          responses:
 *              200:
 *                  description: success
 */
