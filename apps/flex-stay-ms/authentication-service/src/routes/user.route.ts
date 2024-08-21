import express from 'express';
import { validate } from '@flex-stay/utils';
import { createUserSchema, updateUserSchema } from '@flex-stay/schemas';

import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';

// import { deserializeUser } from '../middlewares/deserializeUser.middleware';
// import { requireUser } from '../middlewares/requireUser.middleware';

const router = express.Router();

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

router.post(
  '/',
  validate(createUserSchema),
  controller.onCreateUser.bind(controller)
);

// router.use(deserializeUser, requireUser);

router.get('/', controller.getUsers.bind(controller));
router.get('/me', controller.getMeHandler.bind(controller));
router.put(
  '/:id',
  validate(updateUserSchema),
  controller.onUpdateUser.bind(controller)
);
router.delete('/:id', controller.onDeleteUser.bind(controller));

export default router;
