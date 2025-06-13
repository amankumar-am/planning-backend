// src/modules/auth/auth.route.ts

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { Router } from 'express';


const repository = new UserRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);
const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.post('/login', controller.login.bind(controller));
router.post('/register', controller.register.bind(controller));
router.post('/refresh-token', controller.refreshToken.bind(controller));
router.post('/forgot-password', controller.forgotPassword.bind(controller));
router.post('/reset-password', controller.resetPassword.bind(controller));

export default router;




// Add more explicit routes as needed
