// src/modules/beneficiary-group/beneficiaryGroup.route.ts


/**
 * @swagger
 * tags:
 *   name: Beneficiary Groups
 *   description: Beneficiary Groups management endpoints
 */

import { Router } from 'express';
import { BeneficiaryGroupController } from './beneficiaryGroup.controller';
import { BeneficiaryGroupService } from './beneficiaryGroup.service';
import { BeneficiaryGroupRepository } from './beneficiaryGroup.repository';

const repository = new BeneficiaryGroupRepository();
const service = new BeneficiaryGroupService(repository);
const controller = new BeneficiaryGroupController(service);

const router = Router();

// Standard CRUD operations

/**
 * @swagger
 * /api/bg:
 *   get:
 *     summary: Get all beneficiary groups
 *     tags: [Beneficiary Groups]
 *     responses:
 *       200:
 *         description: List of beneficiary groups
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
 * /api/bg/query:
 *   get:
 *     summary: Get beneficiary groups with advanced query parameters
 *     tags: [Beneficiary Groups]
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
 *           example: Farmers
 *         description: Search term for text fields
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *           example: '[{"field":"isActive","operator":"eq","value":true}]'
 *         description: JSON string of filter objects
 *     responses:
 *       200:
 *         description: Paginated list of beneficiary groups
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
 * /api/bg/validate-query:
 *   get:
 *     summary: Validate query parameters without executing the query
 *     tags: [Beneficiary Groups]
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
 * /api/bg/{id}:
 *   get:
 *     summary: Get beneficiary group by ID
 *     tags: [Beneficiary Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Beneficiary Group ID
 *     responses:
 *       200:
 *         description: Beneficiary Group details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Beneficiary Group not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @swagger
 * /api/bg:
 *   post:
 *     summary: Create new beneficiary group
 *     tags: [Beneficiary Groups]
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
 *                 example: "CODE_BG"
 *                 description: Unique code for the beneficiary group
 *               nameEn:
 *                 type: string
 *                 example: "Farmers"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Farmers (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Description of Farmers"
 *                 description: Optional description
 *     responses:
 *       201:
 *         description: Beneficiary Group created successfully
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
 * /api/bg/{id}:
 *   put:
 *     summary: Update beneficiary group
 *     tags: [Beneficiary Groups]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Beneficiary Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "CODE_BG"
 *                 description: Unique code for the beneficiary group
 *               nameEn:
 *                 type: string
 *                 example: "Farmers"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Farmers (Gujarati)"
 *                 description: Name in Gujarati
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *                 description: Optional description
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: Whether the beneficiary group is active
 *     responses:
 *       200:
 *         description: Beneficiary Group updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Beneficiary Group not found
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
 * /api/bg/{id}:
 *   delete:
 *     summary: Delete beneficiary group
 *     tags: [Beneficiary Groups]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Beneficiary Group ID
 *     responses:
 *       200:
 *         description: Beneficiary Group deleted successfully
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
 *                   example: "Beneficiary Group deleted successfully"
 *       404:
 *         description: Beneficiary Group not found
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