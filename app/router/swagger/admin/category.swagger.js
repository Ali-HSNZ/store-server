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
 *              -   Category - Admin Access
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
 *  /admin/category/parents:
 *      get:
 *          tags:
 *              -   Category - Admin Access
 *          summary:    get all categories head
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
 *  /admin/category/children/{parentId}:
 *      get:
 *          tags:
 *              -   Category - Admin Access
 *          summary:    get all children of parent
 *          parameters:
 *              -   in: path
 *                  name:   parentId
 *                  required:   true
 *                  type:   string
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
 *  /admin/category:
 *      get:
 *          tags:
 *              -   Category - Admin Access
 *          summary:    get all categories
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
 *  /admin/category/get-all-without-populate:
 *      get:
 *          tags:
 *              -   Category - Admin Access
 *          summary:    get all categories with out populate(nested)
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
 *  /admin/category/{id}:
 *      delete:
 *          tags:
 *              -   Category - Admin Access
 *          summary:    delete category by id
 *          parameters:
 *              -   in: path
 *                  name:   id
 *                  required:   true
 *                  type:   string
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
 *  /admin/category/{id}:
 *      get:
 *          tags:
 *              -   Category - Admin Access
 *          summary:    get category by id
 *          parameters:
 *              -   in: path
 *                  name:   id
 *                  required:   true
 *                  type:   string
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
 *  /admin/category/{id}:
 *      put:
 *          tags:
 *              -   Category - Admin Access
 *          summary:    update category by id
 *          parameters:
 *              -   in: path
 *                  name:   id
 *                  required:   true
 *                  type:   string
 *              -   in: formData
 *                  name:   title
 *                  required:   true
 *                  type:   string
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
