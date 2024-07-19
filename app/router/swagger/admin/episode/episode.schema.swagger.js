/**
 * @swagger
 *  components:
 *      schemas:
 *          EpisodeType:
 *              type: string
 *              enum:
 *                  -   lock
 *                  -   unlock
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   type
 *                  -   video
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of episode
 *                  text:
 *                      type: string
 *                      description: text of episode
 *                  type:
 *                      description: select the episode type
 *                      $ref: '#/components/schemas/EpisodeType'
 *                  video:
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 *          EditEpisode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of episode
 *                  text:
 *                      type: string
 *                      description: text of episode
 *                  type:
 *                      description: select the episode type
 *                      $ref: '#/components/schemas/EpisodeType'
 *                  video:
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 */
