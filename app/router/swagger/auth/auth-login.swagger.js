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
 *          201:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 *
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
 *          201:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 *
 */

/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *      tags:
 *          -   Auth
 *      summary: send refresh token for get new access token and refresh token
 *      description: fresh token
 *      parameters:
 *      -   name: refreshToken
 *          in: formData
 *          example: <Your_Access_Token>
 *          required: true
 *          type: string
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          500:
 *              description: Internal server error
 *
 */
