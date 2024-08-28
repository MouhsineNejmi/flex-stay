import { array, number, object, string, TypeOf } from 'zod';

export const createListingSchema = object({
  body: object({
    title: string({ required_error: 'Listing Title is required' }).min(1, {
      message: 'Listing Title must be at least 1 characters long',
    }),
    description: string({
      required_error: 'Listing Description is required',
    }).min(1, {
      message: 'Listing Description must be at least 1 characters long',
    }),
    images: array(string(), {
      message: 'Images are required add at least 1 image',
    }).nonempty({ message: 'Images are required add at least 1 image' }),
    price: number({ required_error: 'Price is required' }).positive(),
    roomCount: number({ required_error: 'Room count is required' })
      .positive()
      .int(),
    bathroomCount: number({ required_error: 'Bathroom count is required' })
      .positive()
      .int(),
    guestCount: number({ required_error: 'Guest count is required' })
      .positive()
      .int(),
    location: string({ required_error: 'Location is required' }),
    userId: string({ required_error: 'User ID is required' }),
    categoryId: string({ required_error: 'Category ID is required' }),
  }),
});

export const updateListingSchema = object({
  body: object({
    title: string().optional(),
    description: string().optional(),
    images: array(string()).optional(),
    price: number().positive().optional(),
    roomCount: number().positive().optional(),
    bathroomCount: number().positive().optional(),
    guestCount: number().positive().optional(),
    location: string().optional(),
    categoryId: string().optional(),
  }),
});

export type CreateListingInput = TypeOf<typeof createListingSchema>['body'];
export type UpdateListingInput = TypeOf<typeof updateListingSchema>['body'];
