/**
 * @swagger
 *  /admin/courses/get-all:
 *      get:
 *          tags: [Course (Admin-Panel)]
 *          summary: get all courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search corse (title, text, short_text)
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/getAllCoursesDefinition"
 */

/**
 * @swagger
 *  /admin/courses/get-by-id/{id}:
 *      get:
 *          tags: [Course (Admin-Panel)]
 *          summary: get course by id
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
 *  /admin/courses/add:
 *      post:
 *          tags: [Course (Admin-Panel)]
 *          summary: create course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCourse'
 *          responses:
 *              201:
 *                  description: success
 *
 */

/**
 * @swagger
 *  /admin/courses/edit-by-id/{id}:
 *      patch:
 *          tags: [Course (Admin-Panel)]
 *          summary: update course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *                  description: course id
 *
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditCourse'
 *          responses:
 *              201:
 *                  description: success
 *
 */
