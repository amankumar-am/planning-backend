// src/modules/mpmla/mpmla.route.ts


/**
 * @swagger
 * tags:
 *   name: MP/MLAs
 *   description: MP/MLAs management endpoints
 */

import { Router } from 'express';
import { MpmlaController } from './mpmla.controller';
import { MpmlaService } from './mpmla.service';
import { MpmlaRepository } from './mpmla.repository';

const repository = new MpmlaRepository();
const service = new MpmlaService(repository);
const controller = new MpmlaController(service);

const router = Router();

// Standard CRUD operations

/**
 * @swagger
 * /api/mpmlas:
 *   get:
 *     summary: Get all mp/mlas
 *     tags: [MP/MLAs]
 *     responses:
 *       200:
 *         description: List of mp/mlas
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
 * /api/mpmlas/query:
 *   get:
 *     summary: Get mp/mlas with advanced query parameters
 *     tags: [MP/MLAs]
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
 *           example: John Doe
 *         description: Search term for text fields
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *           example: '[{"field":"isActive","operator":"eq","value":true}]'
 *         description: JSON string of filter objects
 *     responses:
 *       200:
 *         description: Paginated list of mp/mlas
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
 * /api/mpmlas/validate-query:
 *   get:
 *     summary: Validate query parameters without executing the query
 *     tags: [MP/MLAs]
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
 * /api/mpmlas/{id}:
 *   get:
 *     summary: Get MP/MLA by ID
 *     tags: [MP/MLAs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: MP/MLA ID
 *     responses:
 *       200:
 *         description: MP/MLA details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: MP/MLA not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @swagger
 * /api/mpmlas:
 *   post:
 *     summary: Create new MP/MLA
 *     tags: [MP/MLAs]
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
 *                 example: "CODE_MPMLAS"
 *                 description: Unique code for the MP/MLA
 *               nameEn:
 *                 type: string
 *                 example: "John Doe"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "John Doe (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Description of John Doe"
 *                 description: Optional description
 *     responses:
 *       201:
 *         description: MP/MLA created successfully
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
 * /api/mpmlas/{id}:
 *   put:
 *     summary: Update MP/MLA
 *     tags: [MP/MLAs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: MP/MLA ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "CODE_MPMLAS"
 *                 description: Unique code for the MP/MLA
 *               nameEn:
 *                 type: string
 *                 example: "John Doe"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "John Doe (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *                 description: Optional description
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: Whether the MP/MLA is active
 *     responses:
 *       200:
 *         description: MP/MLA updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: MP/MLA not found
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
 * /api/mpmlas/{id}:
 *   delete:
 *     summary: Delete MP/MLA
 *     tags: [MP/MLAs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: MP/MLA ID
 *     responses:
 *       200:
 *         description: MP/MLA deleted successfully
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
 *                   example: "MP/MLA deleted successfully"
 *       404:
 *         description: MP/MLA not found
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

// router.get('/district/:talukaId', controller.getByRelatedId.bind(controller));

// router.get('/dashboard/global/district/:districtId/total-mpmlas', controller.getTotalMpmlas.bind(controller));

export default router;