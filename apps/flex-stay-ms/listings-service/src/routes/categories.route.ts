import express from 'express';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CategoriesService } from '../services/categories.service';
import { CategoriesController } from '../controllers/categories.controller';
import { validate } from '@flex-stay/utils';
import { createCategorySchema, updateCategorySchema } from '@flex-stay/schemas';

const router = express.Router();

const repository = new CategoriesRepository();
const service = new CategoriesService(repository);
const controller = new CategoriesController(service);

router.get('/', controller.onGetCategories.bind(controller));
router.get('/:categoryId', controller.onGetCategoryById.bind(controller));
router.post(
  '/',
  validate(createCategorySchema),
  controller.onCreateCategory.bind(controller)
);
router.put(
  '/:categoryId',
  validate(updateCategorySchema),
  controller.onUpdateCategory.bind(controller)
);
router.delete('/:categoryId', controller.onDeleteCategory.bind(controller));

export default router;
