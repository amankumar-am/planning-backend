// src/modules/subsector/subsector.route.ts


/**
 * @swagger
 * tags:
 *   name: Sub Sectors
 *   description: Sub Sectors management endpoints
 */

import { Router } from 'express';
import { SubSectorController } from './subsector.controller';
import { SubSectorRepository } from './subsector.repository';
import { SubSectorService } from './subsector.service';

const repository = new SubSectorRepository();
const service = new SubSectorService(repository);
const controller = new SubSectorController(service);

const router = Router();

// Standard CRUD operations

/**
 * @swagger
 * /api/subSectors:
 *   get:
 *     summary: Get all sub sectors
 *     tags: [Sub Sectors]
 *     responses:
 *       200:
 *         description: List of sub sectors
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
 * /api/subSectors/query:
 *   get:
 *     summary: Get sub sectors with advanced query parameters
 *     tags: [Sub Sectors]
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
 *           example: Irrigation
 *         description: Search term for text fields
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *           example: '[{"field":"isActive","operator":"eq","value":true}]'
 *         description: JSON string of filter objects
 *     responses:
 *       200:
 *         description: Paginated list of sub sectors
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
 * /api/subSectors/validate-query:
 *   get:
 *     summary: Validate query parameters without executing the query
 *     tags: [Sub Sectors]
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
 * /api/subSectors/{id}:
 *   get:
 *     summary: Get sub sector by ID
 *     tags: [Sub Sectors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sub Sector ID
 *     responses:
 *       200:
 *         description: Sub Sector details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Sub Sector not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @swagger
 * /api/subSectors:
 *   post:
 *     summary: Create new sub sector
 *     tags: [Sub Sectors]
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
 *                 example: "CODE_SUBSECTORS"
 *                 description: Unique code for the sub sector
 *               nameEn:
 *                 type: string
 *                 example: "Irrigation"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Irrigation (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Description of Irrigation"
 *                 description: Optional description
 *     responses:
 *       201:
 *         description: Sub Sector created successfully
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
 * /api/subSectors/{id}:
 *   put:
 *     summary: Update sub sector
 *     tags: [Sub Sectors]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sub Sector ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "CODE_SUBSECTORS"
 *                 description: Unique code for the sub sector
 *               nameEn:
 *                 type: string
 *                 example: "Irrigation"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Irrigation (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *                 description: Optional description
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: Whether the sub sector is active
 *     responses:
 *       200:
 *         description: Sub Sector updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Sub Sector not found
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
 * /api/subSectors/{id}:
 *   delete:
 *     summary: Delete sub sector
 *     tags: [Sub Sectors]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sub Sector ID
 *     responses:
 *       200:
 *         description: Sub Sector deleted successfully
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
 *                   example: "Sub Sector deleted successfully"
 *       404:
 *         description: Sub Sector not found
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

// Custom subsector routes (specific to subsector)
router.get('/sector/:sectorId', controller.getBySectorId.bind(controller));

export default router;