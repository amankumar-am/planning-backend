// src/modules/ac/ac.route.ts


/**
 * @swagger
 * tags:
 *   name: Assembly Constituencies
 *   description: Assembly Constituencies management endpoints
 */

import { Router } from 'express';
import { ACController } from './ac.controller';
import { ACService } from './ac.service';
import { ACRepository } from './ac.repository';

const repository = new ACRepository();
const service = new ACService(repository);
const controller = new ACController(service);

const router = Router();

// Standard CRUD operations

/**
 * @swagger
 * /api/acs:
 *   get:
 *     summary: Get all assembly constituencies
 *     tags: [Assembly Constituencies]
 *     responses:
 *       200:
 *         description: List of assembly constituencies
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
 * /api/acs/query:
 *   get:
 *     summary: Get assembly constituencies with advanced query parameters
 *     tags: [Assembly Constituencies]
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
 *           example: Gandhinagar
 *         description: Search term for text fields
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *           example: '[{"field":"isActive","operator":"eq","value":true}]'
 *         description: JSON string of filter objects
 *     responses:
 *       200:
 *         description: Paginated list of assembly constituencies
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
 * /api/acs/validate-query:
 *   get:
 *     summary: Validate query parameters without executing the query
 *     tags: [Assembly Constituencies]
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
 * /api/acs/{id}:
 *   get:
 *     summary: Get assembly constituency by ID
 *     tags: [Assembly Constituencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Assembly Constituencie ID
 *     responses:
 *       200:
 *         description: Assembly Constituencie details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Assembly Constituencie not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @swagger
 * /api/acs:
 *   post:
 *     summary: Create new assembly constituency
 *     tags: [Assembly Constituencies]
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
 *                 example: "CODE_ACS"
 *                 description: Unique code for the assembly constituency
 *               nameEn:
 *                 type: string
 *                 example: "Gandhinagar"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Gandhinagar (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Description of Gandhinagar"
 *                 description: Optional description
 *     responses:
 *       201:
 *         description: Assembly Constituencie created successfully
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
 * /api/acs/{id}:
 *   put:
 *     summary: Update assembly constituency
 *     tags: [Assembly Constituencies]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Assembly Constituencie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "CODE_ACS"
 *                 description: Unique code for the assembly constituency
 *               nameEn:
 *                 type: string
 *                 example: "Gandhinagar"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Gandhinagar (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *                 description: Optional description
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: Whether the assembly constituency is active
 *     responses:
 *       200:
 *         description: Assembly Constituencie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Assembly Constituencie not found
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
 * /api/acs/{id}:
 *   delete:
 *     summary: Delete assembly constituency
 *     tags: [Assembly Constituencies]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Assembly Constituencie ID
 *     responses:
 *       200:
 *         description: Assembly Constituencie deleted successfully
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
 *                   example: "Assembly Constituencie deleted successfully"
 *       404:
 *         description: Assembly Constituencie not found
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

// Custom AC routes
router.get('/district/:districtId', controller.getByDistrictId.bind(controller));
router.get('/dashboard/global/district/:districtId/total-acs', controller.getTotalACs.bind(controller));

export default router;