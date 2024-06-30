/**
 * @swagger
 * /admin/blogs/get-all:
 *  get:
 *      tags: [Blog (Admin-Panel)]
 *      summary: get all blogs
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              type: string
 *              required: true
 *              value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *              example: bearer <YOUR-TOKEN>
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/blogs/get-by-id/{id}:
 *  get:
 *      tags: [Blog (Admin-Panel)]
 *      summary: get blog by id
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              type: string
 *              required: true
 *              value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *              example: bearer <YOUR-TOKEN>
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/blogs/add:
 *  post:
 *      tags: [Blog (Admin-Panel)]
 *      summary: create blog
 *      consumes:
 *          -   multipart/form-data
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              type: string
 *              required: true
 *              value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *              example: bearer <YOUR-TOKEN>
 *          -   in: formData
 *              name: title
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: text
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: short_text
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: tags
 *              example: tag1#tag2#tag_3...
 *              type: string
 *          -   in: formData
 *              name: category
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: image
 *              required: true
 *              type: file
 *      responses:
 *          200:
 *              description: success
 *          201:
 *              description: created successfully
 */

/**
 * @swagger
 * /admin/blogs/edit-by-id/{id}:
 *  patch:
 *      tags: [Blog (Admin-Panel)]
 *      summary: update blog
 *      consumes:
 *          -   multipart/form-data
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              type: string
 *              required: true
 *              value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *              example: bearer <YOUR-TOKEN>
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *          -   in: formData
 *              name: title
 *              type: string
 *          -   in: formData
 *              name: text
 *              type: string
 *          -   in: formData
 *              name: short_text
 *              type: string
 *          -   in: formData
 *              name: tags
 *              example: tag1#tag2#tag_3...
 *              type: string
 *          -   in: formData
 *              name: category
 *              type: string
 *          -   in: formData
 *              name: image
 *              type: file
 *      responses:
 *          200:
 *              description: success
 *          201:
 *              description: created successfully
 */

/**
 * @swagger
 * /admin/blogs/remove/{id}:
 *  delete:
 *      tags: [Blog (Admin-Panel)]
 *      summary: delete blog by id
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              type: string
 *              required: true
 *              value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *              example: bearer <YOUR-TOKEN>
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: success
 */
