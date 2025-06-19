/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management endpoints
 */

import { Router } from 'express';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';

const router = Router();

// Create instances
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

// CRUD routes

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of all roles
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
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   type:
 *                     type: string
 *                   priority:
 *                     type: integer
 */
router.get('/', (req, res) => roleController.list(req, res));

/**
 * @swagger
 * /api/roles/query:
 *   get:
 *     summary: Get roles with query parameters
 *     tags: [Roles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list of roles
 */
router.get('/query', (req, res) => roleController.listWithQuery(req, res));

router.get('/validate-query', (req, res) => roleController.validateQuery(req, res));

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role details
 *       404:
 *         description: Role not found
 */
router.get('/:id', (req, res) => roleController.getById(req, res));

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create new role
 *     tags: [Roles]
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
 *               - name
 *             properties:
 *               code:
 *                 type: string
 *                 example: "CUSTOM_ROLE"
 *               name:
 *                 type: string
 *                 example: "Custom Role"
 *               description:
 *                 type: string
 *                 example: "Custom role description"
 *               type:
 *                 type: string
 *                 example: "functional"
 *               priority:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Role created successfully
 */
router.post('/', (req, res) => roleController.create(req, res));

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update role
 *     tags: [Roles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               priority:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 */
router.put('/:id', (req, res) => roleController.update(req, res));

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete role
 *     tags: [Roles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */
router.delete('/:id', (req, res) => roleController.delete(req, res));

// Special routes
router.get('/code/:code', (req, res) => roleController.getByCode(req, res));
router.get('/type/:type', (req, res) => roleController.getByType(req, res));
router.get('/:id/users', (req, res) => roleController.getWithUsers(req, res));
router.get('/:id/groups', (req, res) => roleController.getWithGroups(req, res));

export default router; 