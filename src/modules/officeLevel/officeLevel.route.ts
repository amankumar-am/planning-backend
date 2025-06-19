// src/modules/officeLevel/officeLevel.route.ts


/**
 * @swagger
 * tags:
 *   name: Office Levels
 *   description: Office Levels management endpoints
 */

import { Router } from 'express';
import { OfficeLevelController } from './officeLevel.controller';
import { OfficeLevelService } from './officeLevel.service';
import { OfficeLevelRepository } from './officeLevel.repository';

const repository = new OfficeLevelRepository();
const service = new OfficeLevelService(repository);
const controller = new OfficeLevelController(service);

const router = Router();

// Standard CRUD operations

/**
 * @swagger
 * /api/offLevels:
 *   get:
 *     summary: Get all office levels
 *     tags: [Office Levels]
 *     responses:
 *       200:
 *         description: List of office levels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', controller.list.bind(controller));

/**
 * @swagger
 * /api/offLevels/query:
 *   get:
 *     summary: Get office levels with advanced query parameters
 *     tags: [Office Levels]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           example: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: nameEn
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           example: ASC
 *         description: Sort order
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: District Level
 *         description: Search term for text fields
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *           example: '[{"field":"isActive","operator":"eq","value":true}]'
 *         description: JSON string of filter objects
 *     responses:
 *       200:
 *         description: Paginated list of office levels
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/query', controller.listWithQuery.bind(controller));

/**
 * @swagger
 * /api/offLevels/validate-query:
 *   get:
 *     summary: Validate query parameters without executing the query
 *     tags: [Office Levels]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sort order
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *         description: JSON string of filter objects
 *     responses:
 *       200:
 *         description: Query validation result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationResponse'
 */
router.get('/validate-query', controller.validateQuery.bind(controller));


/**
 * @swagger
 * /api/offLevels/{id}:
 *   get:
 *     summary: Get office level by ID
 *     tags: [Office Levels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Office Level ID
 *     responses:
 *       200:
 *         description: Office Level details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Office Level not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @swagger
 * /api/offLevels:
 *   post:
 *     summary: Create new office level
 *     tags: [Office Levels]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - nameEn
 *             properties:
 *               code:
 *                 type: string
 *                 example: "CODE_OFFLEVELS"
 *                 description: Unique code for the office level
 *               nameEn:
 *                 type: string
 *                 example: "District Level"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "District Level (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Description of District Level"
 *                 description: Optional description
 *     responses:
 *       201:
 *         description: Office Level created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', controller.create.bind(controller));

/**
 * @swagger
 * /api/offLevels/{id}:
 *   put:
 *     summary: Update office level
 *     tags: [Office Levels]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Office Level ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "CODE_OFFLEVELS"
 *                 description: Unique code for the office level
 *               nameEn:
 *                 type: string
 *                 example: "District Level"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "District Level (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *                 description: Optional description
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: Whether the office level is active
 *     responses:
 *       200:
 *         description: Office Level updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Office Level not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', controller.update.bind(controller));

/**
 * @swagger
 * /api/offLevels/{id}:
 *   delete:
 *     summary: Delete office level
 *     tags: [Office Levels]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Office Level ID
 *     responses:
 *       200:
 *         description: Office Level deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Office Level deleted successfully"
 *       404:
 *         description: Office Level not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', controller.delete.bind(controller));

export default router;