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
