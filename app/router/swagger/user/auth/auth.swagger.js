/**
 * @swagger
 * /auth/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: get OTP code with phone number
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 * /auth/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check OTP code
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 * /auth/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary:  update access-token with refresh token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */
