// src/modules/financial-year/financialYear.route.ts


/**
 * @swagger
 * tags:
 *   name: Financial Years
 *   description: Financial Years management endpoints
 */

import { Router } from 'express';
import { FinancialYearController } from './financialYear.controller';
import { FinancialYearService } from './financialYear.service';
import { FinancialYearRepository } from './financialYear.repository';

const repository = new FinancialYearRepository();
const service = new FinancialYearService(repository);
const controller = new FinancialYearController(service);

const router = Router();

// Standard CRUD operations

/**
 * @swagger
 * /api/fy:
 *   get:
 *     summary: Get all financial years
 *     tags: [Financial Years]
 *     responses:
 *       200:
 *         description: List of financial years
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
 * /api/fy/query:
 *   get:
 *     summary: Get financial years with advanced query parameters
 *     tags: [Financial Years]
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
 *           example: 2024-25
 *         description: Search term for text fields
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *           example: '[{"field":"isActive","operator":"eq","value":true}]'
 *         description: JSON string of filter objects
 *     responses:
 *       200:
 *         description: Paginated list of financial years
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
 * /api/fy/validate-query:
 *   get:
 *     summary: Validate query parameters without executing the query
 *     tags: [Financial Years]
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
 * /api/fy/{id}:
 *   get:
 *     summary: Get financial year by ID
 *     tags: [Financial Years]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Financial Year ID
 *     responses:
 *       200:
 *         description: Financial Year details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Financial Year not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @swagger
 * /api/fy:
 *   post:
 *     summary: Create new financial year
 *     tags: [Financial Years]
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
 *                 example: "CODE_FY"
 *                 description: Unique code for the financial year
 *               nameEn:
 *                 type: string
 *                 example: "2024-25"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "2024-25 (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Description of 2024-25"
 *                 description: Optional description
 *     responses:
 *       201:
 *         description: Financial Year created successfully
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
 * /api/fy/{id}:
 *   put:
 *     summary: Update financial year
 *     tags: [Financial Years]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Financial Year ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "CODE_FY"
 *                 description: Unique code for the financial year
 *               nameEn:
 *                 type: string
 *                 example: "2024-25"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "2024-25 (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *                 description: Optional description
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: Whether the financial year is active
 *     responses:
 *       200:
 *         description: Financial Year updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Financial Year not found
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
 * /api/fy/{id}:
 *   delete:
 *     summary: Delete financial year
 *     tags: [Financial Years]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Financial Year ID
 *     responses:
 *       200:
 *         description: Financial Year deleted successfully
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
 *                   example: "Financial Year deleted successfully"
 *       404:
 *         description: Financial Year not found
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