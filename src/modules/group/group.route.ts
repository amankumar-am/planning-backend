
/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Groups management endpoints
 */

import { Router } from 'express';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupRepository } from './group.repository';

const router = Router();

// Create instances
const groupRepository = new GroupRepository();
const groupService = new GroupService(groupRepository);
const groupController = new GroupController(groupService);

// CRUD routes

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: List of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', (req, res) => groupController.list(req, res));
router.get('/query', (req, res) => groupController.listWithQuery(req, res));
router.get('/validate-query', (req, res) => groupController.validateQuery(req, res));
router.get('/:id', (req, res) => groupController.getById(req, res));
router.post('/', (req, res) => groupController.create(req, res));
router.put('/:id', (req, res) => groupController.update(req, res));
router.delete('/:id', (req, res) => groupController.delete(req, res));

// Special routes
router.get('/roots', (req, res) => groupController.getRootGroups(req, res));
router.get('/code/:code', (req, res) => groupController.getByCode(req, res));
router.get('/type/:type', (req, res) => groupController.getByType(req, res));
router.get('/parent/:parentId', (req, res) => groupController.getByParentId(req, res));
router.get('/:id/users', (req, res) => groupController.getWithUsers(req, res));
router.get('/:id/roles', (req, res) => groupController.getWithRoles(req, res));

export default router; 