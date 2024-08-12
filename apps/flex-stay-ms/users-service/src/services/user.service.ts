import { Prisma } from '@prisma/client';
import { NotFoundError } from '@flex-stay/utils';

import { UserRepository } from '../repository/user.repository';

export class UserService {
  private repository: UserRepository;

  constructor(_repository: UserRepository) {
    this.repository = _repository;
  }

  async findUser(where: Prisma.UserWhereUniqueInput) {
    const user = await this.repository.findOne(where);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    return user;
  }
}
