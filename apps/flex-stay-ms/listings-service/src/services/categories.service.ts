import { Category, CategoryQuery } from '@flex-stay/shared-types';
import { APIError, NotFoundError, ValidationError } from '@flex-stay/utils';
import { CreateCategoryInput, UpdateCategoryInput } from '@flex-stay/schemas';

import { ICategoriesService } from '../interfaces/categories/ICategoriesService';
import { CategoriesRepository } from '../repositories/categories.repository';

export class CategoriesService implements ICategoriesService {
  private repository: CategoriesRepository;

  constructor(_categoriesRepository: CategoriesRepository) {
    this.repository = _categoriesRepository;
  }

  async getCategories(limit: number, offset: number): Promise<Category[]> {
    try {
      return await this.repository.find(limit, offset);
    } catch (error) {
      throw new NotFoundError('No Categories Found.');
    }
  }

  async getCategoryById(categoryId: string): Promise<Category> {
    try {
      return await this.repository.findById(categoryId);
    } catch (error) {
      throw new NotFoundError('No Category with this id found.');
    }
  }

  async isCategoryExists(query: CategoryQuery): Promise<boolean> {
    const existingCategory = await this.repository.findByQuery(query, 10, 0);
    return existingCategory.length !== 0 ? true : false;
  }

  async createCategory(data: CreateCategoryInput): Promise<Category> {
    try {
      const { name, icon } = data;
      const isCategoryExists = await this.isCategoryExists({ name, icon });

      if (isCategoryExists) {
        throw new ValidationError('Category with icon or name already exists!');
      }

      return await this.repository.create({ name, icon });
    } catch (error) {
      throw new APIError('Error creating category.');
    }
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryInput
  ): Promise<Category> {
    try {
      const existingCategory = await this.isCategoryExists({ id });
      const duplicatedCategory = await this.isCategoryExists({ ...data });

      if (!existingCategory) {
        throw new NotFoundError('No category with this id found');
      }

      if (duplicatedCategory) {
        throw new ValidationError(
          'Category with this icon or name already exist'
        );
      }

      return await this.repository.update(id, data);
    } catch (error) {
      throw new APIError('Error updating Category.');
    }
  }

  async deleteCategory(id: string): Promise<Category> {
    try {
      const existingCategory = await this.isCategoryExists({ id });

      if (!existingCategory) {
        throw new NotFoundError('No category with this id found');
      }

      return await this.repository.delete(id);
    } catch (error) {
      throw new APIError('Error deleting Category.');
    }
  }
}
