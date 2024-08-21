import express from 'express';
import { createUserSchema, loginUserSchema } from '@flex-stay/schemas';
import { validate } from '@flex-stay/utils';

import { UserRepository } from '../repositories/user.repository';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const service = new AuthService(userRepository);
const controller = new AuthController(service, userService);

router.get('/health', (req, res) => {
  return res.status(200).json({
    message: 'Auth Server is healthy!',
  });
});

router.post(
  '/register',
  validate(createUserSchema),
  controller.onRegisterUser.bind(controller)
);
router.post(
  '/login',
  validate(loginUserSchema),
  controller.onLoginUser.bind(controller)
);
router.post('/refresh', controller.onRefreshAccessToken.bind(controller));
router.post('/logout', controller.onLogout.bind(controller));

export default router;
