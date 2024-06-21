/**
 * @swagger
 * /auth/get-otp:
 *      post:
 *          tags: [Auth]
 *          summary: get OTP code with phone number
 *          parameters:
 *              -   name: mobile
 *                  in: formData
 *                  type: string
 *                  required: true
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
 *          tags: [Auth]
 *          summary: check OTP code
 *          parameters:
 *              -   name: mobile
 *                  in: formData
 *                  type: string
 *                  required: true
 *              -   name: code
 *                  in: formData
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */
