import { NextFunction, Request, Response } from 'express';
import { CreateCategoryInput, UpdateCategoryInput } from '@flex-stay/schemas';

import { CategoriesService } from '../services/categories.service';

export class CategoriesController {
  private service: CategoriesService;

  constructor(_categoriesService: CategoriesService) {
    this.service = _categoriesService;
  }

  async onGetCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query['limit']) || 10;
      const offset = Number(req.query['offset']) || 0;
      const categories = await this.service.getCategories(limit, offset);

      return res.status(200).json({
        status: 'success',
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async onGetCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = <{ id: string }>req.params;
      const category = await this.service.getCategoryById(id);

      return res.status(200).json({
        status: 'success',
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async onCreateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = <CreateCategoryInput>req.body;
      const newCategory = await this.service.createCategory(data);

      return res.status(200).json({
        status: 'success',
        data: {
          category: newCategory,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async onUpdateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = <{ categoryId: string }>req.params;
      const data = <UpdateCategoryInput>req.body;
      const updatedCategory = await this.service.updateCategory(
        categoryId,
        data
      );

      return res.status(200).json({
        status: 'success',
        data: {
          category: updatedCategory,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async onDeleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = <{ categoryId: string }>req.params;
      const deletedCategory = await this.service.deleteCategory(categoryId);

      return res.status(200).json({
        status: 'success',
        data: {
          category: deletedCategory,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
