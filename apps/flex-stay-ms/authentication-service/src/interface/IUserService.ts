import { User } from '@flex-stay/shared-types';
import { CreateUserInput, UpdateUserInput } from '@flex-stay/schemas';

export interface IUserService {
  getUsers(limit: number, offset: number): Promise<User[]>;
  getUserByEmail(email: string): Promise<User>;
  getUserById(id: string): Promise<User>;
  createUser(data: CreateUserInput): Promise<User>;
  updateUser(userId: string, data: UpdateUserInput): Promise<User>;
  deleteUser(userId: string): Promise<User>;
}
