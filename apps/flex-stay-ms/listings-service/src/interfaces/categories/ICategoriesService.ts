import { Category } from '@flex-stay/shared-types';
import { CreateCategoryInput, UpdateCategoryInput } from '@flex-stay/schemas';

export interface ICategoriesService {
  getCategories(limit: number, offset: number): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category>;
  createCategory(data: CreateCategoryInput): Promise<Category>;
  updateCategory(id: string, data: UpdateCategoryInput): Promise<Category>;
  deleteCategory(id: string): Promise<Category>;
}
