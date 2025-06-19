/**
 * @swagger
 * tags:
 *   name: Admin - User Management
 *   description: Admin endpoints for user management operations
 */

import { Router } from 'express';
import { AdminController } from './admin.controller';
import { UserRepository } from './user.repository';
import { PermissionService } from './permission.service';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
const userRepository = new UserRepository();
const permissionService = new PermissionService();
const adminController = new AdminController(userRepository, permissionService);

// Apply authentication middleware to all admin routes
router.use(authMiddleware);

// User management endpoints

/**
 * @swagger
 * /api/users/admin/all:
 *   get:
 *     summary: Get all users with roles
 *     tags: [Admin - User Management]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users with their roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 */
router.get('/all', adminController.getAllUsers.bind(adminController));

/**
 * @swagger
 * /api/users/admin/{userId}/roles:
 *   post:
 *     summary: Assign roles to user
 *     tags: [Admin - User Management]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roles
 *             properties:
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of role codes to assign
 *                 example: ["ADMIN", "USER_MGR"]
 *     responses:
 *       200:
 *         description: Roles assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid request data
 */
router.post('/:userId/roles', adminController.assignRoles.bind(adminController));

/**
 * @swagger
 * /api/users/admin/{userId}/roles:
 *   delete:
 *     summary: Remove roles from user
 *     tags: [Admin - User Management]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roles
 *             properties:
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of role codes to remove
 *                 example: ["USER_MGR"]
 *     responses:
 *       200:
 *         description: Roles removed successfully
 *       404:
 *         description: User not found
 */
router.delete('/:userId/roles', adminController.removeRoles.bind(adminController));

/**
 * @swagger
 * /api/users/admin/{userId}/status:
 *   patch:
 *     summary: Toggle user active status
 *     tags: [Admin - User Management]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 description: Whether the user should be active
 *                 example: false
 *     responses:
 *       200:
 *         description: User status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 isActive:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.patch('/:userId/status', adminController.toggleUserStatus.bind(adminController));

/**
 * @swagger
 * /api/users/admin/create:
 *   post:
 *     summary: Create new user
 *     tags: [Admin - User Management]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name
 *                 example: Jane Smith
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address
 *                 example: jane@company.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Password (minimum 6 characters)
 *                 example: password123
 *               username:
 *                 type: string
 *                 description: Username (optional, will be generated from email if not provided)
 *                 example: jane.smith
 *               firstName:
 *                 type: string
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 example: Smith
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of role codes to assign
 *                 example: ["DATA_ENTRY"]
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 description: Whether the user should be active
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error or email already exists
 */
router.post('/create', adminController.createUser.bind(adminController));

/**
 * @swagger
 * /api/users/admin/{userId}:
 *   delete:
 *     summary: Delete user
 *     tags: [Admin - User Management]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.delete('/:userId', adminController.deleteUser.bind(adminController));

/**
 * @swagger
 * /api/users/admin/{userId}/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Admin - User Management]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 temporaryPassword:
 *                   type: string
 *                   description: The temporary password generated
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.post('/:userId/reset-password', adminController.resetPassword.bind(adminController));

export default router; 