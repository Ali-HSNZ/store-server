/**
 * @swagger
 * /auth/login:
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
