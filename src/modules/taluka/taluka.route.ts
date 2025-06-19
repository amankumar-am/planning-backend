// src/modules/taluka/taluka.route.ts


/**
 * @swagger
 * tags:
 *   name: Talukas
 *   description: Talukas management endpoints
 */

import { Router } from 'express';
import { TalukaController } from './taluka.controller';
import { TalukaService } from './taluka.service';
import { TalukaRepository } from './taluka.repository';

const repository = new TalukaRepository();
const service = new TalukaService(repository);
const controller = new TalukaController(service);

const router = Router();

// Standard CRUD operations

/**
 * @swagger
 * /api/talukas:
 *   get:
 *     summary: Get all talukas
 *     tags: [Talukas]
 *     responses:
 *       200:
 *         description: List of talukas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));

/**
 * @swagger
 * /api/talukas/validate-query:
 *   get:
 *     summary: Validate query parameters without executing the query
 *     tags: [Talukas]
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
 * /api/talukas/{id}:
 *   get:
 *     summary: Get taluka by ID
 *     tags: [Talukas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Taluka ID
 *     responses:
 *       200:
 *         description: Taluka details with district information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Taluka not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @swagger
 * /api/talukas:
 *   post:
 *     summary: Create new taluka
 *     tags: [Talukas]
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
               - districtId
 *             properties:
 *               code:
 *                 type: string
 *                 example: "TALUKAS_CODE"
 *                 description: Unique code for the taluka
 *               nameEn:
 *                 type: string
 *                 example: "Gandhinagar"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Gandhinagar (Gujarati)"
 *                 description: Name in Gujarati
               districtId:
                 type: integer
                 example: 1
                 description: Associated district ID
 *               description:
 *                 type: string
 *                 example: "Description of Gandhinagar"
 *                 description: Optional description
 *     responses:
 *       201:
 *         description: Taluka created successfully
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
 * /api/talukas/{id}:
 *   put:
 *     summary: Update taluka
 *     tags: [Talukas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Taluka ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "TALUKAS_CODE"
 *                 description: Unique code for the taluka
 *               nameEn:
 *                 type: string
 *                 example: "Gandhinagar"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Gandhinagar (Gujarati)"
 *                 description: Name in Gujarati
               districtId:
                 type: integer
                 example: 1
                 description: Associated district ID
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *                 description: Optional description
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: Whether the taluka is active
 *     responses:
 *       200:
 *         description: Taluka updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Taluka not found
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
 * /api/talukas/{id}:
 *   delete:
 *     summary: Delete taluka
 *     tags: [Talukas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Taluka ID
 *     responses:
 *       200:
 *         description: Taluka deleted successfully
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
 *                   example: "Taluka deleted successfully"
 *       404:
 *         description: Taluka not found
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

// Custom taluka routes
router.get('/district/:districtId', controller.getByDistrictId.bind(controller));
router.get('/dashboard/global/district/:districtId/total-talukas', controller.getTotalTalukas.bind(controller));

export default router;