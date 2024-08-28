import { object, string, TypeOf } from 'zod';

export const createCategorySchema = object({
  body: object({
    icon: string({ required_error: 'Category Icon is required' }).min(1, {
      message: 'Category Icon must be at least 1 characters long',
    }),
    name: string({
      required_error: 'Category Name is required',
    }).min(1, {
      message: 'Category Name must be at least 1 characters long',
    }),
  }),
});

export const updateCategorySchema = object({
  body: object({
    icon: string().optional(),
    name: string().optional(),
  }),
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>['body'];
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>['body'];
