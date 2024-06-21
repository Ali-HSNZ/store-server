/**
 * @swagger
 * /category/add:
 *      post:
 *          tags: [Admin-Panel]
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
