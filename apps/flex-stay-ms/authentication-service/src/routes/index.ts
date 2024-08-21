import express from 'express';

import usersRoutes from './user.route';
import authRoutes from './auth.route';

const router = express.Router();

router.use('/', usersRoutes);
router.use('/', authRoutes);

export default router;
