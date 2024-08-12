import { GetUserInput, User } from '@flex-stay/shared-types';

export interface IUserRepoistory {
  findOne(where: GetUserInput): Promise<User>;
}
