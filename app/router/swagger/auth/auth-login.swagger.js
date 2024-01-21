/**
 * @swagger
 *
 * tags:
 *  name: Auth
 */

/**
 * @swagger
 * /user/get-otp:
 *  post:
 *      tags:
 *          -   Auth
 *      summary: Login with phone number
 *      description: One time password(OTP)
 *      parameters:
 *      -   name: mobile
 *          description: IR mobile
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description:    Success
 *          201:
 *              description:    Created
 *          203:
 *             description:     No Content(empty)
 *          400:
 *              description:    Bad Request
 *          401:
 *              description:    Unauthorized
 *          403:
 *              description:    Not Access(forbidden)
 *          404:
 *              description:    Not Found
 *          500:
 *              description:    Internal Server Error
 */

/**
 * @swagger
 * /user/check-otp:
 *  post:
 *      tags:
 *          -   Auth
 *      summary: check-otp value
 *      description: check otp with code - mobile and otp expires date
 *      parameters:
 *      -   name: mobile
 *          description: IR mobile
 *          in: formData
 *          required: true
 *          type: string
 *      -   name: code
 *          description: enter sms code received
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description:    Success
 *          201:
 *              description:    Created
 *          203:
 *             description:     No Content(empty)
 *          400:
 *              description:    Bad Request
 *          401:
 *              description:    Unauthorized
 *          403:
 *              description:    Not Access(forbidden)
 *          404:
 *              description:    Not Found
 *          500:
 *              description:    Internal Server Error
 */

/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *      tags:
 *          -   Auth
 *      summary: send refresh token for get new/valid access token and refresh token
 *      description: fresh token
 *      parameters:
 *      -   name: refreshToken
 *          in: formData
 *          example: <Current_Refresh_Token>
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description:    Success
 *          201:
 *              description:    Created
 *          203:
 *             description:     No Content(empty)
 *          400:
 *              description:    Bad Request
 *          401:
 *              description:    Unauthorized
 *          403:
 *              description:    Not Access(forbidden)
 *          404:
 *              description:    Not Found
 *          500:
 *              description:    Internal Server Error
 */
