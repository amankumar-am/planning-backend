// src/modules/auth/auth.route.ts

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization endpoints
 */

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware';
import adminRoutes from './admin.route';

const repository = new UserRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);
const router = Router();

// User listing routes (require authentication)
router.get('/', authMiddleware, controller.list.bind(controller));
router.get('/query', authMiddleware, controller.listWithQuery.bind(controller));
router.get('/validate-query', authMiddleware, controller.validateQuery.bind(controller));

// Authentication routes (public)
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
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
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email or username
 *                 example: admin@admin.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', controller.login.bind(controller));

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/register', controller.register.bind(controller));

router.post('/refresh-token', controller.refreshToken.bind(controller));
router.post('/forgot-password', controller.forgotPassword.bind(controller));
router.post('/reset-password', controller.resetPassword.bind(controller));

// Current user and permission routes (require authentication)

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information with roles and groups
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authMiddleware, controller.me.bind(controller));

/**
 * @swagger
 * /api/users/check-permission:
 *   post:
 *     summary: Check if user has specific permission
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleCode:
 *                 type: string
 *                 description: Single role code to check
 *                 example: ADMIN
 *               roleCodes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of role codes (user needs any one)
 *                 example: ["ADMIN", "USER_MGR"]
 *     responses:
 *       200:
 *         description: Permission check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasPermission:
 *                   type: boolean
 *                 userId:
 *                   type: integer
 *                 roleCode:
 *                   type: string
 *                 roleCodes:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post('/check-permission', authMiddleware, controller.checkPermission.bind(controller));

/**
 * @swagger
 * /api/users/effective-roles/{userId}:
 *   get:
 *     summary: Get effective roles for a specific user
 *     tags: [Authentication]
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
 *         description: User's effective roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 effectiveRoles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserRole'
 */
router.get('/effective-roles/:userId', authMiddleware, controller.getEffectiveRoles.bind(controller));

/**
 * @swagger
 * /api/users/effective-roles:
 *   get:
 *     summary: Get effective roles for current user
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user's effective roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 effectiveRoles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserRole'
 */
router.get('/effective-roles', authMiddleware, controller.getEffectiveRoles.bind(controller)); // For current user

// Admin routes (protected)
router.use('/admin', adminRoutes);

export default router;




// Add more explicit routes as needed
