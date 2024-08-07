/**
 * @swagger
 *  components:
 *      schemas:
 *          ProductColor:
 *              type: array
 *              items:
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddProduct:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   short_text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  short_text:
 *                      type: string
 *                      description: short_text of product
 *                  text:
 *                      type: string
 *                      description: text of product
 *                  tags:
 *                      type: array
 *                      description: tags of product
 *                  category:
 *                      type: string
 *                      description: category id of product
 *                  price:
 *                      type: number
 *                      description: price of product
 *                  discount:
 *                      type: number
 *                      description: discount of product
 *                  count:
 *                      type: number
 *                      description: count of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                      description: picture of product
 *                  height:
 *                      type: number
 *                      description: height of product packet
 *                  weight:
 *                      type: number
 *                      description: weight of product packet
 *                  width:
 *                      type: number
 *                      description: width of product packet
 *                  length:
 *                      type: number
 *                      description: length of product packet
 *                  madeIn:
 *                      type: string
 *                      description: made product in ? country
 *                  colors:
 *                      $ref: '#/components/schemas/ProductColor'
 *                  model:
 *                      type: array
 *                      description: product models
 *          EditProduct:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  short_text:
 *                      type: string
 *                      description: short_text of product
 *                  text:
 *                      type: string
 *                      description: text of product
 *                  tags:
 *                      type: array
 *                      description: tags of product
 *                  category:
 *                      type: string
 *                      description: category id of product
 *                  price:
 *                      type: number
 *                      description: price of product
 *                  discount:
 *                      type: number
 *                      description: discount of product
 *                  count:
 *                      type: number
 *                      description: count of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                      description: picture of product
 *                  height:
 *                      type: number
 *                      description: height of product packet
 *                  weight:
 *                      type: number
 *                      description: weight of product packet
 *                  width:
 *                      type: number
 *                      description: width of product packet
 *                  length:
 *                      type: number
 *                      description: length of product packet
 *                  madeIn:
 *                      type: string
 *                      description: made product in ? country
 *                  color:
 *                      type: string
 *                      description: product color
 *                  model:
 *                      type: array
 *                      description: product models
 *
 */
