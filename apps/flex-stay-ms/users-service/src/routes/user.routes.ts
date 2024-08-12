import express from 'express';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../services/user.service';

const router = express.Router();

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

router.get('/health', (req, res) => {
  res.send({ message: 'Welcome to flex-stay-ms-users-service!' });
});
router.get('/user', controller.getUser.bind(controller));

export default router;
