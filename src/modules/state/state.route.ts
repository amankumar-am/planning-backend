// src/modules/state/state.route.ts

/**
 * @swagger
 * tags:
 *   name: States
 *   description: State management endpoints
 */

import { Router } from 'express';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { StateRepository } from './state.repository';

const repository = new StateRepository();
const service = new StateService(repository);
const controller = new StateController(service);

const router = Router();

// Standard CRUD operations

/**
 * @swagger
 * /api/states:
 *   get:
 *     summary: Get all states
 *     tags: [States]
 *     responses:
 *       200:
 *         description: List of all states
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   code:
 *                     type: string
 *                   nameEn:
 *                     type: string
 *                   nameGu:
 *                     type: string
 */
router.get('/', controller.list.bind(controller));

/**
 * @swagger
 * /api/states/query:
 *   get:
 *     summary: Get states with advanced query parameters and filtering
 *     tags: [States]
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
 *           example: Gujarat
 *         description: Search term for text fields
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *           example: '[{"field":"isActive","operator":"eq","value":true}]'
 *         description: JSON string of filter objects
 *     responses:
 *       200:
 *         description: Paginated list of states with filtering and sorting
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
 * /api/states/validate-query:
 *   get:
 *     summary: Validate query parameters without executing the query
 *     tags: [States]
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
 * /api/states/{id}:
 *   get:
 *     summary: Get state by ID
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: State ID
 *     responses:
 *       200:
 *         description: State details
 *       404:
 *         description: State not found
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @swagger
 * /api/states:
 *   post:
 *     summary: Create new state
 *     tags: [States]
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
 *             properties:
 *               code:
 *                 type: string
 *                 example: "GJ"
 *               nameEn:
 *                 type: string
 *                 example: "Gujarat"
 *               nameGu:
 *                 type: string
 *                 example: "ગુજરાત"
 *     responses:
 *       201:
 *         description: State created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', controller.create.bind(controller));

/**
 * @swagger
 * /api/states/{id}:
 *   put:
 *     summary: Update state
 *     tags: [States]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: State ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               nameEn:
 *                 type: string
 *               nameGu:
 *                 type: string
 *     responses:
 *       200:
 *         description: State updated successfully
 *       404:
 *         description: State not found
 */
router.put('/:id', controller.update.bind(controller));

/**
 * @swagger
 * /api/states/{id}:
 *   delete:
 *     summary: Delete state
 *     tags: [States]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: State ID
 *     responses:
 *       200:
 *         description: State deleted successfully
 *       404:
 *         description: State not found
 */
router.delete('/:id', controller.delete.bind(controller));

export default router;