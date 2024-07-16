/**
 * @swagger
 *  definitions:
 *      getAllCoursesDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "6696928bc3c5d5d9eaf02a78"
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "short text of course"
 *                                  text:
 *                                      type: string
 *                                      example: "text of course"
 *                                  image:
 *                                      type: string
 *                                      example: "uploads/blogs/2024/6/2/1721143947679.jpg"
 *                                  tags:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          example: "tag1"
 *                                  category:
 *                                      type: string
 *                                      example: "6696928bc3c5d5d9eaf02a79"
 *                                  likes:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          example: '6696928bc3c5d5d9eaf02a79'
 *                                  dislikes:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          example: '6696928bc3c5d5d9eaf02a79'
 *                                  bookmarks:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          example: '6696928bc3c5d5d9eaf02a79'
 *                                  price:
 *                                      type: integer
 *                                      example: 2500000
 *                                  discount:
 *                                      type: integer
 *                                      example: 10
 *                                  type:
 *                                      type: string
 *                                      example: "'free' | 'cash' | 'spatial'"
 *                                  status:
 *                                      type: string
 *                                      example: "'notStarted' | 'completed' | 'holding'"
 *                                  time:
 *                                      type: string
 *                                      example: "01:14:18"
 *                                  teacher:
 *                                      type: string
 *                                      example: "742162e464e5502259e71f95"
 *                                  students:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          example: '6696928bc3c5d5d9eaf02a79'
 *                                  comments:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              user:
 *                                                  type: string
 *                                                  example: "6696928bc3c5d5d9eaf69a79"
 *                                              comment:
 *                                                  type: string
 *                                                  example: "the best course"
 *                                              parent:
 *                                                  type: string
 *                                                  example: "1196928bc3c5d5d9eaf69a79"
 *                                  chapters:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              title:
 *                                                  type: string
 *                                                  example: "title of chapter"
 *                                              text:
 *                                                  type: string
 *                                                  example: "text of chapter"
 *                                              episodes:
 *                                                  type: array
 *                                                  items:
 *                                                      type: object
 *                                                      properties:
 *                                                          title:
 *                                                              type: string
 *                                                              example: title of episode
 *                                                          text:
 *                                                              type: string
 *                                                              example: "text of episode"
 *                                                          type:
 *                                                              type: string
 *                                                              example: "free"
 *                                                          time:
 *                                                              type: string
 *                                                              example: "00:48:14"
 *
 *
 *
 *
 */
