/**
 * @swagger
 * components:
 *   schemas:
 *     CarResponseObject:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The car ID.
 *           example: 0
 *         make:
 *           type: string
 *           description: The car's brand.
 *           example: Mercedes
 *         model:
 *           type: string
 *           description: The car's model.
 *           example: S400
 *         year:
 *           type: integer
 *           description: The car's year.
 *           example: 2024
 *         createdAt:
 *           type: date-time
 *           description: createdAt.
 *           example: 2024-04-07T17:32:28Z
 *         updatedAt:
 *           type: date-time
 *           description: updatedAt.
 *           example: 2024-04-07T17:32:28Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CarRequestObject:
 *       type: object
 *       properties:
 *         make:
 *           type: string
 *           description: The car's brand.
 *           example: Mercedes
 *         model:
 *           type: string
 *           description: The car's model.
 *           example: S400
 *         year:
 *           type: integer
 *           description: The car's year.
 *           example: 2024
 */
