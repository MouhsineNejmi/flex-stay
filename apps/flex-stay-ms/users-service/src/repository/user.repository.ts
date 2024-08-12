import { Prisma, PrismaClient } from '@prisma/client';
import { User } from '@flex-stay/shared-types';

import { IUserRepoistory } from '../interfaces/IUserRepository';

export class UserRepository implements IUserRepoistory {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.findUnique({ where });
  }
}
