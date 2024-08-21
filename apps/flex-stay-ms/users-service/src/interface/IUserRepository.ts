import { User } from '@flex-stay/shared-types';
import { CreateUserInput, UpdateUserInput } from '@flex-stay/schemas';

export interface IUserRepository {
  find(limit: number, offset: number): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  create(data: CreateUserInput): Promise<User>;
  update(id: string, data: UpdateUserInput): Promise<User>;
  delete(userId: string): Promise<User>;
}
