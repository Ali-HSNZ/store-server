/**
 * @swagger
 * /admin/category/parents:
 *      get:
 *          tags: [Category (Admin-Panel)]
 *          summary: get All parents of category or category heads
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *                  example: bearer <YOUR-TOKEN>
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 * /admin/category/get-all:
 *      get:
 *          tags: [Category (Admin-Panel)]
 *          summary: get All categories
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *                  example: bearer <YOUR-TOKEN>
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
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *                  example: bearer <YOUR-TOKEN>
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
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *                  example: bearer <YOUR-TOKEN>
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
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *                  example: bearer <YOUR-TOKEN>
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
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *                  example: bearer <YOUR-TOKEN>
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCategory'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCategory'
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
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *                  example: bearer <YOUR-TOKEN>
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditCategory'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditCategory'
 *
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
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  required: true
 *                  value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwMjUyMDUwOCIsImlhdCI6MTcxOTU3NDUxMywiZXhwIjoxNzE5NTc4MTEzfQ.eGWrKQ4nX6qOCzfZgIzPT1IFU8OnfKiMa0bw16aCjyQ
 *                  example: bearer <YOUR-TOKEN>
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *
 */
