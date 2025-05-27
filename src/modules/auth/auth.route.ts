// src/modules/auth/auth.route.ts

import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { createModuleRouter } from '../../core/module.factory';


const repository = new UserRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

const router = createModuleRouter(controller, '');

router.post('/login', controller.login.bind(controller));
router.post('/register', controller.register.bind(controller));
router.post('/refresh-token', controller.refreshToken.bind(controller));
router.post('/forgot-password', controller.forgotPassword.bind(controller));
router.post('/reset-password', controller.resetPassword.bind(controller));

export default router;