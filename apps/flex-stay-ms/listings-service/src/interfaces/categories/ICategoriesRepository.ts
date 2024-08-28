import { CreateCategoryInput, UpdateCategoryInput } from '@flex-stay/schemas';
import { Category, CategoryQuery } from '@flex-stay/shared-types';

export interface ICategoriesRespository {
  find(limit: number, offset: number): Promise<Category[]>;
  findById(id: string): Promise<Category>;
  findByQuery(
    query: CategoryQuery,
    limit: number,
    offset: number
  ): Promise<Category[]>;
  create(data: CreateCategoryInput): Promise<Category>;
  update(id: string, data: UpdateCategoryInput): Promise<Category>;
  delete(id: string): Promise<Category>;
}
