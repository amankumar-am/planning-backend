// src/modules/gpVillage/gpVillage.route.ts


/**
 * @swagger
 * tags:
 *   name: GP Villages
 *   description: GP Villages management endpoints
 */

import { Router } from 'express';
import { GpVillageController } from './gpVillage.controller';
import { GpVillageService } from './gpVillage.service';
import { GpVillageRepository } from './gpVillage.repository';

const repository = new GpVillageRepository();
const service = new GpVillageService(repository);
const controller = new GpVillageController(service);

const router = Router();

// Standard CRUD operations

/**
 * @swagger
 * /api/gpVillages:
 *   get:
 *     summary: Get all GP villages with district and taluka relations
 *     tags: [GP Villages]
 *     responses:
 *       200:
 *         description: List of GP villages with district and taluka information
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
 *                   district:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nameEn:
 *                         type: string
 *                       nameGu:
 *                         type: string
 *                   taluka:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nameEn:
 *                         type: string
 *                       nameGu:
 *                         type: string
 */
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));

/**
 * @swagger
 * /api/gpVillages/{id}:
 *   get:
 *     summary: Get GP village by ID
 *     tags: [GP Villages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: GP Village ID
 *     responses:
 *       200:
 *         description: GP Village details with district, taluka information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: GP Village not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @swagger
 * /api/gpVillages:
 *   post:
 *     summary: Create new GP village
 *     tags: [GP Villages]
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
 *                 example: "GPVILLAGES_CODE"
 *                 description: Unique code for the GP village
 *               nameEn:
 *                 type: string
 *                 example: "Gandhinagar Village"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Gandhinagar Village (Gujarati)"
 *                 description: Name in Gujarati
               districtId:
                 type: integer
                 example: 1
                 description: Associated district ID
               talukaId:
                 type: integer
                 example: 1
                 description: Associated taluka ID
 *               description:
 *                 type: string
 *                 example: "Description of Gandhinagar Village"
 *                 description: Optional description
 *     responses:
 *       201:
 *         description: GP Village created successfully
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
 * /api/gpVillages/{id}:
 *   put:
 *     summary: Update GP village
 *     tags: [GP Villages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: GP Village ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "GPVILLAGES_CODE"
 *                 description: Unique code for the GP village
 *               nameEn:
 *                 type: string
 *                 example: "Gandhinagar Village"
 *                 description: Name in English
 *               nameGu:
 *                 type: string
 *                 example: "Gandhinagar Village (Gujarati)"
 *                 description: Name in Gujarati
               districtId:
                 type: integer
                 example: 1
                 description: Associated district ID
               talukaId:
                 type: integer
                 example: 1
                 description: Associated taluka ID
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *                 description: Optional description
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: Whether the GP village is active
 *     responses:
 *       200:
 *         description: GP Village updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: GP Village not found
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
 * /api/gpVillages/{id}:
 *   delete:
 *     summary: Delete GP village
 *     tags: [GP Villages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: GP Village ID
 *     responses:
 *       200:
 *         description: GP Village deleted successfully
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
 *                   example: "GP Village deleted successfully"
 *       404:
 *         description: GP Village not found
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

// Custom village routes (with specific path patterns to avoid conflicts)
router.get('/district/:districtId', controller.getByDistrictId.bind(controller));
router.get('/taluka/:talukaId', controller.getByTalukaId.bind(controller));

export default router;