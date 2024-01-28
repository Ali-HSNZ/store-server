/**
 * @swagger
 *  tags:
 *      Blog - Admin Access
 */

/**
 * @swagger
 *  /admin/blog/add:
 *      post:
 *          tags:
 *              -   Blog - Admin Access
 *          summary:    create new blog
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name:   access-token
 *                  type:   string
 *                  required:   true
 *                  example:    bearer <YOUR_ACCESS_TOKEN>
 *                  value:  bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcwNTk0NTYwMywiZXhwIjoxNzM3NTAzMjAzfQ.OUMrcDEd8lQFL90dktqLVoEhm5PSDgr6wENmMVvnOmM
 *              -   in: formData
 *                  name:   title
 *                  required:   true
 *                  type:   string
 *              -   in: formData
 *                  name:   category
 *                  required:   true
 *                  type:   string
 *              -   in: formData
 *                  name:   text
 *                  required:   true
 *                  type:   string
 *              -   in: formData
 *                  name:   short_text
 *                  required:   true
 *                  type:   string
 *              -   in: formData
 *                  name:   tags
 *                  example:    tag1#tag2#tag3 || string || undefined
 *                  type:   string
 *              -   in: formData
 *                  name:   image
 *                  required:   true
 *                  type:   file
 *          responses:
 *              200:
 *                  description:    Success
 *              201:
 *                  description:    Created
 *              203:
 *                  description:    No Content(empty)
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

/**
 * @swagger
 * /admin/blog:
 *  get:
 *      summary:    get all blogs
 *      tags:
 *          -   Blog - Admin Access
 *      parameters:
 *          -   in: header
 *              name:   access-token
 *              type:   string
 *              example:    bearer <YOUR_ACCESS_TOKEN>
 *              value:  bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcwNTk0NTYwMywiZXhwIjoxNzM3NTAzMjAzfQ.OUMrcDEd8lQFL90dktqLVoEhm5PSDgr6wENmMVvnOmM
 *              required:   true
 *      responses:
 *              200:
 *                  description:    Success
 *              201:
 *                  description:    Created
 *              203:
 *                  description:    No Content(empty)
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
 */

/**
 * @swagger
 * /admin/blog/{id}:
 *  get:
 *      summary: get blog by id
 *      tags:
 *          -   Blog - Admin Access
 *      parameters:
 *          -   in: header
 *              name:   access-token
 *              type:   string
 *              example:    bearer <YOUR_ACCESS_TOKEN>
 *              value:  bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcwNTk0NTYwMywiZXhwIjoxNzM3NTAzMjAzfQ.OUMrcDEd8lQFL90dktqLVoEhm5PSDgr6wENmMVvnOmM
 *              required:   true
 *          -   in: path
 *              name: id
 *              type:   string
 *              required:   true
 *      responses:
 *              200:
 *                  description:    Success
 *              201:
 *                  description:    Created
 *              203:
 *                  description:    No Content(empty)
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
 */
