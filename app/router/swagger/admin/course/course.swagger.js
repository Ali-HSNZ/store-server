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
 *  /admin/courses/add-chapter/{id}:
 *      put:
 *          tags: [Course (Admin-Panel)]
 *          summary: add chapter for course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of course
 *
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
