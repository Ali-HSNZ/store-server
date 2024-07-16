/**
 * @swagger
 *  /admin/chapters/get-all/{id}:
 *      get:
 *          tags: [Chapter (Admin-Panel)]
 *          summary: get course chapters by course id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: course id
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/chapters/add/{id}:
 *      put:
 *          tags: [Chapter (Admin-Panel)]
 *          summary: add chapter for course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: course id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/AddChapter"
 *          responses:
 *              200:
 *                  description: success
 *
 */
