import express from 'express';

import listingsRoutes from './listings.route';
import categoriesRoutes from './categories.route';

const router = express.Router();

router.use('/listings', listingsRoutes);
router.use('/categories', categoriesRoutes);

export default router;
