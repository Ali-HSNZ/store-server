/**
 * @swagger
 *  components:
 *      schemas:
 *          Permissions:
 *              type: array
 *              description: permission id for role
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddRole:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: role title
 *                  description:
 *                      type: string
 *                      description: role description
 *                  permissions:
 *                      $ref: '#/components/schemas/Permissions'
 *          EditRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: role title
 *                  description:
 *                      type: string
 *                      description: role description
 *                  permissions:
 *                      $ref: '#/components/schemas/Permissions'
 *
 */
