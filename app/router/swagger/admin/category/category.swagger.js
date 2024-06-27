/**
 * @swagger
 * /admin/category/parents:
 *      get:
 *          tags: [Category (Admin-Panel)]
 *          summary: get All parents of category or category heads
 *          responses:
 *              200:
 *                  description: success
 *
 */

/**
 * @swagger
 * /admin/category/get-all:
 *      get:
 *          tags: [Category (Admin-Panel)]
 *          summary: get All categories
 *          responses:
 *              200:
 *                  description: success
 *
 */

/**
 * @swagger
 * /admin/category/children/{parent}:
 *      get:
 *          tags: [Category (Admin-Panel)]
 *          summary: get All children of category parent
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *
 */

/**
 * @swagger
 * /admin/category/get-by-id/{id}:
 *      get:
 *          tags: [Category (Admin-Panel)]
 *          summary: find category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *
 */

/**
 * @swagger
 * /admin/category/list-of-all:
 *      get:
 *          tags: [Category (Admin-Panel)]
 *          summary: get all categories without nested
 *          responses:
 *              200:
 *                  description: success
 *
 */

/**
 * @swagger
 * /admin/category/add:
 *      post:
 *          tags: [Category (Admin-Panel)]
 *          summary: add category
 *          parameters:
 *              -   name: title
 *                  in: formData
 *                  type: string
 *                  required: true
 *              -   name: parent
 *                  in: formData
 *                  type: string
 *                  required: false
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 * /admin/category/edit-by-id/{id}:
 *      patch:
 *          tags: [Category (Admin-Panel)]
 *          summary: add category
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   name: title
 *                  in: formData
 *                  type: string
 *                  required: true
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 * /admin/category/remove/{id}:
 *      delete:
 *          tags: [Category (Admin-Panel)]
 *          summary: remove category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *
 */
