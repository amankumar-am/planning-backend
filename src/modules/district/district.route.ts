// src/modules/district/district.route.ts

/**
 * @swagger
 * tags:
 *   name: Districts
 *   description: District management endpoints
 */

import { Router } from 'express';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { DistrictRepository } from './district.repository';

const repository = new DistrictRepository();
const service = new DistrictService(repository);
const controller = new DistrictController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));

/**
 * @swagger
 * /api/districts/validate-query:
 *   get:
 *     summary: Validate query parameters without executing the query
 *     tags: [Districts]
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
 * /api/districts/{id}:
 *   get:
 *     summary: Get district by ID
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: District ID
 *     responses:
 *       200:
 *         description: District details with state information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: District not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @swagger
 * /api/districts:
 *   post:
 *     summary: Create new district
 *     tags: [Districts]
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
 *               - nameGu
               - stateId
 *             properties:
 *               code:
 *                 type: string
 *                 example: "DISTRICTS_CODE"
 *                 description: Unique code for the district
 *               nameEn:
 *                 type: string
 *                 example: "Ahmedabad"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Ahmedabad (Gujarati)"
 *                 description: Name in Gujarati
               stateId:
                 type: integer
                 example: 1
                 description: Associated state ID
 *               description:
 *                 type: string
 *                 example: "Description of Ahmedabad"
 *                 description: Optional description
 *     responses:
 *       201:
 *         description: District created successfully
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
 * /api/districts/{id}:
 *   put:
 *     summary: Update district
 *     tags: [Districts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: District ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "DISTRICTS_CODE"
 *                 description: Unique code for the district
 *               nameEn:
 *                 type: string
 *                 example: "Ahmedabad"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Ahmedabad (Gujarati)"
 *                 description: Name in Gujarati
               stateId:
                 type: integer
                 example: 1
                 description: Associated state ID
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *                 description: Optional description
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: Whether the district is active
 *     responses:
 *       200:
 *         description: District updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: District not found
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
 * /api/districts/{id}:
 *   delete:
 *     summary: Delete district
 *     tags: [Districts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: District ID
 *     responses:
 *       200:
 *         description: District deleted successfully
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
 *                   example: "District deleted successfully"
 *       404:
 *         description: District not found
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