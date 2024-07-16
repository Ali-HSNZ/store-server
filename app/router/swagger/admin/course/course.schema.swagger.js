/**
 * @swagger
 *  components:
 *      schemas:
 *          CourseType:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of chapter
 *                      example: javascript course
 *                  text:
 *                      type: string
 *                      description: the describe about chapter
 *          AddCourse:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of course
 *                  short_text:
 *                      type: string
 *                      description: short_text of course
 *                  text:
 *                      type: string
 *                      description: text of course
 *                  tags:
 *                      type: array
 *                      description: tags of course
 *                  category:
 *                      type: string
 *                      description: category id of course
 *                  price:
 *                      type: number
 *                      description: price of course
 *                  discount:
 *                      type: number
 *                      description: discount of course
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: picture of course
 *                  type:
 *                      $ref: '#/components/schemas/CourseType'
 */
