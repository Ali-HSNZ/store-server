/**
 * @swagger
 *  tags:
 *      Admin
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags:
 *              -   Admin
 *          summary:    create new category
 *          parameters:
 *              -   in: formData
 *                  type:   string
 *                  required:   true
 *                  name:   title
 *              -   in: formData
 *                  type:   string
 *                  name:   parent
 *          responses:
 *              200:
 *                  description:    Success
 *              201:
 *                  description:    Created
 *              203:
 *                  description:     No Content(empty)
 *              400:
 *                  description:    Bad Request
 *              401:
 *                  description:    Unauthorized
 *              403:
 *                  description:    Not Access(forbidden)
 *              404:
 *                  description:    Not Found
 *              500:
 *                  description:    Internal Server Error
 *
 */
