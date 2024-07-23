/**
 * @swagger
 *  components:
 *      schemas:
 *          Permissions:
 *              type: string
 *              enum:
 *                  -   blog
 *                  -   course
 *                  -   product
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          AddRole:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: role title
 *                  permissions:
 *                      $ref: '#/components/schemas/Permissions'
 *          EditRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: role title
 *                  permissions:
 *                      $ref: '#/components/schemas/Permissions'
 *
 */