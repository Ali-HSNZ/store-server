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
