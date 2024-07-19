/**
 * @swagger
 *  /admin/episodes/add/{courseId}/{chapterId}:
 *      post:
 *          tags: [Episode (Admin-Panel)]
 *          summary: create new episode for course
 *          parameters:
 *              -   in: path
 *                  name: courseId
 *                  required: true
 *                  description: enter course id
 *              -   in: path
 *                  name: chapterId
 *                  required: true
 *                  description: enter chapter id of course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                  description: success
 *
 */
