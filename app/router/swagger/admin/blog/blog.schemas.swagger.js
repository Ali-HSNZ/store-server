/**
 * @swagger
 *  components:
 *      schemas:
 *          AddBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of blog
 *                  text:
 *                      type: string
 *                      description: text of blog
 *                  short_text:
 *                      type: string
 *                      description: summary of blog
 *                  category:
 *                      type: string
 *                      description: id of category
 *                  image:
 *                      type: file
 *                      description: picture of blog
 *          EditBlog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of blog
 *                  text:
 *                      type: string
 *                      description: text of blog
 *                  short_text:
 *                      type: string
 *                      description: summary of blog
 *                  category:
 *                      type: string
 *                      description: id of category
 *                  image:
 *                      type: file
 *                      description: picture of blog
 *
 */
